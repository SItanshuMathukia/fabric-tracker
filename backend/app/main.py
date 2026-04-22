from fastapi import FastAPI, Depends, HTTPException, Header, APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta
from collections import defaultdict
from app.database import get_db
from app import models
from fastapi.middleware.cors import CORSMiddleware
import uuid

from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
    verify_token
)
from app.core.database import engine, Base, get_db
from app.models import FabricBatch, FabricTransaction, User
from app.schemas import BatchCreate, TransactionCreate, UserCreate, UserLogin


dashboard_router = APIRouter()

@dashboard_router.get("/dashboard")
def get_dashboard(db: Session = Depends(get_db)):
    total_batches = db.query(models.FabricBatch).count()
    total_transactions = db.query(models.FabricTransaction).count()

    total_meters = db.query(
        func.coalesce(func.sum(models.FabricTransaction.meters), 0)
    ).scalar()

    recent_transactions_query = (
        db.query(models.FabricTransaction)
        .order_by(models.FabricTransaction.date.desc())
        .limit(5)
        .all()
    )

    recent_activity = [
        {
            "id": txn.id,
            "action": txn.action,
            "meters": txn.meters,
            "date": str(txn.date),
            "batch_id": txn.batch_id,
        }
        for txn in recent_transactions_query
    ]

    # Weekly analytics (last 7 days)
    today = datetime.utcnow().date()
    start_date = today - timedelta(days=6)

    weekly_transactions = (
        db.query(models.FabricTransaction)
        .filter(models.FabricTransaction.date >= start_date)
        .all()
    )

    weekly_map = defaultdict(float)
    for txn in weekly_transactions:
        txn_date = txn.date if hasattr(txn.date, "isoformat") else txn.date
        key = str(txn_date)
        if txn.action == "remove":
            weekly_map[key] -= float(txn.meters or 0)
        else:
            weekly_map[key] += float(txn.meters or 0)

    weekly_analytics = []
    for i in range(7):
        day = start_date + timedelta(days=i)
        day_str = str(day)
        weekly_analytics.append({
            "date": day_str,
            "meters": weekly_map.get(day_str, 0)
        })

    # Top parties
    top_parties_query = (
        db.query(
            models.FabricBatch.party,
            func.count(models.FabricBatch.id).label("batch_count"),
            func.coalesce(func.sum(models.FabricBatch.meters), 0).label("total_meters")
        )
        .group_by(models.FabricBatch.party)
        .order_by(func.count(models.FabricBatch.id).desc())
        .limit(5)
        .all()
    )

    top_parties = [
        {
            "party": row.party,
            "batch_count": row.batch_count,
            "total_meters": float(row.total_meters or 0),
        }
        for row in top_parties_query
    ]

    return {
        "total_batches": total_batches,
        "total_transactions": total_transactions,
        "total_meters": total_meters,
        "recent_activity": recent_activity,
        "weekly_analytics": weekly_analytics,
        "top_parties": top_parties,
    }

app = FastAPI()

app.include_router(dashboard_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://fabric-tracker.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ CREATE TABLES in PostgreSQL
Base.metadata.create_all(bind=engine)

# -----------------------------
# AUTH HELPER
# -----------------------------
def get_current_user(authorization: str = Header(None)):

    if not authorization:
        raise HTTPException(status_code=401, detail="Token missing")

    try:
        token = authorization.split(" ")[1]
    except:
        raise HTTPException(status_code=401, detail="Invalid token format")

    payload = verify_token(token)

    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")

    return payload

# -----------------------------
# ROOT
# -----------------------------

@app.get("/")
def root():
    return {"message": "Fabric Tracker API Running"}

# -----------------------------
# Register User
# -----------------------------

@app.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):

    existing = db.query(User).filter(User.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="User already exists")

    safe_password = user.password[:72]

    new_user = User(
        id=str(uuid.uuid4()),
        name=user.name,
        email=user.email,
        password=hash_password(safe_password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User created"}

# -----------------------------
# LogIn User
# -----------------------------

@app.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):

    db_user = db.query(User).filter(User.email == user.email).first()

    if not db_user:
        raise HTTPException(status_code=400, detail="User not found")

    if not verify_password(user.password[:72], db_user.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    token = create_access_token({
        "user_id": db_user.id,
        "email": db_user.email
    })

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": db_user.id,
            "name": db_user.name,
            "email": db_user.email
        }
    }

# -----------------------------
# Create Batch
# -----------------------------
@app.post("/batches")
def create_batch(batch: BatchCreate, db: Session = Depends(get_db),  user=Depends(get_current_user)):
    new_batch = FabricBatch(
        id=batch.id,
        color=batch.color,
        party = batch.party,
        date = batch.date,
        rate = batch.rate,
        meters = batch.meters,
        price = batch.rate * batch.meters
    )

    db.add(new_batch)
    db.commit()
    db.refresh(new_batch)

    # create initial transaction
    txn = FabricTransaction(
        id=str(uuid.uuid4()),
        batch_id=new_batch.id,
        action="create",
        date=batch.date,
        meters=batch.meters
    )

    db.add(txn)
    db.commit()

    return new_batch


# -----------------------------
# Add Transaction
# -----------------------------
@app.post("/transactions")
def add_transaction(txn: TransactionCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    batch = db.query(FabricBatch).filter(FabricBatch.id == txn.batch_id).first()

    if not batch:
        raise HTTPException(status_code=404, detail="Batch not found")

    if txn.action not in ["add", "remove"]:
        raise HTTPException(status_code=400, detail="Invalid action")

    if txn.action == "remove" and batch.meters < txn.meters:
        raise HTTPException(status_code=400, detail="Not enough fabric")

    if txn.action == "add":
        batch.meters += txn.meters

        # if rate is sent during add, update batch rate and price
        if txn.rate is not None:
            batch.rate = txn.rate

    else:
        batch.meters -= txn.meters

    # keep price in sync
    if batch.rate is not None and batch.meters is not None:
        batch.price = batch.rate * batch.meters

    new_txn = FabricTransaction(
        batch_id=txn.batch_id,
        action=txn.action,
        action_type=txn.action_type,
        meters=txn.meters,
        date=txn.date,
        rate=txn.rate if txn.action == "add" else None
    )

    db.add(new_txn)
    db.commit()
    db.refresh(new_txn)

    return {"message": "Transaction successful"}


# -----------------------------
# Get Ledger
# -----------------------------
@app.get("/ledger/{batch_id}")
def get_ledger(batch_id: str, db: Session = Depends(get_db), user=Depends(get_current_user)):
    batch = db.query(FabricBatch).filter(FabricBatch.id == batch_id).first()

    if not batch:
        raise HTTPException(status_code=404, detail="Batch not found")

    return {
        "batch": {
            "id": batch.id,
            "color": batch.color,
            "party": batch.party,
            "date": str(batch.date) if batch.date else None,
            "rate": batch.rate,
            "meters": batch.meters,
            "price": batch.price,
        },
        "transactions": [
            {
                "id": txn.id,
                "action": txn.action,
                "action_type": txn.action_type,
                "meters": txn.meters,
                "date": str(txn.date) if txn.date else None,
                "rate": txn.rate,
            }
            for txn in batch.transactions
        ]
    }

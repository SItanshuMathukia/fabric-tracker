from fastapi import FastAPI, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
import uuid

from app.core.security import hash_password, create_access_token
from app.core.database import engine, Base, get_db
from app.models import FabricBatch, FabricTransaction, User
from app.schemas import BatchCreate, TransactionCreate, UserCreate, UserLogin
from app.core.security import create_access_token, verify_token

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://fabric-tracker.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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


# ✅ CREATE TABLES in PostgreSQL
Base.metadata.create_all(bind=engine)


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

    new_user = User(
        id=str(uuid.uuid4()),
        name=user.name,
        email=user.email,
        password=hash_password(user.password)
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
def add_transaction(txn: TransactionCreate, db: Session = Depends(get_db),  user=Depends(get_current_user)):
    batch = db.query(FabricBatch).filter(FabricBatch.id == txn.batch_id).first()

    if not batch:
        raise HTTPException(status_code=404, detail="Batch not found")

    if txn.action not in ["add", "remove"]:
        raise HTTPException(status_code=400, detail="Invalid action")

    if txn.action == "remove" and batch.meters < txn.meters:
        raise HTTPException(status_code=400, detail="Not enough fabric")

    # update batch
    if txn.action == "add":
        batch.meters += txn.meters
    else:
        batch.meters -= txn.meters

    new_txn = FabricTransaction(
        batch_id=txn.batch_id,
        action=txn.action,
        action_type=txn.action_type,
        meters=txn.meters,
        date=txn.date
    )

    db.add(new_txn)
    db.commit()

    return {"message": "Transaction successful"}


# -----------------------------
# Get Ledger
# -----------------------------
@app.get("/ledger/{batch_id}")
def get_ledger(batch_id: str, db: Session = Depends(get_db),  user=Depends(get_current_user)):
    batch = db.query(FabricBatch).filter(FabricBatch.id == batch_id).first()

    if not batch:
        raise HTTPException(status_code=404, detail="Batch not found")

    return {
        "batch": batch,
        "transactions": batch.transactions
    }

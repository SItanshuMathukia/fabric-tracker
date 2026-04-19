from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database import get_db
from app import models

router = APIRouter()

@router.get("/dashboard")
def get_dashboard(db: Session = Depends(get_db)):

    total_batches = db.query(models.FabricBatch).count()

    total_transactions = db.query(models.FabricTransaction).count()

    total_meters = db.query(
        func.coalesce(func.sum(models.FabricTransaction.meters), 0)
    ).scalar()

    recent_transactions = db.query(models.FabricTransaction)\
        .order_by(models.FabricTransaction.date.desc())\
        .limit(5)\
        .all()

    return {
        "total_batches": total_batches,
        "total_transactions": total_transactions,
        "total_meters": total_meters,
        "recent_activity": recent_transactions
    }
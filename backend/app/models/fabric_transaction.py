from sqlalchemy import Column, String, Float, ForeignKey, Integer
from sqlalchemy.orm import relationship
from app.database import Base
import uuid


class FabricTransaction(Base):
    __tablename__ = "fabric_transactions"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    batch_id = Column(Integer, ForeignKey("fabric_batch.id"))  # ✅ THIS IS THE FIX
    action = Column(String)
    meters = Column(Float)

    batch = relationship("FabricBatch", back_populates="transactions")
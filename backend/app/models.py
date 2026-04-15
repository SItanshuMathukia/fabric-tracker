from sqlalchemy import Column, String, Float, ForeignKey
from sqlalchemy.orm import relationship
import uuid

from app.core.database import Base


class FabricBatch(Base):
    __tablename__ = "batches"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    color = Column(String, nullable=False)
    meters = Column(Float, nullable=False)

    transactions = relationship("FabricTransaction", back_populates="batches")


class FabricTransaction(Base):
    __tablename__ = "transactions"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    batch_id = Column(String, ForeignKey("batches.id"), nullable=False)
    action = Column(String, nullable=False)
    meters = Column(Float, nullable=False)

    batch = relationship("FabricBatch", back_populates="transactions")

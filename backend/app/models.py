from sqlalchemy import Column, String, Float, ForeignKey, Integer, Date
from sqlalchemy.orm import relationship
import uuid
from datetime import date

from app.core.database import Base


class FabricBatch(Base):
    __tablename__ = "fabric_batch"

    id = Column(String, primary_key=True, index=True, autoincrement=True)
    color = Column(String)
    party = Column(String)
    date = Column(Date)
    rate = Column(Integer)
    meters = Column(Float)
    price = Column(Integer)

    transactions = relationship("FabricTransaction", back_populates="batch")


class FabricTransaction(Base):
    __tablename__ = "fabric_transactions"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    batch_id = Column(String, ForeignKey("fabric_batch.id"))  
    action = Column(String)
    action_type = Column(String)
    meters = Column(Float)
    date = Column(Date)

    batch = relationship("FabricBatch", back_populates="transactions")


class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
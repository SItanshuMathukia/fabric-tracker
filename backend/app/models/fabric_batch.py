from sqlalchemy import Column, String, Float, Integer
from sqlalchemy.orm import relationship
from app.database import Base

class FabricBatch(Base):
    __tablename__ = "fabric_batch"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    color = Column(String)
    meters = Column(Float)

    transactions = relationship("FabricTransaction", back_populates="batch")

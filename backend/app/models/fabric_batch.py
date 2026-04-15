from sqlalchemy import Column, String, Float, Integer, Date
from sqlalchemy.orm import relationship
from app.database import Base
from datetime import date

class FabricBatch(Base):
    __tablename__ = "fabric_batch"

    id = Column(String, primary_key=True, index=True)
    color = Column(String)
    party = Column(String)
    date = Column(Date)
    rate = Column(Integer)
    meters = Column(Float)
    price = Column(Integer)

    transactions = relationship("FabricTransaction", back_populates="batch")

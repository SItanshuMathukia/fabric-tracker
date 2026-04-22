from sqlalchemy import Column, String, Float, ForeignKey, Integer, Date
from sqlalchemy.orm import relationship
from app.database import Base
import uuid


class FabricTransaction(Base):
    __tablename__ = "fabric_transactions"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    batch_id = Column(String, ForeignKey("fabric_batch.id"))  
    action = Column(String)
    action_type = Column(String)
    meters = Column(Float)
    date = Column(Date)
    rate = Column(Integer, nullable=True)  


    batch = relationship("FabricBatch", back_populates="transactions")
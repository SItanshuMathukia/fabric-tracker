from pydantic import BaseModel
from datetime import date

class BatchCreate(BaseModel):
    id: str
    color: str
    party: str
    date: date
    rate: int
    meters: float
    price: int
    meters: float


class TransactionCreate(BaseModel):
    batch_id: str
    action: str
    action_type: str
    meters: float
    date: date
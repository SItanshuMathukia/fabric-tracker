from pydantic import BaseModel


class BatchCreate(BaseModel):
    id: int
    color: str
    meters: float


class TransactionCreate(BaseModel):
    batch_id: str
    action: str
    meters: float
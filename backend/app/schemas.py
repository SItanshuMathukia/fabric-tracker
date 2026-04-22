from pydantic import BaseModel
from datetime import date
from typing import Optional


class BatchCreate(BaseModel):
    id: str
    color: str
    party: str
    date: date
    rate: int
    meters: float
    price: int

class TransactionCreate(BaseModel):
    batch_id: str
    action: str
    action_type: str
    meters: float
    date: date
    rate: Optional[int]

class UserCreate(BaseModel):
    name: str
    email: str
    password: str


class UserLogin(BaseModel):
    email: str
    password: str
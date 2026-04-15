from sqlalchemy import Column, String
import uuid
from app.core.database import Base

class FabricImage(Base):
    __tablename__ = "fabric_images"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    batch_id = Column(String)
    image_path = Column(String)
    stage = Column(String)
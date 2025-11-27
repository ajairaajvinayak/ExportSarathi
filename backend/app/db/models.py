from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, Float, JSON, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    full_name = Column(String)
    hashed_password = Column(String)
    company_name = Column(String)
    is_active = Column(Boolean, default=True)
    subscription_tier = Column(String, default="free")  # free, pro, enterprise
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    export_queries = relationship("ExportQuery", back_populates="user")
    documents = relationship("GeneratedDocument", back_populates="user")

class ExportQuery(Base):
    __tablename__ = "export_queries"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    product_name = Column(String)
    hs_code = Column(String, nullable=True)
    origin_country = Column(String, default="India")
    target_country = Column(String)
    feasibility_score = Column(Float)
    status = Column(String)  # pending, completed, failed
    result_data = Column(JSON)  # Stores the full analysis
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="export_queries")

class GeneratedDocument(Base):
    __tablename__ = "generated_documents"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    document_type = Column(String)  # invoice, packing_list, origin_cert
    file_path = Column(String)
    metadata_info = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="documents")

class ChatHistory(Base):
    __tablename__ = "chat_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    session_id = Column(String, index=True)
    message = Column(Text)
    response = Column(Text)
    sources = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)

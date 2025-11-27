from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict, Any
from datetime import datetime

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    company_name: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(UserBase):
    id: int
    is_active: bool
    subscription_tier: str
    created_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

# Export Feasibility Schemas
class FeasibilityRequest(BaseModel):
    product_name: str
    product_description: str
    hs_code: Optional[str] = None
    manufacturing_location: str
    target_country: str

class FeasibilityResponse(BaseModel):
    score: float
    viability_status: str
    suggested_markets: List[str]
    risk_factors: List[str]
    required_certifications: List[str]
    complexity_level: str
    analysis_summary: str

# Document Generation Schemas
class DocumentRequest(BaseModel):
    document_type: str
    exporter_details: Dict[str, Any]
    importer_details: Dict[str, Any]
    product_details: List[Dict[str, Any]]
    invoice_details: Optional[Dict[str, Any]] = None

class DocumentResponse(BaseModel):
    document_id: int
    download_url: str
    file_name: str

# Chat Schemas
class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    sources: List[Dict[str, str]]
    session_id: str

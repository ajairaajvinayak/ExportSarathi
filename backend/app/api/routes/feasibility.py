from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.schemas.schemas import FeasibilityRequest, FeasibilityResponse
from app.services.ai_service import AIService
from app.services.vector_store import VectorStoreService

router = APIRouter()

@router.post("/analyze", response_model=FeasibilityResponse)
async def analyze_feasibility(
    request: FeasibilityRequest,
    db: Session = Depends(get_db)
):
    # Initialize services
    vector_store = VectorStoreService()
    ai_service = AIService(vector_store)
    
    try:
        # Get AI analysis
        result = await ai_service.analyze_feasibility(request)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

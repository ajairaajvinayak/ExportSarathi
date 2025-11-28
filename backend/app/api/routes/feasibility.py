from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.schemas.schemas import FeasibilityRequest, FeasibilityResponse
from app.services.ai_service import AIService

router = APIRouter()

from app.api.dependencies import get_ai_service

@router.post("/analyze", response_model=FeasibilityResponse)
async def analyze_feasibility(
    request: FeasibilityRequest,
    db: Session = Depends(get_db),
    ai_service: AIService = Depends(get_ai_service)
):
    try:
        # Get AI analysis
        result = await ai_service.analyze_feasibility(request)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

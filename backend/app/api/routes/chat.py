from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.schemas.schemas import ChatRequest, ChatResponse
from app.services.ai_service import AIService
import uuid

router = APIRouter()

from app.api.dependencies import get_ai_service

@router.post("/message", response_model=ChatResponse)
async def chat_message(
    request: ChatRequest,
    db: Session = Depends(get_db),
    ai_service: AIService = Depends(get_ai_service)
):
    
    session_id = request.session_id or str(uuid.uuid4())
    
    try:
        # Use the actual AI service with RAG
        result = await ai_service.get_chat_response(request.message, session_id)
        
        return {
            "response": result["response"],
            "sources": result.get("sources", []),
            "session_id": session_id
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

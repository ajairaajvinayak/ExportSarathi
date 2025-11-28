from fastapi import Request, HTTPException
from app.services.ai_service import AIService
from app.services.vector_store import VectorStoreService

def get_ai_service(request: Request) -> AIService:
    """Get AI Service instance from app state"""
    if not hasattr(request.app.state, "ai_service") or request.app.state.ai_service is None:
        # Fallback if not initialized (e.g. during tests or if init failed)
        # This ensures the app doesn't crash, but performance might be lower
        vector_store = VectorStoreService()
        return AIService(vector_store)
        
    return request.app.state.ai_service

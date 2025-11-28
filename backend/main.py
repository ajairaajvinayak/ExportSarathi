from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
import uvicorn
from typing import AsyncGenerator

from app.api.routes import auth, feasibility, compliance, documents, chat, analytics
from app.core.config import settings
from app.db.database import engine, Base
from app.services.vector_store import VectorStoreService

# Initialize vector store on startup
@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator:
    """Application lifespan manager"""
    # Startup
    print("🚀 Starting ExportSarathi...")
    
    # Create database tables
    Base.metadata.create_all(bind=engine)
    
    # Initialize vector store (non-blocking)
    try:
        vector_service = VectorStoreService()
        await vector_service.initialize()
        app.state.vector_store = vector_service
        print("✅ Vector store initialized!")
        
        # Initialize AI Service
        from app.services.ai_service import AIService
        app.state.ai_service = AIService(vector_service)
        print("✅ AI Service initialized!")
    except Exception as e:
        print(f"⚠️  Service initialization skipped: {e}")
        app.state.vector_store = None
        app.state.ai_service = None
    
    print("✅ ExportSarathi is ready!")
    
    yield
    
    # Shutdown
    print("👋 Shutting down ExportSarathi...")

# Create FastAPI application
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="AI-powered Export & Compliance Copilot for MSMEs",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(feasibility.router, prefix="/api/feasibility", tags=["Export Feasibility"])
app.include_router(compliance.router, prefix="/api/compliance", tags=["Compliance"])
app.include_router(documents.router, prefix="/api/documents", tags=["Documents"])
app.include_router(chat.router, prefix="/api/chat", tags=["AI Advisor"])
app.include_router(analytics.router, prefix="/api/analytics", tags=["Analytics"])

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Welcome to ExportSarathi",
        "version": settings.APP_VERSION,
        "status": "operational"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": settings.APP_NAME,
        "version": settings.APP_VERSION
    }

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )

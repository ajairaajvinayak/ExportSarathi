from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse
from app.schemas.schemas import DocumentRequest, DocumentResponse
from app.services.document_service import DocumentService
import os

router = APIRouter()

@router.post("/generate", response_model=DocumentResponse)
async def generate_document(request: DocumentRequest):
    doc_service = DocumentService()
    
    try:
        if request.document_type == "invoice":
            filepath = await doc_service.generate_invoice(request)
            filename = os.path.basename(filepath)
            
            # In a real app, we'd upload to S3 and return a signed URL
            # Here we'll return a local path identifier
            return {
                "document_id": 123,
                "download_url": f"/api/documents/download/{filename}",
                "file_name": filename
            }
        else:
            raise HTTPException(status_code=400, detail="Unsupported document type")
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/download/{filename}")
async def download_document(filename: str):
    file_path = os.path.join("generated_docs", filename)
    if os.path.exists(file_path):
        return FileResponse(file_path, filename=filename)
    raise HTTPException(status_code=404, detail="File not found")

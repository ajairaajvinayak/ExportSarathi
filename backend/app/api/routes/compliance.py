from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_compliance_rules():
    return {"message": "Compliance rules endpoint"}

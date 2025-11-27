from fastapi import APIRouter

router = APIRouter()

@router.get("/stats")
async def get_analytics():
    return {
        "total_exports": 150,
        "active_users": 45,
        "top_markets": ["USA", "UK", "UAE"]
    }

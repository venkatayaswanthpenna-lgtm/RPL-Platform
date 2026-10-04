from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Any

router = APIRouter(tags=["Sync"])

class SyncPayload(BaseModel):
    items: List[Any]

@router.post("/sync")
def sync_data(payload: SyncPayload):
    # Dummy sync endpoint for offline PWA
    return {"synced_count": len(payload.items), "failed_count": 0}

@router.get("/sync/status")
def sync_status():
    return {"status": "online"}

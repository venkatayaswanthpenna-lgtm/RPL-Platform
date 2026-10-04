from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.domain import Worker
from app.schemas.api import WorkerCreate, WorkerResponse
from typing import List

router = APIRouter(tags=["Workers"])

@router.post("/workers", response_model=WorkerResponse)
def create_worker(worker: WorkerCreate, db: Session = Depends(get_db)):
    db_worker = Worker(**worker.dict())
    db.add(db_worker)
    db.commit()
    db.refresh(db_worker)
    return db_worker

@router.get("/workers", response_model=List[WorkerResponse])
def get_workers(db: Session = Depends(get_db)):
    return db.query(Worker).all()

@router.get("/workers/{worker_id}", response_model=WorkerResponse)
def get_worker(worker_id: int, db: Session = Depends(get_db)):
    worker = db.query(Worker).filter(Worker.id == worker_id).first()
    if not worker:
        raise HTTPException(status_code=404, detail="Worker not found")
    return worker

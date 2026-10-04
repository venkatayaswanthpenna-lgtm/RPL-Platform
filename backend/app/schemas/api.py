from pydantic import BaseModel
from typing import List, Optional, Any
from datetime import datetime

class WorkerBase(BaseModel):
    name: str
    age: int
    experience_years: int
    learning_mode: str
    trade: str
    location: str
    declared_skills: List[str]

class WorkerCreate(WorkerBase):
    pass

class WorkerResponse(WorkerBase):
    id: int
    created_at: datetime
    class Config:
        orm_mode = True

class QualificationBase(BaseModel):
    code: str
    title: str
    sector: str
    nsqf_level: int

class QualificationResponse(QualificationBase):
    id: int
    class Config:
        orm_mode = True

class AssessmentCreate(BaseModel):
    worker_id: int
    qualification_id: int

class AssessmentResponse(BaseModel):
    id: int
    worker_id: int
    qualification_id: int
    status: str
    overall_score: Optional[float]
    recommended_outcome: Optional[str]
    created_at: datetime
    class Config:
        orm_mode = True

class EvidenceCreate(BaseModel):
    assessment_id: int
    file_path: str
    evidence_type: str

class CriterionResultUpdate(BaseModel):
    assessor_score: Optional[int]
    assessor_comment: Optional[str]
    final_score: int

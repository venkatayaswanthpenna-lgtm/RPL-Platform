from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.domain import Assessment, Qualification, Worker, CriterionResult, Evidence
from pydantic import BaseModel
from typing import List, Dict, Any

router = APIRouter(tags=["Assessments"])

class QualificationMappingRequest(BaseModel):
    worker_id: int
    trade: str
    experience_years: int
    declared_skills: List[str]

@router.post("/qualification-mapping")
def map_qualification(req: QualificationMappingRequest, db: Session = Depends(get_db)):
    # Demo logic: Always match with "Automotive Service Technician"
    qual = db.query(Qualification).filter(Qualification.code == "AST-RPL-001").first()
    if not qual:
        raise HTTPException(status_code=404, detail="Qualification not found in DB")
    
    return {
        "qualification": {
            "id": qual.id,
            "title": qual.title,
            "code": qual.code,
            "level": qual.nsqf_level
        },
        "match_percentage": 92,
        "details": {
            "experience_match": 94,
            "skill_match": 91,
            "task_match": 93
        },
        "reason": "The worker's declared experience and task profile closely correspond to the competency areas covered by the selected qualification."
    }

@router.post("/assessments")
def create_assessment(worker_id: int, qualification_id: int, db: Session = Depends(get_db)):
    assessment = Assessment(worker_id=worker_id, qualification_id=qualification_id, status="in_progress")
    db.add(assessment)
    db.commit()
    db.refresh(assessment)
    return {"assessment_id": assessment.id, "status": assessment.status}

@router.get("/assessments/{assessment_id}")
def get_assessment(assessment_id: int, db: Session = Depends(get_db)):
    assessment = db.query(Assessment).filter(Assessment.id == assessment_id).first()
    if not assessment:
        raise HTTPException(status_code=404, detail="Not found")
    
    worker = assessment.worker
    qual = assessment.qualification
    results = db.query(CriterionResult).filter(CriterionResult.assessment_id == assessment_id).all()
    evidence = db.query(Evidence).filter(Evidence.assessment_id == assessment_id).all()
    
    return {
        "assessment": {
            "id": assessment.id,
            "status": assessment.status,
            "overall_score": assessment.overall_score,
            "recommended_outcome": assessment.recommended_outcome
        },
        "worker": worker,
        "qualification": qual,
        "results": results,
        "evidence": evidence
    }

class AnalyzeEvidenceRequest(BaseModel):
    evidence_id: int
    assessment_id: int

@router.post("/evidence/analyze")
def analyze_evidence(req: AnalyzeEvidenceRequest, db: Session = Depends(get_db)):
    # Demo logic: Mock AI analysis based on ID
    return {
        "detected_actions": ["Front inspection", "Tyre inspection", "Damage identification"],
        "criterion_mapping": [
            {"pc": "PC1", "support": "Supported"},
            {"pc": "PC2", "support": "Supported"},
            {"pc": "PC4", "support": "Partially Supported"}
        ],
        "confidence": 88,
        "missing_evidence": "Video does not clearly demonstrate documentation of inspection findings.",
        "ai_recommended_scores": [
            {"criterion_id": 1, "score": 3, "confidence": 89, "reason": "Candidate correctly identified visible damage."},
            {"criterion_id": 2, "score": 4, "confidence": 92, "reason": "Systematic tyre check observed."}
        ]
    }

class AssessorValidationRequest(BaseModel):
    assessment_id: int
    criterion_results: List[Dict[str, Any]]
    overall_score: float
    recommended_outcome: str

@router.post("/assessor-validation")
def validate_assessment(req: AssessorValidationRequest, db: Session = Depends(get_db)):
    assessment = db.query(Assessment).filter(Assessment.id == req.assessment_id).first()
    if not assessment:
        raise HTTPException(404)
        
    assessment.status = "validated"
    assessment.overall_score = req.overall_score
    assessment.recommended_outcome = req.recommended_outcome
    
    # Save results (mocked simplification)
    # In real world, we update CriterionResult table
    
    db.commit()
    return {"message": "Validation complete"}

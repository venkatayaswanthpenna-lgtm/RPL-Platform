from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.domain import Qualification, NOS, PerformanceCriterion, AssessmentCriterion

router = APIRouter(tags=["Data"])

@router.get("/qualifications")
def get_qualifications(db: Session = Depends(get_db)):
    quals = db.query(Qualification).all()
    res = []
    for q in quals:
        nos_list = db.query(NOS).filter(NOS.qualification_id == q.id).all()
        q_dict = {
            "id": q.id,
            "title": q.title,
            "code": q.code,
            "nos": [{"id": n.id, "title": n.title, "code": n.code} for n in nos_list]
        }
        res.append(q_dict)
    return res

@router.get("/nos/{nos_id}/criteria")
def get_criteria(nos_id: int, db: Session = Depends(get_db)):
    pcs = db.query(PerformanceCriterion).filter(PerformanceCriterion.nos_id == nos_id).all()
    res = []
    for pc in pcs:
        acs = db.query(AssessmentCriterion).filter(AssessmentCriterion.pc_id == pc.id).all()
        res.append({
            "id": pc.id,
            "code": pc.code,
            "description": pc.description,
            "assessment_criteria": [{"id": ac.id, "description": ac.description} for ac.ac in acs] if hasattr(acs[0], 'ac') else [{"id": ac.id, "description": ac.description} for ac in acs]
        })
    return res

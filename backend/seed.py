import os
from sqlalchemy.orm import Session
from app.database import engine, Base, SessionLocal
from app.models.domain import Qualification, NOS, PerformanceCriterion, AssessmentCriterion, Worker

def seed_db():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    if db.query(Qualification).count() > 0:
        print("DB already seeded.")
        return
        
    print("Seeding database...")
    
    # Qualification
    qual = Qualification(
        code="AST-RPL-001",
        title="Automotive Service Technician",
        sector="Automotive",
        nsqf_level=4
    )
    db.add(qual)
    db.commit()
    db.refresh(qual)
    
    # NOS
    nos_data = [
        {"code": "NOS1", "title": "Perform Vehicle Inspection"},
        {"code": "NOS2", "title": "Perform Basic Vehicle Maintenance"},
        {"code": "NOS3", "title": "Perform Brake and Wheel Inspection"},
        {"code": "NOS4", "title": "Perform Basic Electrical Inspection"}
    ]
    
    for nd in nos_data:
        nos = NOS(qualification_id=qual.id, code=nd["code"], title=nd["title"])
        db.add(nos)
        db.commit()
        db.refresh(nos)
        
        if nd["code"] == "NOS1":
            pcs = [
                {"code": "PC1", "desc": "Inspect vehicle exterior and identify visible defects."},
                {"code": "PC2", "desc": "Inspect tyres and wheels."},
                {"code": "PC3", "desc": "Inspect basic engine compartment components."},
                {"code": "PC4", "desc": "Identify observable abnormalities."},
                {"code": "PC5", "desc": "Record inspection findings accurately."}
            ]
            
            for pc_data in pcs:
                pc = PerformanceCriterion(nos_id=nos.id, code=pc_data["code"], description=pc_data["desc"])
                db.add(pc)
                db.commit()
                db.refresh(pc)
                
                # Assessment Criteria
                ac = AssessmentCriterion(pc_id=pc.id, description=f"Candidate successfully demonstrates {pc.code.lower()}")
                db.add(ac)
    
    # Demo worker
    worker = Worker(
        name="Ravi Kumar",
        age=32,
        experience_years=8,
        learning_mode="On-the-job apprenticeship",
        trade="Automotive Service",
        location="Semi-urban",
        declared_skills=["Vehicle inspection", "Brake inspection", "Battery inspection", "Tyre inspection", "Basic diagnostics"]
    )
    db.add(worker)
    
    db.commit()
    db.close()
    print("Seeding complete.")

if __name__ == "__main__":
    seed_db()

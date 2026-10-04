from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, DateTime, Text, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class Worker(Base):
    __tablename__ = "workers"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    age = Column(Integer)
    experience_years = Column(Integer)
    learning_mode = Column(String)
    trade = Column(String)
    location = Column(String)
    declared_skills = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)

    assessments = relationship("Assessment", back_populates="worker")


class Qualification(Base):
    __tablename__ = "qualifications"
    id = Column(Integer, primary_key=True, index=True)
    code = Column(String, unique=True, index=True)
    title = Column(String)
    sector = Column(String)
    nsqf_level = Column(Integer)
    
    nos_units = relationship("NOS", back_populates="qualification")


class NOS(Base):
    __tablename__ = "nos_units"
    id = Column(Integer, primary_key=True, index=True)
    qualification_id = Column(Integer, ForeignKey("qualifications.id"))
    code = Column(String)
    title = Column(String)
    
    qualification = relationship("Qualification", back_populates="nos_units")
    performance_criteria = relationship("PerformanceCriterion", back_populates="nos")


class PerformanceCriterion(Base):
    __tablename__ = "performance_criteria"
    id = Column(Integer, primary_key=True, index=True)
    nos_id = Column(Integer, ForeignKey("nos_units.id"))
    code = Column(String)
    description = Column(String)
    weight = Column(Float, default=1.0)
    
    nos = relationship("NOS", back_populates="performance_criteria")
    assessment_criteria = relationship("AssessmentCriterion", back_populates="pc")


class AssessmentCriterion(Base):
    __tablename__ = "assessment_criteria"
    id = Column(Integer, primary_key=True, index=True)
    pc_id = Column(Integer, ForeignKey("performance_criteria.id"))
    description = Column(String)
    
    pc = relationship("PerformanceCriterion", back_populates="assessment_criteria")


class Assessment(Base):
    __tablename__ = "assessments"
    id = Column(Integer, primary_key=True, index=True)
    worker_id = Column(Integer, ForeignKey("workers.id"))
    qualification_id = Column(Integer, ForeignKey("qualifications.id"))
    status = Column(String, default="pending") # pending, in_progress, validated, completed
    overall_score = Column(Float, nullable=True)
    recommended_outcome = Column(String, nullable=True)
    assessor_id = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    worker = relationship("Worker", back_populates="assessments")
    qualification = relationship("Qualification")
    results = relationship("CriterionResult", back_populates="assessment")
    evidence = relationship("Evidence", back_populates="assessment")


class Evidence(Base):
    __tablename__ = "evidence"
    id = Column(Integer, primary_key=True, index=True)
    assessment_id = Column(Integer, ForeignKey("assessments.id"))
    file_path = Column(String)
    evidence_type = Column(String) # image, video, document, observation
    status = Column(String) # processing, analyzed
    mapped_criteria_ids = Column(JSON, nullable=True) # List of criterion IDs
    created_at = Column(DateTime, default=datetime.utcnow)
    
    assessment = relationship("Assessment", back_populates="evidence")


class CriterionResult(Base):
    __tablename__ = "criterion_results"
    id = Column(Integer, primary_key=True, index=True)
    assessment_id = Column(Integer, ForeignKey("assessments.id"))
    criterion_id = Column(Integer, ForeignKey("assessment_criteria.id"))
    
    ai_score = Column(Integer, nullable=True)
    ai_confidence = Column(Float, nullable=True)
    ai_reason = Column(String, nullable=True)
    
    assessor_score = Column(Integer, nullable=True)
    assessor_comment = Column(String, nullable=True)
    
    final_score = Column(Integer, nullable=True)
    
    assessment = relationship("Assessment", back_populates="results")
    criterion = relationship("AssessmentCriterion")

# RPL Assessment Platform Prototype

An AI-assisted, evidence-driven competency assessment platform designed to help assess informal workers in India. This prototype demonstrates a scalable, consistent, and offline-capable approach to Recognition of Prior Learning (RPL).

## Features
- **Structured Self-Declaration:** Guided workflow for capturing worker experience and skills.
- **AI Qualification Mapping:** Recommends the best-fit NSQF qualification based on worker declaration.
- **Guided Practical Assessment:** Standardized checklists for observable tasks.
- **AI-Assisted Evidence Analysis:** Pre-computed mock AI analysis of uploaded evidence to recommend rubric scores.
- **Human-in-the-Loop Validation:** Assessor Dashboard allowing final scoring and review.
- **Offline-First (PWA):** Progressive Web App architecture with IndexedDB for completing assessments in low-connectivity environments.
- **Research Dashboard:** Validates inter-assessor consistency metrics.

## Tech Stack
- **Frontend:** React, Vite, TypeScript, Tailwind CSS, shadcn/ui components, Vite PWA, IndexedDB
- **Backend:** FastAPI, Python, SQLAlchemy, SQLite (for prototype persistence)

## Setup & Local Development

### Prerequisites
- Node.js (v18+)
- Python (3.10+)

### 1. Backend Setup
```bash
cd backend
python -m venv venv
# Activate venv (Windows: .\venv\Scripts\activate, Linux/Mac: source venv/bin/activate)
pip install "fastapi[standard]" sqlalchemy pydantic alembic
python seed.py
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
The backend API will be running at `http://localhost:8000`.

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The frontend will be running at `http://localhost:5173`.

## Deployment Guide

### Frontend Deployment (Vercel)
1. Push this repository to GitHub.
2. Log into Vercel and import the project.
3. Set the Framework Preset to `Vite`.
4. Root Directory: `frontend`
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Click **Deploy**.

### Backend Deployment (Render)
1. In Render, create a new Web Service.
2. Connect the GitHub repository.
3. Root Directory: `backend`
4. Environment: `Python`
5. Build Command: `pip install -r requirements.txt` (ensure you generate this file first: `pip freeze > requirements.txt`)
6. Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
7. Click **Create Web Service**.
*(Note: For production, use PostgreSQL instead of SQLite and update `DATABASE_URL` environment variable).*

## Demo Flow
1. Open the application.
2. Click **Start Demo** to begin the worker journey.
3. Complete the Self-Declaration form.
4. Review the **AI Qualification Mapping** result.
5. Review the Practical Assessment checklist and "Upload" evidence (uses mock video).
6. Submit the assessment.
7. Navigate to the **Assessor** dashboard (via header navigation).
8. Click **Start Review** for the pending assessment.
9. Compare the AI Recommended score with the rubric and provide the final Assessor Score.
10. Click **Validate & Finalize Score**.
11. Navigate to the **Admin** dashboard to view consistency improvements and research analytics.

## Demo Credentials (If Authentication is Enabled later)
- **Worker:** ravi.kumar / demo123
- **Assessor:** assessor.01 / demo123
- **Admin:** admin / admin123

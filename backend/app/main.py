from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.models import domain
from app.routers import workers, assessments, data, sync

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="RPL Assessment API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(workers.router, prefix="/api")
app.include_router(assessments.router, prefix="/api")
app.include_router(data.router, prefix="/api")
app.include_router(sync.router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "Welcome to RPL Assessment API"}

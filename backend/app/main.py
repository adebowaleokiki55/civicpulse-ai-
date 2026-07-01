from dotenv import load_dotenv

# Load environment variables before importing app modules
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db.database import Base, engine   # ✅ ADD THIS
from app.routes import auth, issues, government
from app.models import issue               # ✅ IMPORTANT: register model

app = FastAPI(
    title="CivicPulse AI",
    description="AI-powered citizen issue reporting and government workflow platform",
    version="2.0.0",
)

# -------------------------
# CREATE DATABASE TABLES
# -------------------------
Base.metadata.create_all(bind=engine)

# -------------------------
# CORS
# -------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# API Routers
# -------------------------

app.include_router(auth.router)
app.include_router(issues.router)
app.include_router(government.router)

# -------------------------
# Root
# -------------------------

@app.get("/")
def root():
    return {
        "name": "CivicPulse AI",
        "version": "2.0",
        "status": "running",
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }

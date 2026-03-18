from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from fastapi.staticfiles import StaticFiles
import os
from .routers import packages, stays, cabs, bookings, admin

# Create Tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Hill Station Platform API", version="0.1.0")

# Ensure static/uploads exists
if not os.path.exists("static/uploads"):
    os.makedirs("static/uploads", exist_ok=True)

# Mount static files
app.mount("/uploads", StaticFiles(directory="static/uploads"), name="uploads")

# CORS
# ... (existing CORS code)
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3002",
    "http://127.0.0.1:3002",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(packages.router)
app.include_router(stays.router)
app.include_router(cabs.router)
app.include_router(bookings.router)
app.include_router(admin.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Hill Station Platform API"}

@app.get("/health")
def health_check():
    return {"status": "ok"}

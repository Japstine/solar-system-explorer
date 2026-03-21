from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.positions import router as positions_router
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="Solar System Explorer API",
    description="Real-time planetary and space object positions via NASA Horizons",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(positions_router)

@app.get("/")
async def root():
    return {"status": "online", "message": "Solar System Explorer API"}

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your Next.js frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Example model
class Item(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float | None = None

@app.get("/")
async def read_root():
    return {"message": "Welcome to the FastAPI backend!"}

@app.get("/api/items/{item_id}")
async def read_item(item_id: int):
    return {"item_id": item_id, "message": "Item retrieved successfully"}

@app.post("/api/items/")
async def create_item(item: Item):
    return {"item": item, "message": "Item created successfully"} 
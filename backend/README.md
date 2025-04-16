# FastAPI Backend

This is the backend server for the application, built with FastAPI.

## Setup

1. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

## Running the Server

To start the server, run:
```bash
uvicorn main:app --reload
```

The server will start at `http://localhost:8000`

## API Documentation

Once the server is running, you can access:
- Swagger UI documentation: `http://localhost:8000/docs`
- ReDoc documentation: `http://localhost:8000/redoc`

## Available Endpoints

- `GET /`: Welcome message
- `GET /api/items/{item_id}`: Get item by ID
- `POST /api/items/`: Create a new item 
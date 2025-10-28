# backend/main.py
from fastapi import FastAPI, HTTPException
import os
import psycopg2
from psycopg2.extras import RealDictCursor

app = FastAPI(title="InfraBack - simple DB check")

# Read DB config from env
DB_HOST = os.getenv("POSTGRES_HOST", "postgres")
DB_PORT = int(os.getenv("POSTGRES_PORT", 5432))
DB_NAME = os.getenv("POSTGRES_DB", "analyticsdb")
DB_USER = os.getenv("POSTGRES_USER", "admin")
DB_PASS = os.getenv("POSTGRES_PASSWORD", "luannv@1231")

def get_conn():
    return psycopg2.connect(
        host=DB_HOST,
        port=DB_PORT,
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASS
    )

@app.get("/")
def root():
    return {"service": "infraback", "status": "ok"}

@app.get("/db")
def db_now():
    try:
        with get_conn() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("SELECT now() AS now")
                row = cur.fetchone()
                return {"db_time": row["now"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"DB connection error: {str(e)}")

# optional health check for K8s
@app.get("/health")
def health():
    try:
        with get_conn() as conn:
            return {"db": "ok"}
    except Exception:
        return {"db": "unavailable"}

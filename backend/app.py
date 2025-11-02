# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import os
import time

app = Flask(__name__)
CORS(app)  # allow cross-origin from browser

DB_HOST = os.getenv("POSTGRES_HOST", "postgres-service.dbcenter")
DB_PORT = int(os.getenv("POSTGRES_PORT", 5432))
DB_NAME = os.getenv("POSTGRES_DB", "infradb")
DB_USER = os.getenv("POSTGRES_USER", "infrauser")
DB_PASS = os.getenv("POSTGRES_PASSWORD", "123456")

def get_conn():
    return psycopg2.connect(
        host=DB_HOST,
        port=DB_PORT,
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASS,
        connect_timeout=5
    )

# Try connecting to DB with retries
def wait_db_ready(retries=5, delay=3):
    for i in range(retries):
        try:
            conn = get_conn()
            conn.close()
            return True
        except Exception as e:
            print(f"[WARN] DB not ready ({i+1}/{retries}): {e}")
            time.sleep(delay)
    return False

@app.route("/health", methods=["GET"])
def health():
    # quick health: can reach DB?
    ok = False
    try:
        conn = get_conn()
        conn.close()
        ok = True
    except Exception:
        ok = False
    return jsonify({"db": "ok" if ok else "unreachable"}), (200 if ok else 500)

@app.route("/dbcheck", methods=["GET"])
def dbcheck():
    try:
        conn = get_conn()
        cur = conn.cursor()
        cur.execute("SELECT 1")
        cur.close()
        conn.close()
        return jsonify({"db": "ok"}), 200
    except Exception as e:
        return jsonify({"db": "error", "detail": str(e)}), 500

@app.route("/api/login", methods=["POST"])
def api_login():
    data = request.get_json() or {}
    username = data.get("username")
    password = data.get("password")
    if not username or not password:
        return jsonify({"status": "fail", "message": "username/password required"}), 400

    try:
        conn = get_conn()
        cur = conn.cursor()
        cur.execute("SELECT id, full_name FROM users WHERE username=%s AND password=%s", (username, password))
        row = cur.fetchone()
        cur.close()
        conn.close()
        if row:
            return jsonify({"status": "success", "user": {"id": row[0], "full_name": row[1]}})
        else:
            return jsonify({"status": "fail", "message": "Invalid credentials"}), 401
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == "__main__":
    print("[INFO] Waiting DB ready...")
    if not wait_db_ready(retries=10, delay=3):
        print("[ERROR] DB not ready. Exiting.")
        exit(1)
    print("[INFO] Starting backend on 8000")
    app.run(host="0.0.0.0", port=8000)

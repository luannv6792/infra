from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import os
import time

app = Flask(__name__)
CORS(app)

DB_HOST = os.getenv("POSTGRES_HOST", "postgres-service.dbcenter.svc.cluster.local")
DB_PORT = int(os.getenv("POSTGRES_PORT", 5432))
DB_NAME = os.getenv("POSTGRES_DB", "infradb")
DB_USER = os.getenv("POSTGRES_USER", "infrauser")
DB_PASS = os.getenv("POSTGRES_PASSWORD", "123456")

def get_conn():
    return psycopg2.connect(host=DB_HOST, port=DB_PORT, dbname=DB_NAME, user=DB_USER, password=DB_PASS, connect_timeout=5)

def wait_db(retries=8, delay=3):
    for i in range(retries):
        try:
            conn = get_conn()
            conn.close()
            return True
        except Exception as e:
            print(f"[WARN] DB not ready ({i+1}/{retries}): {e}")
            time.sleep(delay)
    return False

@app.route("/health")
def health():
    try:
        conn = get_conn(); conn.close()
        return jsonify({"db": "ok"})
    except Exception as e:
        return jsonify({"db": "error", "detail": str(e)}), 500

@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    username = data.get("username")
    password = data.get("password")
    if not username or not password:
        return jsonify({"success": False, "message": "Missing username/password"}), 400
    try:
        conn = get_conn()
        cur = conn.cursor()
        cur.execute("SELECT id, username FROM users WHERE username=%s AND password=%s", (username, password))
        row = cur.fetchone()
        cur.close()
        conn.close()
        if row:
            return jsonify({"success": True, "message": "Login success", "user": {"id": row[0], "username": row[1]}})
        else:
            return jsonify({"success": False, "message": "Invalid username or password"}), 401
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

if __name__ == "__main__":
    print("[INFO] waiting for db...")
    if not wait_db():
        print("[ERROR] db not ready, exiting")
        exit(1)
    app.run(host="0.0.0.0", port=8000)

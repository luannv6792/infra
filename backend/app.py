from flask import Flask, request, jsonify
import psycopg2
import os
import time

app = Flask(__name__)

DB_HOST = os.getenv("POSTGRES_HOST", "postgres-service.dbcenter.svc.cluster.local")
DB_NAME = os.getenv("POSTGRES_DB", "infradb")
DB_USER = os.getenv("POSTGRES_USER", "admin")
DB_PASS = os.getenv("POSTGRES_PASSWORD", "luannv@1231")

def check_db_connection():
    """Thử kết nối DB, nếu lỗi thì retry 5 lần trước khi báo fail."""
    for i in range(5):
        try:
            conn = psycopg2.connect(
                host=DB_HOST, dbname=DB_NAME, user=DB_USER, password=DB_PASS
            )
            conn.close()
            return True
        except Exception as e:
            print(f"[WARN] Database not ready (attempt {i+1}/5): {e}")
            time.sleep(3)
    return False

@app.route("/healthz", methods=["GET"])
def healthz():
    """API health-check để xác minh backend & database hoạt động."""
    ok = check_db_connection()
    if ok:
        return jsonify({"status": "ok", "db": "connected"}), 200
    else:
        return jsonify({"status": "error", "db": "unreachable"}), 500

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    try:
        conn = psycopg2.connect(
            host=DB_HOST, dbname=DB_NAME, user=DB_USER, password=DB_PASS
        )
        cur = conn.cursor()
        cur.execute("SELECT password FROM users WHERE username = %s", (username,))
        result = cur.fetchone()
        conn.close()

        if result and result[0] == password:
            return jsonify({"message": "Đăng nhập thành công!"})
        else:
            return jsonify({"message": "Sai tên đăng nhập hoặc mật khẩu."}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    print("[INFO] Checking database connection before starting Flask...")
    if not check_db_connection():
        print("[ERROR] Database connection failed. Exiting.")
        exit(1)
    print("[INFO] Database ready. Starting Flask server.")
    app.run(host="0.0.0.0", port=5000)

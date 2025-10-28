from flask import Flask, jsonify
import psycopg2

app = Flask(__name__)

@app.route("/status")
def status():
    try:
        conn = psycopg2.connect(
            dbname="infradb",
            user="postgres",
            password="postgres",
            host="postgres-service",  # service name trong k8s
            port="5432"
        )
        conn.close()
        return jsonify({"db_status": "connected"})
    except Exception as e:
        return jsonify({"db_status": "error", "detail": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

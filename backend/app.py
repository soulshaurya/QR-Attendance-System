# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
from datetime import datetime
import os

DB = os.path.join(os.path.dirname(__file__), "attendance.db")
app = Flask(__name__)
CORS(app, supports_credentials=True)

def init_db():
    conn = sqlite3.connect(DB)
    c = conn.cursor()
    c.execute("""
    CREATE TABLE IF NOT EXISTS attendance (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      token TEXT,
      roll TEXT,
      name TEXT,
      gps_lat REAL,
      gps_lon REAL,
      gps_acc REAL,
      timestamp TEXT
    )
    """)
    conn.commit()
    conn.close()

@app.route("/api/attendance", methods=["POST"])
def add_attendance():
    data = request.get_json() or {}
    token = data.get("token")
    roll = data.get("roll")
    name = data.get("name")
    ts = data.get("timestamp") or datetime.utcnow().isoformat()
    gps = data.get("gps") or {}
    lat = gps.get("lat")
    lon = gps.get("lon")
    acc = gps.get("accuracy") or gps.get("acc") or gps.get("accuracy", None)

    conn = sqlite3.connect(DB)
    c = conn.cursor()
    c.execute("""INSERT INTO attendance (token, roll, name, gps_lat, gps_lon, gps_acc, timestamp)
                 VALUES (?, ?, ?, ?, ?, ?, ?)""",
              (token, roll, name, lat, lon, acc, ts))
    conn.commit()
    conn.close()
    return jsonify({"status":"ok"}), 201

@app.route("/api/attendance", methods=["GET"])
def get_attendance():
    conn = sqlite3.connect(DB)
    c = conn.cursor()
    c.execute("SELECT token, roll, name, gps_lat, gps_lon, gps_acc, timestamp FROM attendance ORDER BY id DESC LIMIT 500")
    rows = c.fetchall()
    conn.close()
    data = []
    for r in rows:
        token, roll, name, lat, lon, acc, ts = r
        data.append({
            "token": token, "roll": roll, "name": name,
            "gps": {"lat": lat, "lon": lon, "acc": acc} if lat or lon or acc else None,
            "timestamp": ts
        })
    return jsonify(data)

if __name__ == "__main__":
    init_db()
    app.run(host="0.0.0.0", port=5000, debug=True)
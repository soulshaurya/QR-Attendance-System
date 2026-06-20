// src/pages/AttendanceSuccess.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const BACKEND = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

const AttendanceSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // on mount, submit attendance
    const submitAttendance = async () => {
      try {
        // token is in query param (attendance-success?token=...)
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token") || `attendance-${Date.now()}`;

        // try to get student details from localStorage (set at login)
        const student = JSON.parse(localStorage.getItem("student") || "{}");
        const payload = {
          token,
          roll: student.roll || null,
          name: student.name || null,
          timestamp: new Date().toISOString()
        };

        // optional: try to get geolocation (best-effort)
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (pos) => {
              payload['gps'] = {
                lat: pos.coords.latitude,
                lon: pos.coords.longitude,
                accuracy: pos.coords.accuracy
              };
              await fetch(`${BACKEND}/api/attendance`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
                credentials: "include"
              });
            },
            async () => {
              // if geolocation denied, still send without gps
              await fetch(`${BACKEND}/api/attendance`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
                credentials: "include"
              });
            },
            { timeout: 5000 }
          );
        } else {
          // no geolocation
          await fetch(`${BACKEND}/api/attendance`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            credentials: "include"
          });
        }
      } catch (err) {
        console.error("Attendance submit failed:", err);
      }
    };

    submitAttendance();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-primary mb-2 uppercase tracking-wider">
          Gautam Buddha University
        </h1>
        <h2 className="text-lg text-muted-foreground mb-8">
          Attendance submitted successfully
        </h2>

        <div className="text-6xl text-primary mb-6 text-glow">
          <CheckCircle className="mx-auto" size={80} />
        </div>

        <Button onClick={() => navigate("/")} className="btn-glow text-primary-foreground font-medium mb-6">
          Go to Home
        </Button>

        <div className="text-sm text-muted-foreground">
          © QR Attendance System 2025 - Team BYTEFORCE
        </div>
      </div>
    </div>
  );
};

export default AttendanceSuccess;
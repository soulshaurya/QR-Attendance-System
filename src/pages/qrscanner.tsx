import { useState } from "react";
import { QrReader } from "react-qr-reader";

export default function QRScanner() {
  const [result, setResult] = useState<string>("");

  const handleScan = (data: any) => {
    if (data) {
      setResult(data?.text || data);

      // QR code me JSON format { student_id, name } hona chahiye
      try {
        const student = JSON.parse(data?.text || data);
        fetch("http://127.0.0.1:5000/api/mark_attendance", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(student),
        })
          .then((res) => res.json())
          .then((resp) => console.log(resp));
      } catch (err) {
        console.error("Invalid QR Data", err);
      }
    }
  };

  return (
    <div>
      <h2>QR Scanner</h2>
      <QrReader
        constraints={{ facingMode: "environment" }}
        onResult={(result, error) => {
          if (!!result) {
            handleScan(result);
          }
        }}
        style={{ width: "300px" }}
      />
      <p>Scanned: {result}</p>
    </div>
  );
}

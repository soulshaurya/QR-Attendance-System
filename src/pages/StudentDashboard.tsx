import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import QRCode from "qrcode";

const StudentDashboard = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const navigate = useNavigate();

  const generateQRCode = () => {
    const uniqueToken = `attendance-${Date.now()}`;
    const attendanceUrl = `${window.location.origin}/attendance-success?token=${uniqueToken}`;
    
    QRCode.toDataURL(attendanceUrl, {
      width: 200,
      margin: 2,
      color: {
        dark: '#00e0ff',
        light: '#0000'
      }
    }).then(url => {
      setQrCodeUrl(url);
    });
  };

  useEffect(() => {
    generateQRCode();
    const interval = setInterval(generateQRCode, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card p-8">
          <h1 className="text-2xl font-bold text-primary text-center mb-2 uppercase tracking-wider">
            Gautam Buddha University
          </h1>
          <h2 className="text-lg text-center text-muted-foreground mb-8">
            Attendance Portal
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Present Count Card */}
            <div className="glass-card p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-4">
                Present Count: 0
              </div>
              <div className="space-y-3">
                <Button 
                  onClick={() => navigate("/manual-attendance")}
                  className="w-full btn-glow text-primary-foreground"
                >
                  Add Manually
                </Button>
                <Button 
                  onClick={() => navigate("/attendance-success")}
                  className="w-full btn-glow text-primary-foreground"
                >
                  Submit
                </Button>
              </div>
            </div>

            {/* QR Code Card */}
            <div className="glass-card p-6 text-center">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Scan QR to Mark Attendance
              </h3>
              <div className="qr-container mx-auto w-fit">
                {qrCodeUrl && (
                  <img 
                    src={qrCodeUrl} 
                    alt="QR Code for Attendance" 
                    className="mx-auto animate-pulse-glow rounded-lg"
                  />
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                QR code refreshes every 10 seconds
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Button 
              variant="outline" 
              onClick={() => navigate("/")}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
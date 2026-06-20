import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, QrCode, BarChart3, Shield } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card p-8 text-center">
          <h1 className="text-4xl font-bold text-primary mb-4 text-glow uppercase tracking-wider">
            Gautam Buddha University
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            QR-Based Attendance Management System
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Student Portal */}
            <Card className="glass-card border-primary/20 hover:border-primary/40 transition-all cursor-pointer group" 
                  onClick={() => navigate("/student-login")}>
              <CardHeader>
                <CardTitle className="text-primary flex items-center justify-center gap-3 group-hover:text-accent transition-colors">
                  <Users size={24} />
                  Student Portal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Access attendance dashboard and mark your presence</p>
                <div className="flex items-center justify-center gap-2 text-sm text-primary">
                  <QrCode size={16} />
                  QR Code Scanning
                </div>
              </CardContent>
            </Card>

            {/* Faculty Portal */}
            <Card className="glass-card border-primary/20 hover:border-primary/40 transition-all cursor-pointer group" 
                  onClick={() => navigate("/faculty-login")}>
              <CardHeader>
                <CardTitle className="text-primary flex items-center justify-center gap-3 group-hover:text-accent transition-colors">
                  <Shield size={24} />
                  Faculty Portal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">View attendance records and analytics dashboard</p>
                <div className="flex items-center justify-center gap-2 text-sm text-primary">
                  <BarChart3 size={16} />
                  Analytics & Reports
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Button 
              size="lg"
              onClick={() => navigate("/student-login")}
              className="btn-glow text-primary-foreground font-medium px-8"
            >
              Get Started
            </Button>
            
            <div className="text-sm text-muted-foreground">
              © 2025 Team BYTEFORCE - QR Attendance System
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

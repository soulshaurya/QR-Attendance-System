import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const students = [
  "245UCS190 - Shaurya Kant Gautam",
  "245UCS185 - Shalini Kumari", 
  "245UCS181 - Sarthak Ratna Singh",
  "245UCS236 - Vedika Kumari",
  "245UCD051 - Sanskriti",
  "245UCD029 - Aditi Kumari"
];

const ManualAttendance = () => {
  const [selectedStudent, setSelectedStudent] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedStudent || !email) {
      toast({
        title: "Error",
        description: "Please select a student and enter email",
        variant: "destructive",
      });
      return;
    }

    // Store attendance data (in real app would send to backend)
    const attendanceData = {
      student: selectedStudent,
      email: email,
      timestamp: new Date().toISOString()
    };
    
    console.log("Attendance marked:", attendanceData);
    
    toast({
      title: "Success",
      description: "Attendance marked successfully!",
    });
    
    navigate("/attendance-success");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-primary text-center mb-2 uppercase tracking-wider">
          Gautam Buddha University
        </h1>
        <h2 className="text-lg text-center text-muted-foreground mb-6">
          Select Student
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="glass-card p-4 text-left">
            <RadioGroup value={selectedStudent} onValueChange={setSelectedStudent}>
              {students.map((student) => (
                <div key={student} className="flex items-center space-x-3">
                  <RadioGroupItem 
                    value={student} 
                    id={student}
                    className="border-primary text-primary"
                  />
                  <Label 
                    htmlFor={student} 
                    className="text-sm text-foreground cursor-pointer hover:text-primary transition-colors"
                  >
                    {student}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-glass text-foreground placeholder:text-muted-foreground"
            required
          />

          <Button type="submit" className="w-full btn-glow text-primary-foreground font-medium">
            Submit
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Button 
            variant="outline" 
            onClick={() => navigate("/student-dashboard")}
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ManualAttendance;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

const StudentLogin = () => {
  const [rollNo, setRollNo] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!rollNo || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Simple validation - in real app would check against database
    toast({
      title: "Login Successful",
      description: "Welcome to the attendance system!",
    });
    navigate("/student-dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-md p-8 text-center">
        <h1 className="text-2xl font-bold text-primary mb-2 uppercase tracking-wider">
          Student Login
        </h1>
        <h2 className="text-lg text-muted-foreground mb-8">
          Gautam Buddha University
        </h2>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <Input
            type="text"
            placeholder="Enter Roll No"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            className="input-glass text-foreground placeholder:text-muted-foreground"
          />
          
          <Input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-glass text-foreground placeholder:text-muted-foreground"
          />
          
          <Button type="submit" className="w-full btn-glow text-primary-foreground font-medium">
            Login
          </Button>
        </form>
        
        <div 
          className="mt-6 text-primary cursor-pointer hover:text-accent transition-colors"
          onClick={() => navigate("/faculty-login")}
        >
          Login as Faculty
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
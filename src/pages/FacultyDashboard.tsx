import { useState, useEffect } from "react";

const BACKEND = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

// Master list of students
const students = [
  {
    name: "Shaurya Kant Gautam",
    roll: "245UCS190",
    email: "shauryadelhi2022@gmail.com",
    dept: "CSE",
  },
  {
    name: "Sarthak Ratna Singh",
    roll: "245UCS181",
    email: "singhsarthakratna3107@gmail.com",
    dept: "CSE",
  },
  {
    name: "Vedika Kumari",
    roll: "245UCS236",
    email: "vedikakumari005@gmail.com",
    dept: "CSE",
  },
  {
    name: "Shalini Kumari",
    roll: "245UCS185",
    email: "jhashalini363@gmail.com",
    dept: "CSE",
  },
  {
    name: "Sanskriti",
    roll: "245UCD051",
    email: "sanskritithakur591@gmail.com",
    dept: "CSE",
  },
  {
    name: "Aditi Kumari",
    roll: "245UCD029",
    email: "aditibhardwaj336@gmail.com",
    dept: "CSE",
  },
];

export default function FacultyDashboard() {
  const [attendanceList, setAttendanceList] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${BACKEND}/api/attendance`);
        if (res.ok) {
          const data = await res.json();
          setAttendanceList(data);
        } else {
          console.error("Failed to fetch attendance", res.status);
        }
      } catch (err) {
        console.error(err);
      }
    };
    load();
    const iv = setInterval(load, 5000); // refresh every 5s
    return () => clearInterval(iv);
  }, []);

  // Helper: check if a roll is marked present
  const isPresent = (roll: string) =>
    attendanceList.some((a) => a.roll === roll);

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold">Faculty Dashboard</h2>

      {/* Students Master List with Present/Absent */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Student List</h3>
        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 py-2 border">Roll No</th>
                <th className="px-3 py-2 border">Name</th>
                <th className="px-3 py-2 border">Email</th>
                <th className="px-3 py-2 border">Dept</th>
                <th className="px-3 py-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) => (
                <tr key={i}>
                  <td className="px-3 py-2 border">{s.roll}</td>
                  <td className="px-3 py-2 border">{s.name}</td>
                  <td className="px-3 py-2 border">{s.email}</td>
                  <td className="px-3 py-2 border">{s.dept}</td>
                  <td
                    className={`px-3 py-2 border font-semibold ${
                      isPresent(s.roll) ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {isPresent(s.roll) ? "Present" : "Absent"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Attendance Records */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Recent Attendance</h3>
        <div className="overflow-x-auto max-h-96">
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 py-2 border">Time</th>
                <th className="px-3 py-2 border">Roll</th>
                <th className="px-3 py-2 border">Name</th>
                <th className="px-3 py-2 border">Token</th>
              </tr>
            </thead>
            <tbody>
              {attendanceList.map((a, i) => (
                <tr key={i}>
                  <td className="px-3 py-2 border">
                    {new Date(a.timestamp).toLocaleString()}
                  </td>
                  <td className="px-3 py-2 border">{a.roll || "-"}</td>
                  <td className="px-3 py-2 border">{a.name || "-"}</td>
                  <td className="px-3 py-2 border max-w-[200px] truncate">
                    {a.token}
                  </td>
                </tr>
              ))}
              {attendanceList.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-3 py-4 text-center text-gray-500">
                    No attendance records yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
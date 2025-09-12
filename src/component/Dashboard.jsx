import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { students as initialStudents } from "../data/DummyData";
import { teachers as initialTeachers } from "../data/DummyData";
import { courses as initialCourses } from "../data/DummyData";

function Dashboard() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    // Load data from localStorage or fallback
    const storedStudents = JSON.parse(localStorage.getItem("students")) || initialStudents;
    const storedTeachers = JSON.parse(localStorage.getItem("teachers")) || initialTeachers;
    const storedCourses = JSON.parse(localStorage.getItem("courses")) || initialCourses;

    setStudents(storedStudents);
    setTeachers(storedTeachers);
    console.log('[Dashboard] teachers loaded:', storedTeachers);
    setCourses(storedCourses);
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) return null;

  // inside Dashboard component after fetching data



  return (
    <div className="flex-1 p-8 bg-white rounded-tl-2xl rounded-bl-2xl shadow-sm ">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-[linear-gradient(84deg,rgba(255,255,255,0)_-8.3%,#F6F8FA_100%)] rounded-lg shadow text-center">
          <h2 className="text-xl font-bold text-gray-800">Students</h2>
          <p className="text-3xl font-semibold text-blue-700">{students.length}</p>
        </div>
        <div className="p-6 bg-[linear-gradient(84deg,rgba(255,255,255,0)_-8.3%,#F6F8FA_100%)] rounded-lg shadow text-center">
          <h2 className="text-xl font-bold text-gray-800">Teachers</h2>
          <p className="text-3xl font-semibold text-green-700">{teachers.length}</p>
        </div>
        <div className="p-6 bg-[linear-gradient(84deg,rgba(255,255,255,0)_-8.3%,#F6F8FA_100%)] rounded-lg shadow text-center">
          <h2 className="text-xl font-bold text-gray-800">Courses</h2>
          <p className="text-3xl font-semibold text-yellow-700">{courses.length}</p>
        </div>
      </div>

{/* recent activity card */}

{/* Recent Students */}
<div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-gray-700">Recent Students</h2>
          <button
            onClick={() => navigate("/students")}
            className="text-blue-600 hover:underline"
          >
            View All
          </button>
        </div>
        <ul className="divide-y divide-gray-200">
          {students.slice(-5).map((s) => (
            <li key={s.id} className="py-2">
              <span className="font-medium">{s.name}</span> – Class {s.class}
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Teachers */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-gray-700">Recent Teachers</h2>
          <button
            onClick={() => navigate("/teachers")}
            className="text-blue-600 hover:underline"
          >
            View All
          </button>
        </div>
        <ul className="divide-y divide-gray-200">
          {teachers.slice(-5).map((t) => (
            <li key={t.id} className="py-2">
              <span className="font-medium">{t.name}</span> – {t.subject}
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Courses */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-gray-700">Recent Courses</h2>
          <button
            onClick={() => navigate("/courses")}
            className="text-blue-600 hover:underline"
          >
            View All
          </button>
        </div>
        <ul className="divide-y divide-gray-200">
          {courses.slice(-5).map((c) => (
            <li key={c.id} className="py-2">
              <span className="font-medium">{c.name || c.title}</span> – {c.teacher || c.code}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}

export default Dashboard;

import React, { useState, useEffect } from "react";
import { students as initialStudents } from "../data/DummyData";
import Table from "./Table";
import { toast } from "react-toastify";

function Students() {
  const [isOpen, setIsOpen] = useState(false);

  const [newStudent, setNewStudent] = useState({
    name: "",
    rollNo: "",
    class: "",
  });
  const [selectedStudent, setSelectedStudent] = useState(null); // 👈 for details modal

  // filtering
  const [search, setSearch] = useState("");

  // use state for selecting gender
  const [gender, setGender] = useState("");

  useEffect(() => {
    if (selectedStudent) {
      document.body.style.overflow = "hidden"; // lock scroll
    } else {
      document.body.style.overflow = "auto"; // restore scroll
    }

    return () => {
      document.body.style.overflow = "auto"; // cleanup
    };
  }, [selectedStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (newStudent.name && newStudent.rollNo && newStudent.class) {
      const updated = [
        ...students,
        {
          id: Date.now(),
          name: newStudent.name,
          rollNo: newStudent.rollNo,
          class: newStudent.class,
          contact: newStudent.contact,
          gender: gender,
          age: newStudent.age,
          details: {
            city: newStudent.city || "",
            profession: newStudent.profession || "",
            
          },
        },
      ];
      setStudents(updated);
      localStorage.setItem("students", JSON.stringify(updated));
      setNewStudent({
        name: "",
        rollNo: "",
        class: "",
        age: "",
        city: "",
        profession: "",
        contact: "",
      });
      setIsOpen(false);
      setGender("");
      toast.success("Student added successfully!");
    }
  };

  const handleDelete = (id) => {
    const updated = students.filter((s) => s.id !== id);
    setStudents(updated);

    if (updated.length === 0) {
      // remove key completely if no students left
      localStorage.removeItem("students");
    } else {
      localStorage.setItem("students", JSON.stringify(updated));
    }
  };

  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("students");
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.length > 0 ? parsed : initialStudents;
    }
    return initialStudents;
  });

  const handleView = (student) => {
    setSelectedStudent(student);
  };

  const columns = [
    { key: "name", label: "Name" },
    { key: "rollNo", label: "Roll No" },
    { key: "class", label: "Class" },
    { key: "age", label: "Age" },
    { key: "gender", label: "Gender" },
    { key: "contact", label: "Contact" },
  ];

  const filteredStudents = students.filter((student) =>
    (student.name || "").toLowerCase().includes(search.toLowerCase())
  );

  // creating labels for radio buttons
  const options = ["male", "female", "other"];

  return (
    <div className="flex ">
      <div className="flex-1 p-8 bg-white shadow-sm">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Students</h1>

          <input
            type="text"
            value={search}
            placeholder="Search student..."
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <button
            onClick={() => setIsOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            + Add Student
          </button>
        </div>

        {/* Reusable Table */}
        {search.trim() === "" ? (
          <Table
            data={students}
            columns={columns}
            onDelete={handleDelete}
            onView={handleView}
          />
        ) : filteredStudents.length > 0 ? (
          <Table
            data={filteredStudents}
            columns={columns}
            onDelete={handleDelete}
            onView={handleView}
          />
        ) : (
          <p className="text-center text-gray-500">
            No students found matching "{search}"
          </p>
        )}
      </div>

      {/* Add Student Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Add Student
            </h2>

            <form className="space-y-4" onSubmit={handleAdd}>
              <input
                type="text"
                name="name"
                placeholder="Enter student name"
                value={newStudent.name}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
<div className="flex gap-2.5">

              <input
                type="text"
                name="rollNo"
                placeholder="Enter roll number"
                pattern="^\d{2}$"
                value={newStudent.rollNo}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />

              <input
                type="text"
                name="class"
                placeholder="Enter class"
                pattern="^\d$"
                value={newStudent.class}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
</div>
              <input
                type="text"
                name="age"
                placeholder="Enter age"
                pattern="^\d{2}$"
                value={newStudent.age}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />


              <input
                type="text"
                name="contact"
                placeholder="Enter phone number"
                pattern="^03\d{9}$"
                title="Phone number must be 11 digits and start with 03"
                value={newStudent.contact}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
              <p className="font-semibold mb-1">Gender ?</p>
              <div className="flex gap-2">
                {options.map((option) => (
                  <label
                    className="flex items-center gap-1 justify-center"
                    htmlFor="gender"
                    key={option}
                  >
                    <input
                      type="radio"
                      name="gender"
                      required
                      value={option}
                      checked={gender === option}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </label>
                ))}
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Student Details Modal */}
      {/* Student Details Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
          <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl relative max-h-[80vh] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Student Details
              </h2>
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-2 py-1 hover:bg-red-500 hover:text-white rounded transition"
              >
                ✕
              </button>
            </div>

            {/* Student Info Grid */}
            <div className="grid grid-cols-1 gap-4 text-gray-700">
  {Object.entries(selectedStudent).map(([key, value]) => {
    // Skip the 'id' field
    if (key === "id") return null;

    // Handle nested 'details' object
    if (key === "details" && typeof value === "object" && value !== null) {
      return (
        <div key={key} className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-800 capitalize mt-4">
            {key}
          </h3>
          {Object.entries(value).map(([subKey, subValue]) => (
            <div
              key={`${key}-${subKey}`}
              className="flex justify-between bg-gray-50 p-3 rounded-lg shadow-sm"
            >
              <span className="capitalize font-medium">{subKey}:</span>
              <span className="text-gray-800">{subValue ?? "N/A"}</span>
            </div>
          ))}
        </div>
      );
    }

    // Handle top-level properties
    return (
      <div
        key={key}
        className="flex justify-between bg-gray-50 p-3 rounded-lg shadow-sm"
      >
        <span className="capitalize font-medium">{key}:</span>
        <span className="text-gray-800">{value ?? "N/A"}</span>
      </div>
    );
  })}
</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Students;

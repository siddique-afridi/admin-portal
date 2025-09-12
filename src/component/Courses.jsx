import React, { useState } from "react";
import { courses as initialCourses } from "../data/DummyData";
import Table from "./Table";
import { toast } from "react-toastify";

function Courses() {
  const [isOpen, setIsOpen] = useState(false);

  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem("courses");
    return saved ? JSON.parse(saved) : initialCourses;
  });

  const [newCourse, setNewCourse] = useState({ name: "", teacher: "" });
  // 🔎 Search state  1 (START FILTERING)
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (newCourse.name && newCourse.teacher) {
      const updated = [...courses, { id: Date.now(), ...newCourse }];
      setCourses(updated);
      localStorage.setItem("courses", JSON.stringify(updated));
      setNewCourse({ name: "", teacher: "" });
      setIsOpen(false);
       // ✅ Show success toast
    toast.success("Course added successfully!");
    }
  };

  const handleDelete = (id) => {
    const updated = courses.filter((course) => course.id !== id);
    setCourses(updated);
    localStorage.setItem("courses", JSON.stringify(updated));
  };

  const columns = [
    { key: "name", label: "Course Name" },
    { key: "teacher", label: "Teacher" },
    {key:"credits", label:"Credit Hours"},
    {key:"duration", label:"Duration"},
  ];

  // 🔎 Filter courses based on search   2
  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(search.toLowerCase())
  );
  // THIS IS FOR TYPING THE EXACT FULL NAME OF COURSE AFTER WHICH COURSE WILL BE SHOWN

  // const filteredCourses = courses.filter((course) =>
  //   course.name.toLowerCase() === search.toLowerCase()
  // );
  
  return (
    <div className="flex">
      <div className="flex-1 p-8 bg-white  shadow-sm">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Courses</h1>

          <input
            type="text"
            placeholder="Search course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <button
            onClick={() => setIsOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            + Add Course
          </button>
        </div>

        {/* Table or "not found" message   3 (END)FILTERING */}
        {search.trim() === "" ? (
          // Show all courses when search is empty
          <Table data={courses} columns={columns} onDelete={handleDelete} />
        ) : filteredCourses.length > 0 ? (
          // Show filtered table when search has text
          <Table
            data={filteredCourses}
            columns={columns}
            onDelete={handleDelete}
          />
        ) : (
          // Show message if no match
          <p className="text-gray-500 text-center">
            No courses found matching "{search}"
          </p>
        )}
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Add Course</h2>

            <form className="space-y-4" onSubmit={handleAdd}>
              <input
                type="text"
                name="name"
                placeholder="Enter course name"
                value={newCourse.name}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
              <input
                type="number"
                name="credits"
                placeholder="Enter credithours"
                value={newCourse.credits}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />

              <input
                type="text"
                name="teacher"
                placeholder="Enter teacher name"
                value={newCourse.teacher}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />

              <input
                type="number"
                name="duration"
                placeholder="course duration"
                value={newCourse.duration}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />

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
    </div>
  );
}

export default Courses;

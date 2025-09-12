import React, { useState } from 'react';
import { teachers as initialTeachers } from '../data/DummyData';
import Table from './Table';
import { toast } from "react-toastify";


function Teachers() {
  const [selectedTeacher, setSelectedTeacher] = useState(null);

 
  const [isOpen, setIsOpen] = useState(false);

  const [teachers, setTeachers] = useState(() => {
    const saved = localStorage.getItem("teachers");
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.length > 0 ? parsed : initialTeachers;
    }
    return initialTeachers;
  });

  const [newTeacher, setNewTeacher] = useState({ name: '', subject: '' });

const [search, setSearch] = useState("")

const filteredTeachers = teachers.filter((teacher)=>
 teacher.name.toLowerCase().includes(search.toLowerCase()));


  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTeacher((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (newTeacher.name && newTeacher.subject) {
      const updated = [
        ...teachers,
        { id: Date.now(), createdAt: new Date().toISOString(), ...newTeacher }
      ];
      setTeachers(updated);
      localStorage.setItem("teachers", JSON.stringify(updated));
      setNewTeacher({ name: '', subject: '' });
      setIsOpen(false);
       // ✅ Show success toast
    toast.success("Teacher added successfully!");
    }
  };

  const handleDelete = (id) => {
    const updated = teachers.filter((teacher) => teacher.id !== id);
    setTeachers(updated);
    localStorage.setItem("teachers", JSON.stringify(updated));
  };

  const handleView = (teacher) => {
    setSelectedTeacher(teacher);
  };
  
  const columns = [
    { key: "name", label: "Name" },
    { key: "subject", label: "Subject" },
  ];
  

  return (
    <div className="flex">
      <div className="flex-1 p-8 bg-white shadow-sm">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Teachers</h1>

          <input type="text"
          value={search}
          placeholder='Search teacher...'
          onChange={(e)=> setSearch(e.target.value)}
          className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          
          <button
            onClick={() => setIsOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            + Add Teacher
          </button>
        </div>

        {/* Table */}
        {search.trim()==="" ? (

          <Table data={teachers} columns={columns} onDelete={handleDelete} onView={handleView}/>
        ) : filteredTeachers.length>0 ? (
          <Table data={filteredTeachers} columns={columns} onDelete={handleDelete} onView={handleView}/>
          ) : (
            <p className='text-center text-gray-500'>No teacher found matching "{search}"</p>
          )

        }

      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Add Teacher</h2>

            <form className="space-y-4" onSubmit={handleAdd}>
              <input
                type="text"
                name="name"
                placeholder="Enter teacher name"
                value={newTeacher.name}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />

              <input
                type="text"
                name="subject"
                placeholder="Enter subject"
                value={newTeacher.subject}
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

{selectedTeacher && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-30 backdrop-blur-md">
    <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl relative border border-blue-200">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Teacher Details</h2>
        <button
          onClick={() => setSelectedTeacher(null)}
          className="px-2 py-1 hover:bg-red-500 hover:text-white transition"
        >
          ✕
        </button>
      </div>

      {/* Body: Grid layout for details */}
      <div className="grid grid-cols-1 gap-4 text-gray-700 max-h-96 overflow-y-auto">
        <div className="flex justify-between bg-gray-50 p-3 rounded-lg shadow-sm">
          <span className="font-medium">Name:</span>
          <span className="text-gray-800">{selectedTeacher.name}</span>
        </div>

        <div className="flex justify-between bg-gray-50 p-3 rounded-lg shadow-sm">
          <span className="font-medium">Subject:</span>
          <span className="text-gray-800">{selectedTeacher.subject}</span>
        </div>

        {selectedTeacher.details && Object.entries(selectedTeacher.details).map(([key, value]) => (
          <div key={key} className="flex justify-between bg-gray-50 p-3 rounded-lg shadow-sm">
            <span className="capitalize font-medium">{key}:</span>
            <span className="text-gray-800">{value}</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      {/* <div className="mt-6 flex justify-end">
        <button
          onClick={() => setSelectedTeacher(null)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Close
        </button>
      </div> */}
    </div>
  </div>
)}


    </div>
  );
}

export default Teachers;

import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [studentInfo, setStudentInfo] = useState(null);

  useEffect(() => {
    fetch('http://backend:8000/api/get_students')
      .then(response => response.json())
      .then(data => setStudents(data));
  }, []);

  const openModal = (id) => {
    fetch(`http://backend:8000/api/get_student/${id}`)
      .then(response => response.json())
      .then(data => {
        setStudentInfo(data);
        setIsOpen(true);
      });
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  return (
    <div>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Gender</th>
          <th>University</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student, index) => (
          <tr key={index} className="centered-row">
            <td>{student[0]}</td>
            <td>{student[1]}</td>
            <td>{student[2]}</td>
            <td>{student[3]}</td>
            <td>
              <button onClick={() => openModal(student[0])}>View Info</button>
              <button>Add</button>
              <button>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    

    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Student Info"
    >
      {studentInfo && (
        <div>
          <h2>{studentInfo[0]}</h2> {/* Name */}
          <p>{studentInfo[1]}</p> {/* Gender */}
          <p>{studentInfo[2]}</p> {/* Mail */}
          <p>{studentInfo[3]}</p> {/* Phone */}
          <p>{studentInfo[4]}</p> {/* University */}
          <button onClick={closeModal}>Close</button>
        </div>
      )}
    </Modal>
    </div>
    

    



  );
}

export default App;
import React, { useState, useEffect } from 'react';
import '../styles/TugasSelesai.css';
import Sidebar from '../components/Sidebar';

const TugasSelesai = () => {
  const [tasks, setTasks] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [newTask, setNewTask] = useState({ name: '', date: '', time: '' });

  const fetchTasks = async () => {
    try {
        const response = await fetch('http://localhost:8083/tasks/selesai', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const tasks = await response.json();
        setTasks(tasks);
        console.log('Tasks:', tasks); // Log data tasks
    } catch (error) {
        console.error('Error saat mengambil tasks:', error);
    }
  };

  const addNewTask = async () => {
    if (newTask.name && newTask.date) {
      try {
        const response = await fetch('http://localhost:8083/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: 1,
                name: newTask.name,
                date: newTask.date,
                status: 1,
            }),
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        closePopup();
        fetchTasks();  // Refresh data setelah tugas baru ditambahkan
        console.log('Tugas berhasil ditambahkan:', data.task);
      } catch (error) {
        console.error('Error saat menambahkan tugas:', error);
      }
    } else {
      alert("Nama dan tanggal tugas harus diisi!");
    }
  };

  const removeTask = async (id) => {
    try {
        const response = await fetch(`http://localhost:8083/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.message);
        setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
        console.error('Error saat menghapus tugas:', error);
    }
  };

  const closePopup = () => setPopupVisible(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="tugasselesai">
      <Sidebar />

      <div className="content">
        <h1>Semua Tugas</h1>
        <div className="task-container">
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <div key={task.id} className="task-item">
                <div className="task-title">
                  <span style={{ marginRight: '1em' }}>{index+1}</span>
                  <span>{task.name}</span>
                </div>
                <div className="task-time">
                  {new Date(task.date).toLocaleString()} 
                  <i className="fas fa-times remove-task" onClick={() => removeTask(task.id)}></i>
                </div>
              </div>
            ))
          ) : (
            <p>Tidak ada tugas yang tersedia</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TugasSelesai;
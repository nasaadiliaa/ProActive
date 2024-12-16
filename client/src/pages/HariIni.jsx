import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import Swal from 'sweetalert2'
import '../styles/HariIni.css';

const HariIni = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [newTask, setNewTask] = useState({ name: "", date: "" });
  const [tasks, setTasks] = useState([]);

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dayName = daysOfWeek[date.getDay()];
    const monthName = months[date.getMonth()];
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    const minutesFormatted = minutes < 10 ? `0${minutes}` : minutes;
    const formattedDate = `${dayName}, ${monthName} ${day}, ${date.getFullYear()} - ${hours12}:${minutesFormatted} ${ampm}`;
    return formattedDate;
  };

  const fetchTasks = async () => {
    try {
        const response = await fetch('http://localhost:8083/tasks/hari-ini', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let tasks = await response.json();

        // Memformat time setiap tugas
        tasks = tasks.map(task => {
            if (task.date) {
                task.date = formatDateTime(task.date);
            }
            return task;
        });

        setTasks(tasks)
        return tasks;
    } catch (error) {
        console.error('Error saat mengambil tasks:', error);
        return [];
    }
  };

  const addNewTask = async () => {
    if (newTask.name && newTask.date) {
      try {
        const response = await fetch(`http://localhost:8083/tasks`, {
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
        fetchTasks();
        Swal.fire({
          title: "Sukses!",
          text: "Penyimpanan dengan nama : " + data.task.name + " berhasil!",
          icon: "success"
        });
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

  const markAsCompleted = async (id) => {
    try {
      const response = await fetch(`http://localhost:8083/tasks/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: 3 }), // Mengirim status 3
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      fetchTasks();
      console.log('Status tugas berhasil diperbarui:', data.task);
    } catch (error) {
        console.error('Error saat memperbarui status tugas:', error);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="hariini">
      <Sidebar />
      <div className="content">
        <h2>Selamat Datang, User</h2>
        <div className="task-list">
          {tasks.map(task => (
            <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <div>
                <input type="checkbox" checked={task.completed} onChange={() => markAsCompleted(task.id)} />
                <label>{task.name}</label>
              </div>
              <div className="task-details">
                <span>{task.date}, {task.time}</span>
                <i className="fas fa-times remove-task" onClick={() => removeTask(task.id)}></i>
              </div>
            </div>
          ))}
        </div>

        <div className="add-task" onClick={() => setShowPopup(true)}>+ Tambah Tugas</div>
      </div>

      {showPopup && (
        <div className="popup-calendar">
          <div className="popup-content">
            <h2>Tambah Tugas</h2>
            <label>Nama Tugas:</label>
            <input type="text" value={newTask.name} onChange={(e) => setNewTask({ ...newTask, name: e.target.value })} />

            <label>Tanggal:</label>
            <input type="datetime-local" value={newTask.date} onChange={(e) => setNewTask({ ...newTask, date: e.target.value })} />

            <div className="buttons">
              <button className="cancel" onClick={closePopup}>Batal</button>
              <button className="ok" onClick={addNewTask}>OK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HariIni;
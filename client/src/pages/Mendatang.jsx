import React, { useState, useEffect } from 'react';
import '../styles/Mendatang.css';
import Sidebar from '../components/Sidebar';
import Swal from 'sweetalert2'


const App = () => {
  const [boards, setBoards] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [newTask, setNewTask] = useState({ name: '', date: '', time: '' });
  const [currentTaskList, setCurrentTaskList] = useState(null);

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
      const response = await fetch('http://localhost:8083/tasks/mendatang');
let fetchedTasks = await response.json();

// Fungsi untuk memformat tanggal
const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' });
};

// Memformat tanggal dan mengelompokkan tugas berdasarkan tanggal
let groupedTasks = Object.keys(fetchedTasks).reduce((acc, date) => {
  // Memformat tanggal untuk setiap tugas
  const tasksWithFormattedDates = fetchedTasks[date].map(fetchedTask => {
    if (fetchedTask.date) {
      fetchedTask.date = formatDateTime(fetchedTask.date);
    }
    return fetchedTask;
  });

  // Mengelompokkan tugas berdasarkan tanggal
  acc[date] = tasksWithFormattedDates;
  return acc;
}, {});

setTasks(groupedTasks); // Menyimpan data yang sudah dikelompokkan dan diformat


      const newBoards = Object.keys(fetchedTasks).map(date => {
        const dayName = new Date(date).toLocaleDateString('id-ID', { weekday: 'long' });
      
        return {
          id: Date.now(),
          day: dayName,
          tasks: fetchedTasks[date]
        };
      });
        
      setBoards(newBoards);

    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatTimeToAMPM = (time) => {
    if (!time) {
      return "Invalid time";
    }
  
    const [hours, minutes] = time.split(':');
    const hoursInt = parseInt(hours, 10);
    const isPM = hoursInt >= 12;
    const hours12 = hoursInt % 12 || 12;
    const ampm = isPM ? 'PM' : 'AM';
    return `${hours12}:${minutes} ${ampm}`;
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

  const openPopup = (board) => {
    setCurrentTaskList(board);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
    setCurrentTaskList(null);
    setNewTask({ name: '', date: '', time: '' });
  };

  return (
    <div className="mendatang">
      <Sidebar />

      <div className="content">
        <div className="heading">7 Hari Mendatang</div>

        <div className="task-board-container">
          {boards.map(board => (
              <div key={board.id} className="board">
                <div className="board-header">{board.day}</div>
                <div className="task-list">
                  {board.tasks.map(task => (
                    <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                      <div>
                        <input type="checkbox" checked={task.completed} onChange={() => markAsCompleted(board.id, task.id)} />
                        <label>{task.name}</label>
                      </div>
                      <div className="task-details">
                        <span>{task.date}, {task.time}</span>
                        <i className="fas fa-times remove-task" onClick={() => removeTask(board.id, task.id)}></i>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="add-task" onClick={() => openPopup(board)}>+ Tambah Tugas</div>
              </div>
          ))}
        </div>

        <div className="add-board" onClick={addNewTask}><i className="fas fa-plus"></i></div>
      </div>

      {popupVisible && (
        <div id="popupCalendar" className="popup-calendar">
          <div className="popup-content">
            <h2>Tambah Tugas</h2>
            <label htmlFor="taskName">Nama Tugas:</label>
            <input type="text" id="taskName" value={newTask.name} onChange={e => setNewTask({ ...newTask, name: e.target.value })} />

            <label htmlFor="taskDate">Tanggal:</label>
            <input type="date" id="taskDate" value={newTask.date} onChange={e => setNewTask({ ...newTask, date: e.target.value })} />

            <label htmlFor="taskTime">Waktu:</label>
            <input type="time" id="taskTime" value={newTask.time} onChange={e => setNewTask({ ...newTask, time: e.target.value })} />

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

export default App;

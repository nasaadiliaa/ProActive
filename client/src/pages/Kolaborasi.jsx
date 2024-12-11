import React, { useState } from "react";
import "../styles/Kolaborasi.css";
import Sidebar from "../components/Sidebar";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isButtonActive, setIsButtonActive] = useState(false);

  // State untuk pop-up menambah tugas
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleModalToggle = () => setIsModalOpen(!isModalOpen);

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsButtonActive(emailPattern.test(emailValue));
  };

  // Fungsi untuk membuka dan menutup modal tambah tugas
  const handleTaskModalToggle = () => setIsTaskModalOpen(!isTaskModalOpen);

  // Fungsi untuk menambahkan tugas baru
  const handleAddTask = () => {
    const newTask = {
      name: taskName,
      date: taskDate,
      time: taskTime,
      id: new Date().getTime(), // ID unik untuk setiap tugas
    };
    setTasks([...tasks, newTask]);
    setTaskName(""); // Reset input
    setTaskDate("");
    setTaskTime("");
    handleTaskModalToggle(); // Tutup modal setelah tugas ditambahkan
  };

  // Fungsi untuk menghapus tugas
  const handleRemoveTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Fungsi untuk menandai tugas sebagai selesai atau tidak
  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="kolaborasi">
      <Sidebar />

      <div className="content">
        <h1 onClick={handleModalToggle} style={{ cursor: "pointer" }}>
          Kolaborasi |{" "}
          <i
            className="fas fa-share-alt"
            style={{ marginRight: "10px", marginLeft: "10px" }}
          ></i>{" "}
          Bagikan
        </h1>
        <div className="task-container">
          <div className="task-list">
            {tasks.map((task) => (
              <div key={task.id} className={`task-item ${task.isCompleted ? "completed" : ""}`}>
                <div>
                  <input type="checkbox" id={`task-${task.id}`} checked={task.isCompleted}
                    onChange={() => toggleTaskCompletion(task.id)}/>
                  <label htmlFor={`task-${task.id}`}>{task.name}</label>
                </div>
                <div className="task-details">
                  <span>
                    {task.date}, {task.time}
                  </span>
                  <i
                    className="fas fa-times remove-task"
                    onClick={() => handleRemoveTask(task.id)}
                  ></i>
                </div>
              </div>
            ))}
          </div>
          <div className="add-task" onClick={handleTaskModalToggle}>
            + Tambah tugas
          </div>
        </div>
      </div>

      {/* Modal untuk Bagikan */}
      {isModalOpen && (
        <div
          className="modal"
          onClick={(e) => e.target.className === "modal" && handleModalToggle()}
        >
          <div className="modal-content">
            <h2>Bagikan Tugas</h2>
            <div className="form-group">
              <input
                type="email"
                value={email}
                id="emailInput"
                onChange={handleEmailChange}
                placeholder="Tambahkan dengan email"
              />
              <button
                id="addButton"
                className={isButtonActive ? "active" : ""}
                disabled={!isButtonActive}
              >
                Tambahkan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal untuk Tambah Tugas */}
      {isTaskModalOpen && (
        <div className="popup-calendar">
          <div className="popup-content">
            <h2>Tambah Tugas</h2>
            <label htmlFor="taskName">Nama Tugas:</label>
            <input
              type="text"
              id="taskName"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />

            <label htmlFor="taskDate">Tanggal:</label>
            <input
              type="date"
              id="taskDate"
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
            />

            <label htmlFor="taskTime">Waktu:</label>
            <input
              type="time"
              id="taskTime"
              value={taskTime}
              onChange={(e) => setTaskTime(e.target.value)}
            />

            <div className="buttons">
              <button className="cancel" onClick={handleTaskModalToggle}>
                Batal
              </button>
              <button className="ok" onClick={handleAddTask}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
import "../styles/Sidebar.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import Pomodoro from "./Pomodoro"

const Sidebar = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  return (
    <div className="sidebar">
      <NavLink to="/profile">
        <img
          alt="User Profile Picture"
          height="80"
          src="https://i.pinimg.com/564x/d7/d0/13/d7d013aa4c1ee9bc96fc8ee329467d34.jpg"
          width="80"
        />
        <h2 style={{ marginLeft: "10px" }}>Profil Saya</h2>
      </NavLink>
      <NavLink to="/HariIni">
        <i className="fas fa-calendar-day"></i> Hari Ini
      </NavLink>
      <NavLink to="/Mendatang">
        <i className="fas fa-calendar-alt"></i> Mendatang
      </NavLink>
      <NavLink to="/TugasSelesai">
        <i className="fas fa-check"></i> Tugas Selesai
      </NavLink>
      <NavLink to="/Kalender">
        <i className="fas fa-calendar"></i> Kalender
      </NavLink>
      <NavLink onClick={togglePopup}>
        <i className="fas fa-clock"></i> Waktu
      </NavLink>
      <NavLink to="/Kolaborasi">
        <i className="fas fa-users"></i> Kolaborasi
      </NavLink>

      {/* Popup Section */}
      {isPopupVisible && (
        <div className="popup">
          <div className="popup-pomodoro">
            <button className="close-button" onClick={closePopup}>
              &times;
            </button>
            <Pomodoro />
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;

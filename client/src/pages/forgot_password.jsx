import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/daftar.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState(""); // State untuk menyimpan input email
  const navigate = useNavigate(); // Untuk navigasi ke halaman lain

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      alert("Email telah dikirim!");
      navigate("/Verifikasi"); // Arahkan ke halaman Verifikasi
    } else {
      alert("Silakan masukkan email.");
    }
  };

  return (
    <div className="pagedaftar">
      <div className="left-section">
        <div className="carousel">
          <button className="arrow left-arrow">&#10094;</button>
          <img src="/img/illustration1.png" alt="Illustration 1" className="illustration" />
          <img src="/img/illustration2.png" alt="Illustration 2" className="illustration" style={{ display: "none" }} />
          <img src="/img/illustration3.png" alt="Illustration 3" className="illustration" style={{ display: "none" }} />
          <button className="arrow right-arrow">&#10095;</button>
        </div>
        <p className="description">
          Fitur to-do list yang sederhana namun kuat, ProActive mempermudah perencanaan harian hingga pengelolaan proyek besar.
        </p>
      </div>

      <div className="right-section">
        <div className="content">
          <div className="logo">
            <img src="/img/logo.png" alt="ProActive Logo" />
          </div>
          <h1>Lupa Password</h1>
          <p>Masukkan email akun Anda</p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update state saat input berubah
              placeholder="E-mail"
              required
            />
            <button type="submit" className="login-button">Kirim</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

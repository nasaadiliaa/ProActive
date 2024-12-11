import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/daftar.css';

const Verifikasi = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/Login");
  };

  return (
    <div className="pagedaftar">
      <div className="left-section">
        <div className="carousel">
          <button className="arrow left-arrow">&#10094;</button>
          <img src="/img/illustration1.png" alt="Illustration 1" />
        </div>
        <p className="description">
          fitur to-do list yang sederhana namun kuat, ProActive mempermudah perencanaan harian hingga pengelolaan proyek besar.
        </p>
      </div>

      <div className="right-section">
        <div className="content">
          <div className="logo">
            <img src="/img/logo.png" alt="ProActive Logo" />
          </div>
          <h1>Kode Verifikasi</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="kode">Kode Verifikasi</label>
            <input type="text" id="kode" name="kode" placeholder="FXXXXP" required />
            <button type="submit" className="login-button">
              Kirim
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Verifikasi;

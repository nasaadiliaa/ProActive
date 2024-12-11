import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/daftar.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email && password) {
      navigate("/HariIni");
    } else {
      alert("Silakan isi email dan password.");
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
          fitur to-do list yang sederhana namun kuat, ProActive mempermudah perencanaan harian hingga pengelolaan proyek besar.
        </p>
      </div>

      <div className="right-section">
        <div className="content">
            <div className="logo">
              <img src="/img/logo.png" alt="ProActive Logo" />
            </div>
          <h1>Selamat datang</h1>
          <p>Silahkan login terlebih dahulu untuk memulai</p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <label htmlFor="login-email">E-mail</label>
            <input
              type="email"
              id="login-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
              required
            />

            <label htmlFor="login-password">Password</label>
            <input
              type="password"
              id="login-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />

            <Link to="/ForgotPassword" className="forgot-password">
              Lupa Password?
            </Link>

            <button type="submit" className="login-button">
              Login
            </button>
          </form>

          <p className="register-link">
            Belum punya akun? <Link to="/Daftar">Daftar disini</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

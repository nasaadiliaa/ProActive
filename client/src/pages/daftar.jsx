import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "../styles/daftar.css";

const Daftar = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    noHandphone: "",
    password: "",
    konfirmasiPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const descriptions = [
    "Fitur to-do list yang sederhana namun kuat, ProActive mempermudah perencanaan harian hingga pengelolaan proyek besar.",
    "To-do list yang praktis namun bertenaga, ProActive memudahkan pengelolaan dari tugas harian hingga manajemen proyek kompleks.",
    "Dengan fitur to-do list yang intuitif namun andal, ProActive memfasilitasi perencanaan dari aktivitas sehari-hari hingga pengelolaan proyek besar.",
  ];

  const changeSlide = (direction) => {
    setCurrentSlide((prev) => (prev + direction + descriptions.length) % descriptions.length);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    return usernameRegex.test(username);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullname, username, email, noHandphone, password, konfirmasiPassword } = formData;

    console.log("formdata:", formData);

    if (!fullname || !username || !email || !noHandphone || !password || !konfirmasiPassword) {
      setErrorMessage("Harap isi semua kolom.");
      return;
    }

    if (!validateUsername(username)) {
      setErrorMessage("Nama pengguna hanya boleh mengandung huruf dan angka.");
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage("Format email tidak valid.");
      return;
    }

    if (password !== konfirmasiPassword) {
      setErrorMessage("Password dan konfirmasi password tidak cocok.");
      return;
    }

    try {
      // Kirim data ke backend menggunakan Axios
      const response = await axios.post("http://localhost:8083/users", {
        full_name: fullname,
        username: username,
        email: email,
        phone_number: noHandphone,
        password_hash: password,
      });

      // Jika berhasil, reset error dan navigasi ke halaman login
      setErrorMessage(""); 
      localStorage.setItem("profileData", JSON.stringify(response));
      alert("Pendaftaran berhasil!");
      navigate("/Login");

    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.error || "Terjadi kesalahan saat mendaftar.");
      } else {
        // Tangani error jika response atau data tidak ada
        setErrorMessage("Terjadi kesalahan yang tidak terduga.");
      }
    }
  };

  return (
    <div className="pagedaftar">
      <div className="left-section">
        <div className="carousel">
          <button className="arrow left-arrow" onClick={() => changeSlide(-1)}>
            &#10094;
          </button>
          {descriptions.map((desc, index) => (
            <img
              key={index}
              src={`/img/illustration${index + 1}.png`}
              alt={`Illustration ${index + 1}`}
              style={{
                display: currentSlide === index ? "block" : "none",
                width: "70%",
              }}
            />
          ))}
          <button className="arrow right-arrow" onClick={() => changeSlide(1)}>
            &#10095;
          </button>
        </div>
        <p className="description">{descriptions[currentSlide]}</p>
      </div>

      <div className="right-section">
        <div className="content">
          <h1 style={{ marginTop: "-30px" }}>Buat Akun</h1>
          <p>Silahkan lengkapi data di bawah ini untuk membuat akun</p>

          <form onSubmit={handleSubmit}>
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <label htmlFor="fullname">Nama</label>
            <input
              type="text"
              id="nama"
              name="fullname"
              placeholder="Fullname"
              value={formData.fullname}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="username">Nama Pengguna</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Nama Pengguna"
              value={formData.username}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="no-handphone">No. Handphone</label>
            <input
              type="tel"
              id="no-handphone"
              name="noHandphone"
              placeholder="No. Handphone"
              value={formData.noHandphone}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="konfirmasi-password">Konfirmasi Password</label>
            <input
              type="password"
              id="konfirmasi-password"
              name="konfirmasiPassword"
              placeholder="Konfirmasi Password"
              value={formData.konfirmasiPassword}
              onChange={handleInputChange}
              required
            />

            <button type="submit" className="daftar-button">
              Daftar
            </button>
          </form>

          <p className="login-link">
            Sudah punya akun?{" "}
            <span onClick={() => navigate("/Login")} style={{ color: "blue", cursor: "pointer" }}>
              Login disini
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Daftar;
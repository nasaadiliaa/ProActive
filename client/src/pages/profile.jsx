import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import "../styles/profil.css";
import Sidebar from "../components/Sidebar";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate(); 
  const [isEditable, setIsEditable] = useState(false);
  const [formData, setFormData] = useState({});
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false); 

  const [passwordInput, setPasswordInput] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const fetchUser = async () => {
    try {
      const response = await axios.get('http://localhost:8083/current-user', {
        withCredentials: true, // Pastikan cookie dikirim bersama permintaan
      });
  
      if (response.status === 200) {
        console.log('User:', response.data);
        setFormData(response.data)
        return response.data; // Kembalikan data user
      }
    } catch (err) {
      console.error('Error saat fetch user:', err);
      if (err.response && err.response.status === 401) {
        alert('Silakan login kembali.');
      }
    }
  };

  // Load data dari localStorage saat komponen dimuat
  useEffect(() => {
    fetchUser()
    console.log(formData)
  }, []);

  const handleEditToggle = () => {
    if (isEditable) {
      // Simpan data ke localStorage
      localStorage.setItem("profileData", JSON.stringify(formData));
      alert("Perubahan telah disimpan.");
    }
    setIsEditable(!isEditable);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handlePasswordChange = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("Harap isi semua kolom password.");
      return;
    }
    if (oldPassword !== formData.password) {
      setError("Password lama tidak sesuai.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Password baru dan konfirmasi tidak cocok.");
      return;
    }

    alert("Kata sandi Anda telah diperbarui.");
    setFormData((prevData) => ({ ...prevData, password: newPassword }));
    localStorage.setItem(
      "profileData",
      JSON.stringify({ ...formData, password: newPassword })
    );
    setShowPasswordModal(false);
    setError(""); 
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    navigate("/Login"); 
  };

  const handleDeleteAccount = () => {
    if (!passwordInput) {
      setError("Harap masukkan password Anda untuk menghapus akun.");
      return;
    }
    if (passwordInput !== formData.password) {
      setError("Password tidak sesuai.");
      return;
    }

    alert("Akun Anda telah dihapus.");
    localStorage.removeItem("profileData"); 
    setShowDeleteModal(false);
    setError(""); 
    setPasswordInput("");
    navigate("/daftar"); 
  };

  const handleLogout = async () => {
    try {
      // Kirim permintaan ke server untuk logout
      const response = await fetch('http://localhost:8083/logout', {
        method: 'DELETE',
        credentials: 'include', // Pastikan cookie ikut serta dalam permintaan
      });
  
      if (!response.ok) {
        throw new Error('Logout gagal');
      }
  
      // Setelah logout berhasil, sembunyikan modal dan arahkan ke halaman login
      setShowLogoutModal(false);
      navigate("/Login");
    } catch (error) {
      console.error('Error saat logout:', error);
      alert('Terjadi kesalahan saat logout');
    }
  };

  return (
    <div className="profile">
      <Sidebar />

      {/* Profile Section */}
      <div className="profile-section">
        <div className="profile-card">
          <img
            src="https://i.pinimg.com/564x/d7/d0/13/d7d013aa4c1ee9bc96fc8ee329467d34.jpg"
            alt="Profile Picture"
          />
          <h2>{formData.full_name}</h2>
          <p>{formData.email}</p>
          <form>
            <div style={{ display: "flex", gap: "10px" }}>
              <div style={{ width: "100%" }}>
                <label>Nama Lengkap</label>
                <input
                  type="text"
                  id="fullname"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  readOnly={!isEditable}
                />
              </div>
              <div style={{ width: "100%" }}>
                <label>Nama Pengguna</label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  readOnly={!isEditable}
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <div style={{ width: "100%" }}>
                <label>E-mail</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  readOnly={!isEditable}
                />
              </div>
              <div style={{ width: "100%" }}>
                <label>No. Telepon</label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  readOnly={!isEditable}
                />
              </div>
            </div>

            <div className="button-container">
              <button
                type="button"
                className="edit-button"
                onClick={handleEditToggle}
              >
                {isEditable ? "Simpan" : "Edit"}
              </button>
              <button
                type="button"
                className="delete-button"
                onClick={() => setShowDeleteModal(true)}
              >
                Hapus Akun
              </button>
            </div>
            <button
              type="button"
              className="edit-button"
              style={{ width: "100%", marginTop: "10px" }}
              onClick={() => setShowPasswordModal(true)}
            >
              Ganti Kata Sandi
            </button>
            <button
              type="button"
              className="logout-button"
              style={{
                width: "100%",
                marginTop: "10px",
                backgroundColor: "red",
                color: "white",
              }}
              onClick={() => setShowLogoutModal(true)} 
            >
              Logout
            </button>
          </form>
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="modal" onClick={() => setShowPasswordModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={() => setShowPasswordModal(false)}>
              &times;
            </span>
            <h2>Ganti Kata Sandi</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <input
              type="password"
              placeholder="Kata Sandi Lama"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Kata Sandi Baru"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Konfirmasi Kata Sandi Baru"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={handlePasswordChange}>Ganti Kata Sandi</button>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="modal" onClick={() => setShowDeleteModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={() => setShowDeleteModal(false)}>
              &times;
            </span>
            <h2>Hapus Akun</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <p>
              Tindakan ini dapat mengakibatkan riwayat tugasmu terhapus
              permanen. Apakah Anda yakin?
            </p>
            <input
              type="password"
              placeholder="Masukkan Password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
            <button onClick={handleDeleteAccount}>Hapus Akun</button>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="modal" onClick={() => setShowLogoutModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={() => setShowLogoutModal(false)}>
              &times;
            </span>
            <h2>Logout</h2>
            <p>Anda yakin untuk keluar dari akun?</p>
            <button onClick={handleLogout}>Ya</button>
            <button onClick={() => setShowLogoutModal(false)}>Tidak</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
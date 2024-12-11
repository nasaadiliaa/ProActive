import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HariIni from './pages/HariIni';
import TugasSelesai from './pages/TugasSelesai';
import Login from './pages/masuk';
import Daftar from './pages/daftar';
import ForgotPassword from './pages/forgot_password';
import Verifikasi from './pages/verifikasi';
import Kalender from './pages/Kalender';
import Kolaborasi from './pages/Kolaborasi';
import Mendatang from './pages/Mendatang';
import Profile from './pages/profile';
import LandingPage from './landingpagemain';

function App() {
  return (
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/HariIni" element={<HariIni />} />
        <Route path="/TugasSelesai" element={<TugasSelesai />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Daftar" element={<Daftar />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/Verifikasi" element={<Verifikasi />} />
        <Route path="/Kalender" element={<Kalender />} />
        <Route path="/Kolaborasi" element={<Kolaborasi />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Mendatang" element={<Mendatang/>} />
      </Routes>
  );
}

export default App;

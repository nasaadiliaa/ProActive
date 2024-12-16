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
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Daftar" element={<Daftar />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/Verifikasi" element={<Verifikasi />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/HariIni" element={<HariIni />} />
          <Route path="/TugasSelesai" element={<TugasSelesai />} />
          <Route path="/Kalender" element={<Kalender />} />
          <Route path="/Kolaborasi" element={<Kolaborasi />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Mendatang" element={<Mendatang />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
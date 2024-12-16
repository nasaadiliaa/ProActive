import express from 'express';  
import db from './db.js';  
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Task from './models/Task.js';
import User from './models/User.js';
import Cookies from 'js-cookie';

const router = express.Router();

// Endpoint untuk mendapatkan semua pengguna (GET /users)
router.get('/users', async (req, res) => {
  try {
      const users = await User.findAll();
      res.status(200).json(users);
  } catch (err) {
      console.error('Error saat mengambil pengguna:', err);
      res.status(500).json({ error: "Gagal mengambil data pengguna" });
  }
});

// Endpoint untuk menambahkan pengguna baru (POST /users)
router.post('/users', async (req, res) => {
  const { full_name, username, email, phone_number, password_hash } = req.body;
  if (!full_name || !username || !email || !phone_number || !password_hash) {
      return res.status(400).json({ error: "Semua kolom harus diisi" });
  }
  try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password_hash, saltRounds);
      const newUser = await User.create({
          full_name,
          username,
          email,
          phone_number: phone_number || null,
          password_hash: hashedPassword,
      });

      res.status(201).json({
          message: "Pengguna berhasil ditambahkan",
          userId: newUser.id,
      });
  } catch (err) {
      console.error('Error saat menambahkan pengguna:', err);
      if (err.name === 'SequelizeUniqueConstraintError') {
          return res.status(400).json({ error: "Username atau email sudah digunakan" });
      }
      res.status(500).json({ error: "Gagal menambahkan pengguna" });
  }
});

router.get('/current-user', async (req, res) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res.status(401).json({ error: 'Token tidak ditemukan' });
    }
    const user = await User.findOne({ where: { refresh_token: accessToken } });

    if (!user) {
      return res.status(404).json({ error: 'Pengguna tidak ditemukan' });
    }
    res.status(200).json({
      id: user.id,
      full_name: user.full_name,
      username: user.username,
      email: user.email,
      phone_number: user.phone_number,
    });
  } catch (err) {
    console.error('Error saat mengambil user:', err);
    res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data pengguna' });
  }
});

// Endpoint untuk menambahkan pengguna baru (POST /tasks)
router.get('/tasks', async (req, res) => {
  try {
      const tasks = await Task.findAll();
      res.status(200).json(tasks);
  } catch (err) {
      console.error('Error saat mengambil pengguna:', err);
      res.status(500).json({ error: "Gagal mengambil data pengguna" });
  }
});

router.get('/tasks/hari-ini', async (req, res) => {
  try {
      const tasks = await Task.findAll({
          where: {
              status: 1
          }
      });
      res.status(200).json(tasks);
  } catch (err) {
      console.error('Error saat mengambil pengguna:', err);
      res.status(500).json({ error: "Gagal mengambil data pengguna" });
  }
});

router.get('/tasks/mendatang', async (req, res) => {
  try {
      const tasks = await Task.findAll({
          where: {
              status: 2
          }
      });

      // Mengelompokkan berdasarkan tanggal
      const groupedTasks = tasks.reduce((acc, task) => {
          const taskDate = new Date(task.date).toISOString().split('T')[0];
          if (!acc[taskDate]) {
              acc[taskDate] = [];
          }
          acc[taskDate].push(task);
          return acc;
      }, {});

      res.status(200).json(groupedTasks);
  } catch (err) {
      console.error('Error saat mengambil pengguna:', err);
      res.status(500).json({ error: "Gagal mengambil data pengguna" });
  }
});

router.get('/tasks/selesai', async (req, res) => {
  try {
      const tasks = await Task.findAll({
          where: {
              status: 3
          }
      });
      res.status(200).json(tasks);
  } catch (err) {
      console.error('Error saat mengambil pengguna:', err);
      res.status(500).json({ error: "Gagal mengambil data pengguna" });
  }
});

router.post('/tasks', async (req, res) => {
  const { user_id, name, date, status } = req.body;

  if (!user_id || !name || !date || !status) {
      return res.status(400).json({ error: "Semua kolom harus diisi" });
  }

  try {
      const taskDate = new Date(date);
      const today = new Date();

      const taskStatus = taskDate > today ? 2 : 1;
      const newTask = await Task.create({ user_id, name, date, status: taskStatus });
      
      res.status(201).json({
          message: "Tugas berhasil ditambahkan",
          task: newTask,
      });
  } catch (err) {
      console.error('Error saat menambahkan tugas:', err);
      res.status(500).json({ error: "Gagal menambahkan tugas" });
  }
});

router.put('/tasks/:id', async (req, res) => {
  const taskId = req.params.id;
  try {
      const task = await Task.findByPk(taskId);
      if (!task) {
          return res.status(404).json({ error: "Tugas tidak ditemukan" });
      }

      task.status = 3;
      await task.save();

      res.status(200).json({
          message: "Status tugas berhasil diperbarui",
          task: task,
      });
  } catch (err) {
      console.error('Error saat memperbarui tugas:', err);
      res.status(500).json({ error: "Gagal memperbarui tugas" });
  }
});

router.delete('/tasks/:id', async (req, res) => {
  const taskId = req.params.id;
  try {
      const task = await Task.findByPk(taskId);
      if (!task) {
          return res.status(404).json({ error: "Tugas tidak ditemukan" });
      }

      await task.destroy();
      res.status(200).json({ message: "Tugas berhasil dihapus" });

  } catch (err) {
      console.error('Error saat menghapus tugas:', err);
      res.status(500).json({ error: "Gagal menghapus tugas" });
  }
});

// Endpoint login (POST /login)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email dan password harus diisi' });
  }

  try {
    // Cari user berdasarkan email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Email salah' });
    }

    // Validasi password
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ error: 'Password salah' });
    }

    // Buat token akses
    const token = jwt.sign(
      { email: user.email }, // Payload
      process.env.ACCESS_TOKEN_SECRET, // Secret key
      { expiresIn: '1h' } // Token berlaku selama 1 jam
    );

    // Buat token refresh
    // const refreshToken = jwt.sign(
    //   { userId: user.id, email: user.email },
    //   process.env.REFRESH_TOKEN_SECRET,
    //   { expiresIn: '7d' } 
    // );

    user.update(
      { refresh_token: token }, // Data yang akan diupdate
      { where: { id: user.id } } // Kondisi berdasarkan id user
    );

    // Simpan accessToken dan refreshToken di cookies
    res.cookie('accessToken', token, {
      httpOnly: false,
      secure: false,
      path: '/',
      maxAge: 60 * 60 * 1000, // 1 jam
    });

    Cookies.set('accessTokenCookies', token, { 
      expires: 1 
    });

    // res.cookie('refreshToken', refreshToken, {
    //   httpOnly: true,
    //   secure: false,
    //   path: '/',
    //   maxAge: 7 * 24 * 60 * 60 * 1000,
    // });

    // Kirim respons sukses
    res.status(200).json({
      message: 'Login berhasil',
      token: token,
      user: {
        id: user.id,
        full_name: user.full_name,
        username: user.username,
        email: user.email,
        phone_number: user.phone_number,
        refresh_token: user.refresh_token,
      },
    });
  } catch (err) {
    console.error('Error saat login:', err);
    res.status(500).json({ error: 'Gagal memproses login' });
  }
});

//   refresh token
  router.get('/api/refresh-token', (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ error: 'Refresh token tidak ditemukan' });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Refresh token tidak valid' });
        }

        const { id, email } = decoded;
        const newAccessToken = jwt.sign(
            { id, email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            accessToken: newAccessToken,
        });
    });
});

// logout
router.delete('/logout', async (req, res) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res.status(401).json({ error: 'Token tidak ditemukan' });
    }

    const user = await User.findOne({
      where: { refresh_token: accessToken },
    });

    if (!user) {
      return res.status(204).json({ message: 'User tidak ditemukan atau sudah logout' });
    }

    // Hapus refresh token
    await User.update({ refresh_token: null }, { where: { id: user.id } });

    // Hapus cookie accessToken
    res.clearCookie('accessToken', {
      httpOnly: true,
      // secure: true, // Aktifkan jika menggunakan HTTPS
      path: '/',
    });

    return res.status(200).json({ message: 'Logout berhasil' });
  } catch (err) {
    console.error('Error saat logout:', err);
    return res.status(500).json({ error: 'Gagal memproses logout' });
  }
});
  
export default router;

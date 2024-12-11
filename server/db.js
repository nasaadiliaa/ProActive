import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('time_management_platform', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, 
});

try {
    await sequelize.authenticate();
    console.log('Koneksi ke database berhasil!');
} catch (error) {
    console.error('Tidak bisa terhubung ke database:', error);
}

export default sequelize;
                                                                         
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('time_management_platform', 'root', '', {
    host: 'localhost',
    dialect: 'mysql', 
});

// Tes koneksi
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

export default sequelize;
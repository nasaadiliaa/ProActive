import { DataTypes } from 'sequelize';
import db from '../db.js';

const Task = db.define('Task', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    date: {
        type: DataTypes.DATE, 
        allowNull: false, 
    },
    status: DataTypes.INTEGER,
}, {
    tableName: 'tasks',
    timestamps: false,
});

export default Task;

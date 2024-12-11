const statusMap = {
    '1': 'Expired',
    '2': 'Active',
    '3': 'Selesai'
};

const getTasks = async (req, res) => {
    const tasks = await TaskModel.find(); // Mengambil data dari database
    const mappedTasks = tasks.map(task => ({
        ...task._doc,
        statusDescription: statusMap[task.status]
    }));

    res.json(mappedTasks);
};

module.exports = { getTasks };
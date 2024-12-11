var MyClass = React.createClass({
    render: function() {
      return (
        <div>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Kolaborasi</title>
          <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
          <style dangerouslySetInnerHTML={{__html: "\n        body {\n            margin: 0;\n            font-family: 'Poppins', sans-serif;\n            background: url('image.png') no-repeat center center fixed;\n            background-size: cover;\n            display: flex;\n        }\n\n        .sidebar {\n            width: 250px;\n            height: 100vh;\n            background-color: rgba(9, 31, 91, 0.5);\n            color: white;\n            position: fixed;\n            display: flex;\n            flex-direction: column;\n            align-items: center;\n            padding-top: 20px;\n        }\n\n        .sidebar img {\n            width: 80px;\n            height: 80px;\n            border-radius: 50%;\n            margin-bottom: 10px;\n        }\n\n        .sidebar h2 {\n            font-size: 18px;\n            margin-bottom: 30px;\n        }\n\n        .sidebar a {\n            text-decoration: none;\n            color: white;\n            font-size: 16px;\n            display: flex;\n            align-items: center;\n            width: 100%;\n            padding: 15px 20px;\n            box-sizing: border-box;\n            transition: background-color 0.3s ease;\n        }\n\n        .sidebar a:hover {\n            background-color: rgba(9, 31, 91, 0.7);\n            border-radius: 5px;\n        }\n\n        .sidebar a i {\n            margin-right: 10px;\n        }\n\n        .content {\n          margin-left: 300px;\n          padding: 20px;\n          width: calc(100% - 250px);\n        }\n\n        .content h1 {\n          font-size: 16px;\n            color: rgb(0, 0, 0);\n            display: flex;\n            align-items: center;\n            background-color: #D0E4FF;\n            padding: 5px 20px;\n            margin-right: 20px;\n            border-radius: 20px;\n            width: fit-content;\n        }\n\n        .task-container {\n            width: 90%;\n            height: 78vh;\n            background-color: #D0E4FF;\n            border-radius: 10px;\n            padding: 20px;\n        }\n\n        .add-task {\n            background-color: #FFF9EF;\n            border-radius: 10px;\n            padding: 10px;\n            text-align: center;\n            color: black;\n            font-size: 16px;\n            cursor: pointer;\n            transition: background-color 0.3s ease;\n            position: fixed;\n            bottom: 65px;\n            right: 100px;\n            width: 65%;\n            box-sizing: border-box;\n        }\n\n        .add-task:hover {\n            background-color: #A0C4FF;\n        }\n        \n    " }} />
          <div className="sidebar">
            <img alt="User Profile Picture" height={80} src="https://i.pinimg.com/564x/d7/d0/13/d7d013aa4c1ee9bc96fc8ee329467d34.jpg" width={80} />
            <h2>Profil Saya</h2>
            <a href="hari ini.html"><i className="fas fa-calendar-day" /> Hari Ini</a>
            <a href="mendatang.html"><i className="fas fa-calendar-alt" /> Mendatang</a>
            <a href="tugas selesai.html"><i className="fas fa-check" /> Tugas Selesai</a>
            <a href="#"><i className="fas fa-calendar" /> Kalender</a>
            <a href="pomodoro.html"><i className="fas fa-clock" /> Waktu</a>
            <a href="kolaborasi.html"><i className="fas fa-users" /> Kolaborasi</a>
          </div>
          <div className="content">
            <h1>Kolaborasi | &nbsp;<i className="fas fa-share-alt" /> Bagikan</h1>
            <div className="task-container">
              {/* Add Task */}
              <div className="add-task">
                + Tambah tugas
              </div>
            </div>
          </div>
        </div>
      );
    }
  });
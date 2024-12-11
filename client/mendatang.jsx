var MyClass = React.createClass({
    render: function() {
      return (
        <div>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Mendatang</title>
          <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
          <style dangerouslySetInnerHTML={{__html: "\n\n        body {\n            margin: 0;\n            font-family: 'Poppins', sans-serif;\n            background: url('image.png') no-repeat center center fixed;\n            background-size: cover;\n            display: flex;\n        }\n\n        .sidebar {\n            width: 250px;\n            height: 100vh;\n            background-color: rgba(9, 31, 91, 0.5);\n            color: white;\n            position: fixed;\n            display: flex;\n            flex-direction: column;\n            align-items: center;\n            padding-top: 20px;\n        }\n\n        .sidebar img {\n            width: 80px;\n            height: 80px;\n            border-radius: 50%;\n            margin-bottom: 10px;\n        }\n\n        .sidebar h2 {\n            font-size: 18px;\n            margin-bottom: 30px;\n        }\n\n        .sidebar a {\n            text-decoration: none;\n            color: white;\n            font-size: 16px;\n            display: flex;\n            align-items: center;\n            width: 100%;\n            padding: 15px 20px;\n            box-sizing: border-box;\n            transition: background-color 0.3s ease;\n        }\n\n        .sidebar a:hover {\n            background-color: rgba(9, 31, 91, 0.7);\n            border-radius: 5px;\n        }\n\n        .sidebar a i {\n            margin-right: 10px;\n        }\n\n        .content {\n            margin-left: 250px;\n            width: calc(100% - 250px);\n            padding: 50px;\n        }\n\n        .heading {\n            font-size: 24px;\n            font-weight: 600;\n            color: white;\n            margin-bottom: 60px;\n        }\n\n        .task-board-container {\n            display: flex;\n            gap: 20px;\n            overflow-x: auto;\n            margin-top: 50px;\n        }\n\n        .board {\n            background-color: #BAD6EB;\n            color: black;\n            width: 350px;\n            padding: 20px;\n            border-radius: 10px;\n            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);\n            flex-shrink: 0;\n        }\n\n        .board-header {\n            font-size: 20px;\n            margin-bottom: 15px;\n            text-align: center;\n        }\n\n        .task-list {\n            margin-top: 10px;\n        }\n\n        .task-item {\n    background-color: #FFF9EF;\n    border-radius: 10px;\n    padding: 10px;\n    margin-bottom: 16px;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    transition: background-color 0.3s ease;\n    \n}\n\n        .task-item div {\n            display: flex;\n            align-items: center;\n        }\n\n        .task-item input[type=\"checkbox\"] {\n            appearance: none;\n            width: 20px;\n            height: 20px;\n            border: 2px solid #B0BEC5;\n            border-radius: 50%;\n            outline: none;\n            cursor: pointer;\n            position: relative;\n            margin-right: 10px;\n        }\n\n        .task-item input[type=\"checkbox\"]:checked {\n            background-color: #3498DB;\n        }\n\n        .task-item input[type=\"checkbox\"]:checked::before {\n            content: \"\\f00c\";\n            font-family: \"Font Awesome 5 Free\";\n            font-weight: 900;\n            color: rgb(14, 13, 13);\n            font-size: 12px;\n        }\n\n        .task-item input[type=\"checkbox\"]:checked + label {\n            text-decoration: line-through;\n            color: #B0BEC5;\n        }\n\n.task-item label {\n    font-size: 13px;\n}\n\n.task-item .task-details span {\n    font-size: 12px; \n    color: #344EAD;\n}\n\n        .add-task {\n    background-color: #FFF9EF;\n    border-radius: 10px;\n    padding: 10px;\n    text-align: center;\n    color: black;\n    font-size: 16px;\n    cursor: pointer;\n    transition: background-color 0.3s ease;\n    width: calc(100% - 20px);\n    margin: 0 auto;\n    margin-top: 15px;\n}\n\n        .add-task:hover {\n            background-color: #A0C4FF;\n        }\n\n        .add-board {\n            font-size: 30px;\n            cursor: pointer;\n            color: #0a0a0a;\n            position: absolute;\n            bottom: 10px;\n            right: 10px;\n        }\n\n        .add-board:hover {\n            color: #4d4c4a;\n        }\n        \n        .board .add-board {\n        display: none;\n        }\n\n         .popup-calendar {\n            display: none;\n         }\n\n         .popup-calendar {\n            display: none;\n            position: fixed;\n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 100%;\n            background: rgba(0, 0, 0, 0.5);\n            display: flex;\n            justify-content: center;\n            align-items: center;\n            z-index: 1000;\n        }\n\n        .popup-content {\n            background-color: #b3d1ff;\n            padding: 20px;\n            border-radius: 10px;\n            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n            width: 500px;\n            position: relative;\n        }\n\n        .popup-content h2 {\n            font-size: 20px;\n            margin-bottom: 20px;\n            text-align: center;\n        }\n\n        .popup-content label {\n            display: block;\n            margin: 10px 0 5px;\n        }\n\n        .popup-content input, .popup-content textarea {\n            width: 100%;\n            padding: 10px;\n            border-radius: 5px;\n            border: 1px solid #ddd;\n            margin-bottom: 10px;\n        }\n\n        .buttons {\n            display: flex;\n            justify-content: space-between;\n            margin-top: 20px;\n        }\n\n        .buttons button {\n            padding: 10px 20px;\n            border: none;\n            border-radius: 5px;\n            cursor: pointer;\n        }\n\n        .buttons .cancel {\n            background-color: #00aaff;\n            color: #fff;\n        }\n\n        .buttons .ok {\n            background-color: #007bff;\n            color: #fff;\n        }\n\n        .popup-calendar .popup-content {\n    z-index: 2000;\n}\n        \n        .task-details {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n}\n\n.task-details i.remove-task {\n    margin-left: 10px;\n}\n\n.task-item.completed label,\n.task-item.completed .task-details span {\n    text-decoration: line-through;\n    color: #B0BEC5;\n}\n\n.taks-item {\nmargin-bottom: 16px;\n}\n\n.board {\n    width: 300px;\n}\n\n.board-header {\n    font-size: 18px;\n}\n\n.task-item {\n    padding: 10px;\n}\n\n.task-item label {\n    font-size: 14px\n}\n\n.add-task {\n    font-size: 14px;\n}\n\n.task-item input[type=\"checkbox\"] {\n                    appearance: none;\n                    width: 15px;\n                    height: 15px;\n                    border: 2px solid #000000;\n                    border-radius: 50%;\n                    outline: none;\n                    cursor: pointer;\n                    position: relative;\n                    margin-right: 10px;\n                }\n\n                .task-item input[type=\"checkbox\"]:checked {\n                    background-color: #000000;\n                }\n                \n                .task-item.completed {\n                    text-decoration: line-through;\n                    color: gray;\n                }\n                .remove-task {\n                    margin-left: 10px;\n                    cursor: pointer;\n                }\n\n    " }} />
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
            <div className="heading">7 Hari Mendatang</div>
            <div className="task-board-container" id="boardContainer">
              {/* Senin */}
              <div className="board">
                <div className="board-header">Senin</div>
                <div className="task-list">
                  {/* Daftar task item */}
                </div>
                <div className="add-task">+ Tambah Tugas</div>
                <i className="fas fa-plus add-board" />
              </div>
              <style dangerouslySetInnerHTML={{__html: "\n                .board i{\n                    color: #344EAD;\n                }\n                .task-item.completed i{\n                    color: #939393;\n                }\n            " }} />
              {/* Selasa */}
              <div className="board">
                <div className="board-header">Selasa</div>
                <div className="task-list">
                  {/* Daftar task item */}
                </div>
                <div className="add-task">+ Tambah Tugas</div>
                <i className="fas fa-plus add-board" />
              </div>  
              <div className="add-board" id="addBoardBtn"><i className="fas fa-plus" /></div>
            </div>
            <div id="popupCalendar" className="popup-calendar">
              <div className="popup-content">
                <h2>Tambah Tugas</h2>
                <label htmlFor="taskName">Nama Tugas:</label>
                <input type="text" id="taskName" />
                <label htmlFor="taskDate">Tanggal:</label>
                <input type="date" id="taskDate" />
                <label htmlFor="taskTime">Waktu:</label>
                <input type="time" id="taskTime" />
                <div className="buttons">
                  <button className="cancel" onclick="closePopup()">Batal</button>
                  <button className="ok" onclick="addNewTask()">OK</button>
                </div>
              </div>
            </div>
          </div></div>
      );
    }
  });
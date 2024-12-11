import React, { useState, useEffect, useRef } from "react";
import "../styles/Pomodoro.css"

const Pomodoro = () => {
  const TIMER_TYPE_POMODORO = "POMODORO";
  const TIMER_TYPE_SHORT_BREAK = "SHORTBREAK";

  const pomodoroTimerInSeconds = 1500; // 25 menit
  const shortBreakTimerInSeconds = 300; // 5 menit

  const [pomodoroType, setPomodoroType] = useState(TIMER_TYPE_POMODORO);
  const [timerValue, setTimerValue] = useState(pomodoroTimerInSeconds);
  const [isRunning, setIsRunning] = useState(false);

  const multiplierFactor = 360 / timerValue;
  const audio = useRef(new Audio("/sound1.mp3"));
  const progressInterval = useRef(null);

  const formatNumberInStringMinute = (number) => {
    const minutes = Math.trunc(number / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.trunc(number % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      audio.current.volume = 1;
      audio.current.play();
      progressInterval.current = setInterval(() => {
        setTimerValue((prev) => {
          if (prev <= 1) {
            clearInterval(progressInterval.current);
            audio.current.play();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const stopTimer = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      setIsRunning(false);
    }

    if (!audio.current.paused) {
      audio.current.pause();
      audio.current.currentTime = 0;
    }
  };

  const resetTimer = () => {
    clearInterval(progressInterval.current);
    setIsRunning(false);
    setTimerValue(
      pomodoroType === TIMER_TYPE_POMODORO
        ? pomodoroTimerInSeconds
        : shortBreakTimerInSeconds
    );

    audio.current.pause();
    audio.current.currentTime = 0;
  };

  const handlePomodoroTypeChange = (type) => {
    setPomodoroType(type);
    resetTimer();
    setTimerValue(type === TIMER_TYPE_POMODORO ? pomodoroTimerInSeconds : shortBreakTimerInSeconds);
  };
  
  useEffect(() => {
    return () => clearInterval(progressInterval.current);
  }, []);
  useEffect(() => {
    const handleAudioEnd = () => {
      audio.current.currentTime = 0; // Kembali ke awal lagu
      audio.current.play(); // Putar ulang
    };

    audio.current.addEventListener("ended", handleAudioEnd);

    return () => {
      audio.current.removeEventListener("ended", handleAudioEnd);
    };
  }, []);

  useEffect(() => {
    return () => clearInterval(progressInterval.current);
  }, []);
  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h1>Pomodoro</h1>
          <div className="card-header-buttons">
            <button
              id="buttonTypePomodoro"
              className={pomodoroType === TIMER_TYPE_POMODORO ? "active" : ""}
              onClick={() => handlePomodoroTypeChange(TIMER_TYPE_POMODORO)}
            >
              Pomodoro
            </button>
            <button
              id="buttonTypeShortBreak"
              className={pomodoroType === TIMER_TYPE_SHORT_BREAK ? "active" : ""}
              onClick={() => handlePomodoroTypeChange(TIMER_TYPE_SHORT_BREAK)}
            >
              Short Break
            </button>
          </div>
        </div>
        <div className="card-body">
          <div
            id="circularProgressBar"
            className="progress-bar"
            style={{
              background: `conic-gradient(var(--purple) ${
                ((pomodoroType === TIMER_TYPE_POMODORO
                  ? pomodoroTimerInSeconds
                  : shortBreakTimerInSeconds) - timerValue) *
                (360 /
                  (pomodoroType === TIMER_TYPE_POMODORO
                    ? pomodoroTimerInSeconds
                    : shortBreakTimerInSeconds))
              }deg, var(--blue) 0deg)`,
            }}
          >
            <div className="progress-bar-inner">
              <h2 className="progress-value">
                {formatNumberInStringMinute(timerValue)}
              </h2>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <button className="btn-sucess" onClick={startTimer}>
            Start
          </button>
          <button className="btn-danger" onClick={stopTimer}>
            Stop
          </button>
          <button className="btn-reset" onClick={resetTimer}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};
export default Pomodoro;
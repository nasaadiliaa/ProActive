import React, { useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const MOCK_EVENTS = [
  { id: 1, title: "Porvokasi d-1", start: "2024-11-08T16:31:38", end: "2024-11-08T20:15:58", color: "#C97D60" },
  { id: 2, title: "Porvokasi d-2", start: "2024-11-09T16:31:38", end: "2024-11-09T20:31:38", color: "green" },
  { id: 3, title: "Porvokasi d-3", start: "2024-11-10T16:31:38", end: "2024-11-10T20:31:38", color: "gray" },
  { id: 4, title: "Porvokasi d-4", start: "2024-11-11T16:31:38", end: "2024-11-11T20:31:38", color: "indigo" },
  { id: 5, title: "Arak-Arakan Wisuda", start: "2024-11-13T10:45:38", end: "2024-11-13T15:05:38", color: "red" },
  { id: 6, title: "Ameliorer d-8", start: "2024-11-16T07:30:00", end: "2024-11-08T16:30:00", color: "green" },
  { id: 7, title: "Rapat X-Project", start: "2024-11-20T14:00:00", end: "2024-11-20T15:30:00", color: "red" },
  { id: 8, title: "LKMM PRA-TD", start: "2024-12-14T07:00:00", end: "2024-12-14T16:30:00", color: "green" },
  { id: 9, title: "LKMM PRA-TD", start: "2024-12-15T07:00:00", end: "2024-12-15T16:30:00", color: "#C97D60" },
  { id: 10, title: "Pengangkatan Maba 24", start: "2024-12-21T07:00:00", end: "2024-12-21T21:30:00", color: "gray" },
];

const Kalender = () => {
  const [events, setEvents] = useState(
    MOCK_EVENTS.map((event) => ({
      title: event.title,
      start: new Date(event.start),
      end: new Date(event.end),
      color: event.color,
    }))
  );

  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    color: "#3174ad",
  });

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.start && newEvent.end) {
      setEvents([
        ...events,
        {
          title: newEvent.title,
          start: new Date(newEvent.start),
          end: new Date(newEvent.end),
          color: newEvent.color,
        },
      ]);
      setNewEvent({ title: "", start: "", end: "", color: "#3174ad" });
    } else {
      alert("Mohon isi semua data jadwal!");
    }
  };

  return (
    <div style={styles.app}>
      <h2 style={styles.header}>Tambah Jadwal</h2>
      <div style={styles.form}>
        <input
          type="text"
          placeholder="Judul"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          style={styles.input}
        />
        <input
          type="datetime-local"
          value={newEvent.start}
          onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
          style={styles.input}
        />
        <input
          type="datetime-local"
          value={newEvent.end}
          onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
          style={styles.input}
        />
        <input
          type="color"
          value={newEvent.color}
          onChange={(e) => setNewEvent({ ...newEvent, color: e.target.value })}
          style={styles.input}
        />
        <button onClick={handleAddEvent} style={styles.button}>
          Tambah
        </button>
      </div>
      <Calendar
        localizer={localizer}
        startAccessor="start"
        events={events}
        endAccessor="end"
        style={styles.calendar}
        eventPropGetter={(event) => ({
          style: { backgroundColor: event.color },
        })}
        onSelectEvent={(event) => alert(event.title)}
        views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
      />
    </div>
  );
};

const styles = {
  app: { width: "97.5vw", padding: "5px", textAlign: "center" },
  header: { marginBottom: "20px", fontSize: "24px" },
  form: { marginBottom: "20px" },
  input: { margin: "0 10px", padding: "5px" },
  button: { padding: "5px 10px", backgroundColor: "#3174ad", color: "white", border: "none", cursor: "pointer" },
  calendar: { height: "1000px" },
};

export default Kalender;

import { useState, useEffect } from "react";
import "./EditNoteForm.css";

function EditNoteForm({ onClose, onSubmit, note }) {
  const [message, setMessage] = useState("");
  const [error,setError] = useState("");
  useEffect(() => {
    if (note) {
      setMessage(note.message);
    }
  }, [note]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) {
      setError("Message cannot be empty.");
    } else {
      setError("");
      onSubmit(message);
    }
  };

  return (
    <div className="NoteFormPlaceholder">
      <div className="NoteFormBackground">
        <button className="closeBtn" id="NoteFormBtn" onClick={onClose}>Close</button>
        <form className="NoteForm">
          <div className="NoteFormInput">
            <label htmlFor="input">New Message:</label>
            <input
              type="text"
              id="input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          {error && <div className="error">{error}</div>}
          <button onClick={handleSubmit}>Confirm</button>
        </form>
      </div>
    </div>
  );
}

export default EditNoteForm;

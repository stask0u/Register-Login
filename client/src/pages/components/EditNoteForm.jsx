import { useState, useEffect } from "react";
import "./EditNoteForm.css";

function EditNoteForm({ onClose, onSubmit, note }) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (note) {
      setMessage(note.message);
    }
  }, [note]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(message);
  };

  return (
    <div className="NoteFormPlaceholder">
      <div className="NoteFormBackground">
        <button className="closeBtn" onClick={onClose}>Close</button>
        <form>
          <div className="NoteFormInput">
            <label htmlFor="input">New Message:</label>
            <input
              type="text"
              id="input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <button onClick={handleSubmit}>Confirm</button>
        </form>
      </div>
    </div>
  );
}

export default EditNoteForm;

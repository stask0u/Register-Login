import "./NoteForm.css";
import axios from "axios";
import Cookies from "js-cookie";

import React, { useState } from "react";

function NoteForm({ onClose }) {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedAccessToken = Cookies.get("accessToken");

    if (storedAccessToken) {
      try {
        const response = await axios.post("http://localhost:5000/user/decode", {
          token: storedAccessToken,
        });

        const newNoteData = {
          note: message,
          email: response.data.email,
        };
        const addNote = await axios.post(
          "http://localhost:5000/note/addNote",
          newNoteData
        );
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
    onClose();
  };
  return (
    <div className="noteFormOverlay">
      <div className="noteFormContainer">
      <button className="closeBtn" id="NoteFormBtn" onClick={onClose}>Close</button>
        <form className="NoteForm" onSubmit={handleSubmit}>
          <div>
            <label>Message:</label>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <button type="submit">Add Note</button>
        </form>
      </div>
    </div>
  );
}

export default NoteForm;

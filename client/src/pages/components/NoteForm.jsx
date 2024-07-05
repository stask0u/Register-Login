import "./NoteForm.css";
import axios from "axios";
import Cookies from "js-cookie";

import React, { useState } from 'react';

function NoteForm({ onClose }) {
    const [message, setMessage] = useState('');
    const [decodedToken, setDecodedToken] = useState(null);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const storedAccessToken = Cookies.get('accessToken');

        if (storedAccessToken) {
          try {
              const response = await axios.post('http://localhost:5000/user/decode', { token: storedAccessToken });
             
              const newNoteData = {
                note:message,
                email:response.data.email
              }
              const addNote = await axios.post('http://localhost:5000/user/addNote', newNoteData);
              if(addNote){
                console.log("success")
              }
          } catch (error) {
              console.error('Error decoding token:', error);
          }
        }
        console.log('Note added:', { message });
        onClose();
    };
  return (
    <div className="noteFormOverlay">
      <div className="noteFormContainer">
        <button className="closeBtn" onClick={onClose}>
          
        </button>
        <form onSubmit={handleSubmit}>
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

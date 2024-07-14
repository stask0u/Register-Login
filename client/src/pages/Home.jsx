import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Note from "./components/Note";
import NoteForm from "./components/NoteForm";
import EditNoteForm from "./components/EditNoteForm";
import "./styles/Home.css";

function Home() {
    const [decodedToken, setDecodedToken] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [showEditNoteForm, setShowEditForm] = useState(false);
    const [notes, setNotes] = useState([]);
    const [editingNote, setEditingNote] = useState(null);

    library.add(faPlus);

    useEffect(() => {
        const fetchToken = async () => {
            const storedAccessToken = Cookies.get('accessToken');
            if (storedAccessToken) {
                try {
                    const response = await axios.post('http://localhost:5000/user/decode', { token: storedAccessToken });
                    setDecodedToken(response.data);
                } catch (error) {
                    console.error('Error decoding token:', error);
                }
            } else {
                console.log('No token');
            }
        };

        fetchToken();
    }, []);

    useEffect(() => {
        if (decodedToken) {
            updateNotes();
        }
    }, [decodedToken]);

    const updateNotes = async () => {
        try {
            const storedAccessToken = Cookies.get('accessToken');
            if (storedAccessToken && decodedToken) {
                const response = await axios.post('http://localhost:5000/user/notes', { email: decodedToken.email });
                setNotes(response.data || []);
            } else {
                console.error('No Token');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddNoteClick = () => {
        setShowForm(true);
    };

    const handleCloseForm = async () => {
        setShowForm(false);
        updateNotes();
    };

    const handleEditNoteClick = (note) => {
        setEditingNote(note);
        setShowEditForm(true);
    };

    const handleEditCloseForm = async () => {
        setShowEditForm(false);
        setEditingNote(null);
        updateNotes();
    };

    const handleEditNoteSubmit = async (updatedMessage) => {
        try {
            const data = {
                email: decodedToken.email,
                _id: editingNote._id,
                newMsg: updatedMessage
            };
            console.log(data)
            const response =  await axios.post('http://localhost:5000/user/editNote', data);
            handleEditCloseForm();
        } catch (err) {
            console.error(err);
        }
    };

    const deleteNote = async (element) => {
        try {
            const data = {
                email: decodedToken.email,
                _id: element._id
            };
            await axios.post('http://localhost:5000/user/deleteNote', data);
            updateNotes();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="notesPlaceholder">
                {decodedToken &&
                    <div className="userNotes">
                        <div className="header">
                            <p className="notesPara">Notes</p>
                            <button onClick={handleAddNoteClick} className="noteBtn">
                                <FontAwesomeIcon icon="plus" /> Add Note
                            </button>
                        </div>
                        <div className="notes">
                            {notes.map((element) => (
                                <Note
                                    key={element._id}
                                    message={element.message}
                                    date={element.date}
                                    id={element._id}
                                    email={decodedToken.email}
                                    onDelete={() => deleteNote(element)}
                                    onEdit={() => handleEditNoteClick(element)}
                                />
                            ))}
                        </div>
                    </div>
                }
            </div>
            {showForm && <NoteForm onClose={handleCloseForm} />}
            {showEditNoteForm && (
                <EditNoteForm
                    onClose={handleEditCloseForm}
                    onSubmit={handleEditNoteSubmit}
                    note={editingNote}
                />
            )}
        </div>
    );
}

export default Home;

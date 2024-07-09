import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Note from "./components/Note";
import NoteForm from "./components/noteForm";
import "./styles/Home.css";



function Home(){
    const [decodedToken, setDecodedToken] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [notes, setNotes] = useState([]);

   
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
    }

    const handleAddNoteClick = () => {
        setShowForm(true);
    };

    const handleCloseForm = async () => {
        setShowForm(false);
        updateNotes();
    };

    return(
        <div>
            <Navbar/>
            <div className="notesPlaceholder">
                {decodedToken && 
            
                <div className="userNotes">
                    <div className="header">
                        <p className="notesPara">Notes</p>
                        <button onClick={handleAddNoteClick} className="noteBtn"><FontAwesomeIcon icon="plus"/> Add Note</button> 
                    </div>
                    <div className="notes">
                    {notes.map((element) => (
                                <Note key={element._id} message={element.message} date={element.date} />
                            ))}
                    </div>
                </div>
                }
            </div>
            {showForm && <NoteForm onClose={handleCloseForm} />}
        </div>
    );
}

export default Home;
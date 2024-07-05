import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Note from "./components/Note";
import NoteForm from "./components/NoteForm";
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
                    setNotes(response.data.notes);
                    
                } catch (error) {
                    console.error('Error decoding token:', error);
                }
            } else {
                console.log('No token')
            }
        };

        fetchToken();
    }, []);

    const handleAddNoteClick = () => {
        
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
    };

    return(
        <div>
            <Navbar/>
            <div className="notesPlaceholder">
                {decodedToken && 
            
                <div className="userNotes">
                    <div className="header">
                        <p className="notesPara">Notes</p>
                        <button onClick={handleAddNoteClick} className="noteBtn"><FontAwesomeIcon icon="plus"  /> Add Note</button> 
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
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import "./styles/Home.css";



function Home(){
    const [decodedToken, setDecodedToken] = useState(null);

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
                console.log('No token')
            }
        };

        fetchToken();
    });
    return(
        <div>
            <Navbar/>
            <div className="notesPlaceholder">
                {decodedToken && 
            
                <div className="userNotes">
                    <div className="header"> <p className="notesPara">Notes</p> <button className="noteBtn"><FontAwesomeIcon icon="plus"  /> Add Note</button> </div>
                </div>
                }
            </div>
        </div>
    );
}

export default Home;
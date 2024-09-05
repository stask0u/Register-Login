import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./styles/Dashboard.css"
import Navbar from "./components/Navbar";

function Dashboard() {

    const [decodedToken, setDecodedToken] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchToken = async () => {
            const storedAccessToken = Cookies.get('accessToken');
            if (storedAccessToken) {
                try {
                    const response = await axios.post('http://localhost:5000/user/decode', { token: storedAccessToken });
                    setDecodedToken(response.data);
                } catch (error) {
                    console.error('Error decoding token:', error);
                    navigate('/login');
                }
            } else {
                navigate('/login');
            }
        };

        fetchToken();
    }, [navigate]);

    const handleImageClick = (event)=>{
        
    }

    return (
        <>
            <Navbar/>
            <div className="allBackground">
                <h1 className="dashboard-text">DASHBOARD</h1>
                {
                decodedToken && <div className="body-background">
                    <div className="body-content">
                        <div className="imageDiv" >
                        <img src={`http://localhost:5000/images/${decodedToken.profilePicture}`} className="profilePictureImg" alt="Profile" />
                        <input className="imageChangeButton" type="file" accept=".jpeg, .png, .jpg" onChange={handleImageClick} />
                            
                        </div>
                        
                        
                        <div className="user-data">
                            <p className="username">Username: {decodedToken.username}</p>
                            <p className="email">Email: {decodedToken.email}</p>
                        </div>
                    </div>
                </div>
                }
            </div>
           
            
            {/* {decodedToken && (
                <div>
                    <p>{JSON.stringify(decodedToken)}</p>
                    {
                        console.log(decodedToken)
                    }
                    {decodedToken.profilePicture && (
                        <img 
                            src={`http://localhost:5000/images/${decodedToken.profilePicture}`} 
                            alt="Profile" 
                            width="100px" 
                        />
                    )}
                </div>
            )} */}
        </>
    );
}

export default Dashboard;

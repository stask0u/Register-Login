import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./styles/Dashboard.css";
import Navbar from "./components/Navbar";

function Dashboard() {
    const [decodedToken, setDecodedToken] = useState(null);
    const [newAvatar, setNewAvatar] = useState(null);
    const [profilePicturePreview, setProfilePicturePreview] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
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

    const handleImageClick = async (event) => {
        const file = event.target.files[0];
        setNewAvatar(file);
        setProfilePicturePreview(URL.createObjectURL(file));
        setIsUploading(true);

        const formData = new FormData();
        formData.append('profilePicture', file);
        formData.append('email', decodedToken.email);

        try {
            const response = await axios.post('http://localhost:5000/user/profilePicture', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.status === 200) {
                console.log("Profile picture updated");

                Cookies.set('accessToken', response.data.accessToken);

                const updatedTokenResponse = await axios.post('http://localhost:5000/user/decode', { token: response.data.accessToken });
                setDecodedToken(updatedTokenResponse.data);

                setIsUploading(false);
            } else {
                console.error("Failed to update profile picture");
                setIsUploading(false);
            }
        } catch (err) {
            console.error(err);
            setIsUploading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="allBackground">
                <h1 className="dashboard-text">DASHBOARD</h1>
                {
                    decodedToken && <div className="body-background">
                        <div className="body-content">
                            <div className="imageDiv">
                                {isUploading && <p>Uploading...</p>}
                                <img
                                    src={`http://localhost:5000/uploads/${decodedToken.profilePicture}`}
                                    className="profilePictureImg"
                                    alt="Profile"
                                />
                                <input
                                    className="imageChangeButton"
                                    type="file"
                                    accept=".jpeg, .png, .jpg"
                                    onChange={handleImageClick}
                                    disabled={isUploading}
                                />
                            </div>
                            <div className="user-data">
                                <p className="username">Username: {decodedToken.username}</p>
                                <p className="email">Email: {decodedToken.email}</p>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    );
}

export default Dashboard;

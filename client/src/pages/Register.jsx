import { useState } from "react";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import avatar from '../assets/profile.png'

function Register(){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const history = useNavigate();

    const handleFileChange = (event) => {
        setProfilePicture(event.target.files[0]);
    };

    async function handleSubmit(event){
        event.preventDefault();
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('profilePicture', profilePicture);

        try {
            const response = await axios.post('http://localhost:5000/user/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if(response){
                history('/');
            }
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div>
            <Navbar/>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="avatar"><img src={avatar} width={'100px'} alt="" /> </label>
                    <input type="file" id="avatar" accept=".jpeg, .png, .jpg" onChange={handleFileChange}/>
                </div>
                <div>
                    <label htmlFor="usernameInput">Username</label>
                    <input type="text" id="usernameInput" onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="emailInput">Email</label>
                    <input type="email" id="emailInput" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="passwordInput">Password</label>
                    <input type="password" id="passwordInput" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Register;

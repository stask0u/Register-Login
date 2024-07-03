import { useState } from "react";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import avatar from '../assets/profile.png'
import "./styles/Register.css"

function Register(){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [errors, setErrors] = useState({ username: '', email: '', password: '', general: '' });
    const history = useNavigate();

    const handleFileChange = (event) => {
        setProfilePicture(event.target.files[0]);
    };

    async function handleSubmit(event){
        event.preventDefault();
        
        const newErrors = { username: '', email: '', password: '', general: '' };
        let hasError = false;

        if (!username.trim()) {
            newErrors.username = 'Username is required';
            hasError = true;
        }
        if (!email.trim()) {
            newErrors.email = 'Email is required';
            hasError = true;
        }
        if (!password.trim() ) {
            newErrors.password = 'Password is required';
            hasError = true;
        }
        if(password.trim() && password.length<6){
            newErrors.password = 'Password is too short';
            hasError = true;
        }

        setErrors(newErrors);

        if (hasError) return;

        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        if(profilePicture==null){
            // formData.append('profilePicture', )
        }else
        formData.append('profilePicture', profilePicture);

        console.log(profilePicture);
        
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
            <div className="form-Placeholder">
                <form onSubmit={handleSubmit} className="register-Form">
                <div className="avatarDiv">
                    <label htmlFor="avatar"><img src={avatar} width={'100px'} alt="" /> </label>
                    <input type="file" id="avatar" accept=".jpeg, .png, .jpg" onChange={handleFileChange}/>
                </div>
                <div className="placeholder" >
                    <label htmlFor="usernameInput">Username</label>
                    <input type="text" id="usernameInput" onChange={(e) => setUsername(e.target.value)}/>
                </div>
               
                <div className="placeholder">
                    <label htmlFor="emailInput">Email</label>
                    <input type="email" id="emailInput" onChange={(e) => setEmail(e.target.value)}/>
                    
                </div>
                <div className="placeholder">
                    <label htmlFor="passwordInput">Password</label>
                    <input type="password" id="passwordInput" onChange={(e) => setPassword(e.target.value)}/>
                    
                </div>
                {errors.username && <span style={{ color: 'red' }}>{errors.username}</span>}
                {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
                {errors.general && <span style={{ color: 'red' }}>{errors.general}</span>}
                <button className="Submit" type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Register;

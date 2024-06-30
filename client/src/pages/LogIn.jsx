import Navbar from "./components/Navbar";
import { useState } from "react";
import axios from "axios";

function LogIn(){
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    async function handleSubmit(event){
        event.preventDefault();
        const formData= {
            email:email,
            password:password
        }
        try {
            const response = await axios.post('http://localhost:5000/user/login', formData)
            document.cookie = `accessToken=${response.data.accessToken}; path=/`
        }catch(err){
            console.log(err)
        }
       
        window.location.href = '/';
    }
    return(
        <div>
            <Navbar/>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="emailInput">Email</label>
                    <input type="email" id="emailInput" onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>
                <div>
                    <label htmlFor="passwordInput">Password</label>
                    <input type="password" id="passwordInput"onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default LogIn;
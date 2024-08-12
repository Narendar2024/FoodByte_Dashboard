import React, { useState } from 'react';
import { API_URL } from '../../data/apiPath';

const Register = ({ showLoginHandler }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/vendor/register`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });

            const data = await response.json();
            if (response.ok) {
                console.log(data);
                setUsername("");
                setEmail("");
                setPassword("");
                alert('Vendor Registered Successfully');
                showLoginHandler();
            }
        } catch (error) {
            console.error("Registration Faild", error);
            alert("Registration Failed");
        }
    };
    return (
        <div className='registerSection'>
            <form className='authForm' onSubmit={handleSubmit}>
                <h3>Vendor Register</h3>
                <label htmlFor="username">Username:</label>
                <input type="text" name='username' value={username} placeholder='Enter your name' onChange={(e) => { setUsername(e.target.value); }} /><br />

                <label htmlFor="email">E-Mail:</label>
                <input type="email" id='email' value={email} name='email' placeholder='Enter your email' onChange={(e) => { setEmail(e.target.value); }} /><br />

                <label htmlFor="password">Password:</label>
                <input type="text" id='password' value={password} name='password' placeholder='Enter your password' onChange={(e) => { setPassword(e.target.value); }} /><br />

                <div className="btnSubmit">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default Register; <br />;
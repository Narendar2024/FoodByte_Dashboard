import React, { useState } from 'react';
import { API_URL } from '../../data/apiPath';

const Login = ({ showWelcomeHandler }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/vendor/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.ok) {
                setEmail("");
                setPassword("");
                alert('Login Successfully');
                localStorage.setItem('loginToken', data.token);
                showWelcomeHandler();
            }
            const vendorId = data.vendorId;
            console.log("Checking for Vendor Id:", vendorId);
            const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`);
            const vendorData = await vendorResponse.json();
            if (vendorResponse.ok) {
                const vendorFirmId = vendorData.vendorFirmId;
                console.log("Checking for firmId", vendorFirmId);
                // const vendorFirmName = vendorData.firm[0].firmName;
                // console.log("Firm Name is: ", vendorFirmName);
                localStorage.setItem('firmId', vendorFirmId);
            }

        } catch (error) {
            console.error("Login Failed", error);
        }
    };

    return (
        <div className='loginSection'>
            <form className='authForm' onSubmit={loginHandler}>
                <h3>Vendor Login</h3>

                <label htmlFor="email">E-Mail</label>
                <input type="email" id='email' name='email' value={email} placeholder='Enter your email' onChange={(e) => { setEmail(e.target.value); }} /><br />
                <label htmlFor="password">Password</label>
                <input type="password" id='password' name='password' value={password} placeholder='Enter your password' onChange={(e) => { setPassword(e.target.value); }} /><br /> {/* Use type="password" */}
                <button type="submit">Submit</button><br />
            </form>
        </div>
    );
};

export default Login;

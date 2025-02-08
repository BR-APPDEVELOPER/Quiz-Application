import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function login(e) {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:5000/api/users/login", {
                email,
                password
            });

            if (res.data.success) {
                localStorage.setItem('token', res.data.token);
                sessionStorage.setItem("userEmail", email);
                alert("Login successful");
                navigate('/home', {state: {email: email}}); 
                
            } else {
                alert("Error", res.data.message);
            }
        } catch (error) {
            console.error("Login error: ", error);
            alert("Something went wrong");
        }

    };

    return (
        <div className="main-div">
            <form onSubmit={login} className="form-div">
                <h2>Login</h2>
                <hr/>
                <label className='reg-label' >Email</label><br />
                <input className='email-in' type='text' value={email} onChange={(e) => setEmail(e.target.value)} required /><br />
                <label className='reg-label'>Password</label><br />
                <input className='password-in' type='password' value={password} onChange={(e) => setPassword(e.target.value)} required /><br />
                <button className="btn-login" type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
import React, {useState} from 'react';
import "./App.css";
import {Link} from "react-router-dom";


function Login(props) {

    const [user, setUser] = useState({
        username: "", password: "",
    });

    function handleChange(event) {
        const {name, value} = event.target;
        if (name === "password") {
            setUser({username: user['username'], password: value}); 
        }
        else {
            setUser({
                username: value,
                password: user['password']
            });
        }
    }

    function LoginForm() {
        props.handleSubmit(user);
        setUser({username: '', password: ''});
    }

    return (
        <div className="SignIn-cont">
            <header className='App-header'>LOGIN</header>
            <input type='text' name='username' id='username' value={user.username} onChange={handleChange} className='textfield' placeholder='Enter Username...'></input>
            <input type='text' name='password' id='password' value={user.password} onChange={handleChange} className='textfield' placeholder='Enter Password...'></input>
            <button type='submit' id='submit' onClick={LoginForm} className='submit-button'>SUBMIT</button>

            <div className='nav-div'>
                <small>Don&apos;t Have An Account?&nbsp;</small>
                <Link to="/register">Register Here</Link>
            </div>
        </div>
    );
}

export default Login
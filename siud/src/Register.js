import React, {useState} from 'react';
import "./App.css";
import {Link} from "react-router-dom";

function Register(props) {

    const [user, setUser] = useState({
        username: "", password: "", confirmPassword: "",
    });

    function handleChange(event) {
        const {name, value} = event.target;
        if (name === "password") {
            setUser({username: user['username'], password: value, confirmPassword: user['confirmPassword']}); 
        }
        else if (name === "confirmPassword") {
            setUser({username: user['username'], password: user['password'], confirmPassword: value });
        }
        else {
            setUser({
                username: value,
                password: user['password'],
                confirmPassword: user['confirmPassword']
            });
        }
    }

    function RegisterForm() {
        props.handleSubmit(user);
        setUser({username: '', password: '', confirmPassword:''});
    }

    return (
        <div className="SignIn-cont">
            <header className='App-header'>Register</header>
            <input type='text' name='username' id='username' value={user.username} onChange={handleChange} className='textfield' placeholder='Enter Username...'></input>
            <input type='text' name='password' id='password' value={user.password} onChange={handleChange} className='textfield' placeholder='Enter Password...'></input>
            <input type='text' name='confirmPassword' id='confirmPassword' value={user.confirmPassword} onChange={handleChange} className='textfield' placeholder='Confirm Password...'></input>
            <button type='submit' id='submit' className='submit-button' onClick={RegisterForm}>SUBMIT</button>

            <div className='nav-div'>
                <small>Have An Account?&nbsp;</small>
                <Link to="/login">Login Here</Link>
            </div>
        </div>
    );
}

export default Register
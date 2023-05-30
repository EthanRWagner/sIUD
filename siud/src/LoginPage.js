import Login from "./Login";
import axios from 'axios';
import React from 'react';
import "./App.css";
import {useNavigate} from "react-router-dom";
import logo from './logo-2.png';

// database port
const port = 8675;

function LoginPage (){
    // web navigation method saved to a constant variable for easier use 
    const navigate = useNavigate();

    if(window.sessionStorage.length > 0) {
        navigate('../iud')
    }

    // prop passed to register component so that the registration
    // information can be made and posted into a user
    // going to navigate to login page after registering

    function updateList(person) { 
        attemptLogin(person).then( result => {
            if (result && result.status === 202)  {
                window.sessionStorage.setItem("id", result.data[0]['_id'])
                navigate('../iud')
                // need to refresh after navigating to update navbar in parent component
                window.location.reload(false);
            }
        });
    }

    async function attemptLogin(person){
        try {
            const response = await axios.post(`http://localhost:${port}/signin`, person);
            return response;
        }
        catch (error) {
            return error;
        }
    }
        
    return (
    <div className="App">
      <div className="device-cont">
        <div className="home-cont">
            <img src={logo} className="App-logo" alt="logo" />
            <Login handleSubmit={updateList} />
        </div>
      </div>
    </div>

    )
}

export default LoginPage;
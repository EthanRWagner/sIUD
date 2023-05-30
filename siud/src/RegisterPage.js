import React from 'react';
import Register from "./Register";
import "./App.css";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import logo from './logo-2.png';

// database port
const port = 8675;

function RegisterPage (){
    // web navigation method saved to a constant variable for easier use 
    const navigate = useNavigate();

    if(window.sessionStorage.length > 0) {
        navigate('../iud')
    }

    function updateList(person) { 
        attemptRegister(person).then( result => {
            if (result && result.status === 201)  {
                window.sessionStorage.setItem("id", result.data['_id'])
                navigate('../iud')
                // need to refresh after navigating to update navbar in parent component
                window.location.reload(false);
            }
        });
    }

    async function attemptRegister(person){
        try {
            const response = await axios.post(`http://localhost:${port}/signup`, person);
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
            <Register handleSubmit={updateList} />
        </div>
        </div>
    </div>

    )
}

export default RegisterPage;
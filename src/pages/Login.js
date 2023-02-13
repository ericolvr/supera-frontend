import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';


function Login() {
    const API_URL = process.env.REACT_APP_API_URL;
    const [mobile, setMobile] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate();

    function checkExistsProductsonLocalStorage () {
        const session = localStorage.getItem('list_ids_cart')
        if (session) {
            navigate('/checkout')
        } else {
            navigate('/')
        }
    }

    function writeDataStorage(userData) {
        localStorage.setItem('user_data', JSON.stringify(userData))
   
    }
    
    async function handleSubmit(e) {
        console.log('handle SUbmit')
        e.preventDefault()

        const payload = {
            "mobile": mobile,
            "password": password           
        } 
        try {
            const api_response = await axios.post(`${API_URL}/authentication/token/`, payload)
            if (api_response.data){
                writeDataStorage(api_response.data)
                checkExistsProductsonLocalStorage()                
            }
        } catch (e) {
            console.log(e)
        }
    }

    return(
        <>
            <Navbar />
            <div className='container top-80'>
                <div className='row'>
                    <div className='col-lg-4'></div>
                    <div className='col-lg-4'>
                        <form onSubmit={handleSubmit}>
                            <input type='text' name='mobile' className='form-control' onChange={e => setMobile(e.target.value)} required />
                            <input type='password' name='password' className='form-control' onChange={e => setPassword(e.target.value)} required />
                            <button type='submit'>
                                Entrar
                            </button>
                        </form>
                    </div>
                    <div className='col-lg-4'></div>
                </div>
                
            </div>
        </>
    );
}

export default Login;
// Modules
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


// Routes

import './styles/AdminLogin.css'
import baseUrl from '../network/api'



export default function AdminLogin() {

    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const navigate = useNavigate();

    async function login() {

        try {
            if (phoneNumber === "" || password === "") {
                setError("please fill all field")
            }
            else {

                const request = await axios.post(`${baseUrl}/adminLogin`, { phoneNumber, password })
                console.log(request.status)

                if (request.status === 200) {
                    if (request.data.message.ID === 0) {
                        navigate("/EyeDonor")
                    }
                    else if (request.data.message.ID === 1) {

                        navigate("/EyeDonor")
                    }
                    else if (request.data.message.ID === 2) {
                        navigate("/EyeDonor")

                    }

                }
                else if (request.status === 201) {
                    setError(request.data.message)
                }

            }

        } catch (error) {
            console.log(error)
            if(error){
                setError('Network Error')
            }
        }


    }


    return (
        <div className="mainBox">

            <div className='box1'>
                <h1>ODTMS</h1>
                <p>
                    ''You are a piece of the puzzle of someone else’s life.
                    You may never know where you fit, but others will
                    fill the holes in their lives with pieces of you ''.
                </p>
            </div>
            <div className='box2'>
                <div className='formBox'>
                    <h3>Administrative Login</h3>
                    <p>Phone Number</p>
                    <input type="text" value={phoneNumber} onChange={(e) => { setPhoneNumber(e.target.value) }} />
                    <p>Password</p>
                    <input type="text" value={password} onChange={(e) => { setPassword(e.target.value) }} /><br />
                    <div className='errorMessage'>{error}</div><br />
                    <div>
                        <button onClick={login}>Login</button>
                    </div>

                </div>
            </div>

        </div>
    )
}

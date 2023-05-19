import React, {useState} from 'react'
import { Link } from 'react-router-dom'

export default function Signup() {
    const [emailText, setEmailText] = useState('')
    const [passwordText, setPasswordText] = useState('')
    const [confirmPasswordText, setConfirmPasswordText] = useState('')

    const handleChange = (e) => {
        switch(e.target.id){
            case 'email':
                setEmailText(e.target.value)
                break
            case 'password':
                setPasswordText(e.target.value)
                break
            case 'confirm_password':
                setConfirmPasswordText(e.target.value)
                break 
            default:
                break          
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = 'http://127.0.0.1:5000/api/signup';
        const options = {
            // mode: 'no-cors',
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                email: emailText,
                password: passwordText,
            })
        };

        if (passwordText !== confirmPasswordText){
            alert('Your passwords did not match. For your security, we cannot create your account until you have properly verified your password.')
        }

        const res = await fetch(url, options);
        const data = await res.json();
        if (data.status === 'ok'){
            // Show success msg
            console.log(data)
            console.log('successfully created an account')
            // this.setState({redirect:true})
        }

    }


    return (
        <div align="center">
            <div className="signup" align="center">
                <h2>Sign Up</h2>
                <form id= "signup-form" onSubmit={handleSubmit}>
                    <input id="email"type="text" placeholder="Email" value={emailText} onChange={handleChange}/>
                    <input id="password"type="password" placeholder="Password" value={passwordText} onChange={handleChange}/>
                    <input id="confirm_password"type="password" placeholder="Confirm Password" value={confirmPasswordText} onChange={handleChange}/>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    )
}

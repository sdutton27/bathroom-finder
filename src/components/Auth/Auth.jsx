import React, { useState, useEffect, useContext } from 'react'

import { UserContext } from '../../context/UserContext'
import { FavoritesContext } from '../../context/FavoritesContext';

import './auth.css';

import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi'

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import GoogleButton from 'react-google-button'


export default function Auth() {
    const [loginEmailText, setLoginEmailText] = useState('')
    const [loginPasswordText, setLoginPasswordText] = useState('')
    const [signupEmailText, setSignupEmailText] = useState('')
    const [signupPasswordText, setSignupPasswordText] = useState('')
    const [confirmPasswordText, setConfirmPasswordText] = useState('')
    const [greenClass, setGreenClass] = useState('')

    const [visibleClass, setVisibleClass] = useState('vis')
    const [authVisibility, setAuthVisibility] = useState(true)

    const [lockVis, setLockVis] = useState('lockVis')
    const [lockExists, setLockExists] = useState(true)

    // for the sliding doors
    // const [checked, setChecked] = useState(true)

    const {user, setUser, logMeIn, logMeOut, userUnlocked, setUserUnlocked} = useContext(UserContext)

    const { setFavorites, getFavorites } = useContext(FavoritesContext)

    const handleLockClick = (e) => {
        if (greenClass === 'green') {
            setGreenClass('');
        } else {
            setGreenClass('green')
        }
        setTimeout(()=>{
            setLockVis('lockInvis')
        }, 500)
        setTimeout(()=>{
            setLockExists(false)
            setUserUnlocked('unlocked')
        }, 3000) // set the unlocked Class once the animation has finished.. though in home.css it's actually only 2 seconds 
        // setTimeout(()=>{
        //     setUserUnlocked('unlocked')
        // }, 5000)
    }

    const handleChange = (e) => {

        switch(e.target.id){
            case 'login-email':
                setLoginEmailText(e.target.value)
                break
            case 'login-password':
                setLoginPasswordText(e.target.value)
                break
            case 'signup-email':
                setSignupEmailText(e.target.value)
                break
            case 'signup-password':
                setSignupPasswordText(e.target.value)
                break
            case 'confirm-password':
                setConfirmPasswordText(e.target.value)
                break
            default:
                break    
        }
    }

    const login = async () => {
        const url = 'http://127.0.0.1:5000/api/login';
        const options = {
            method: "POST",
            headers: {
                Authorization: `Basic ${window.btoa(loginEmailText+":"+loginPasswordText)}`
            }
        };

        const res = await fetch(url, options);
        const data = await res.json();
        console.log(data)
        if (data.status === 'ok') {
            const myUserInfo = data.data // the stuff under the 'data' key in the info
            console.log('logged in!')
            console.log(myUserInfo)

            logMeIn(myUserInfo);
            //this.setState({redirect:true})
            animateDisappearance();
        } else {
            // throw an error message
            alert('That username/password combo was incorrect. Please try again.')
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        // LOG IN
        if (Object.keys(user).length === 0) { // make sure this doesn't get resubmitted 
            if (e.target.id == 'login-form') {
                login()   
            // SIGN UP
            } else {
                if (signupPasswordText === "") {
                    alert('You did not input a password. Your password must have at least 1 character')
                } else {
                    const url = 'http://127.0.0.1:5000/api/signup';
                    const options = {
                        // mode: 'no-cors',
                        method: "POST",
                        headers: {
                            "Content-Type": 'application/json'
                        },
                        body: JSON.stringify({
                            email: signupEmailText,
                            password: signupPasswordText,
                        })
                    };

                    if (signupPasswordText !== confirmPasswordText){
                        alert('Your passwords did not match. For your security, we cannot create your account until you have properly verified your password.')
                        return
                    }

                    const res = await fetch(url, options);
                    const data = await res.json();
                    if (data.status === 'ok'){
                        // Show success msg
                        console.log(data)
                        console.log('successfully created an account')
                        const myUserInfo = data.data // the stuff under the 'data' key in the info
                        console.log('logged in!')
                        console.log(myUserInfo)
                        console.log("this is the type" + (typeof(myUserInfo)))

                        logMeIn(myUserInfo);

                        animateDisappearance();
                        // this.setState({redirect:true})
                    }
                }
            }
        }


    }

    const animateDisappearance = () => {
        setVisibleClass((prev)=>{
            if (prev === 'vis') {
                return 'invis'
            } else {
                return 'vis'
            }
        })
        setTimeout(()=>{
            setAuthVisibility(false)
        }, 2000) 
    }

    // for GoogleAuth login
    const createGoogleLoginPopup = async () => {
        // make sure that the user doesn't click this after they log in 
        if (Object.keys(user).length === 0) { 
            const provider = new GoogleAuthProvider();
            const auth = getAuth();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            //const token = credential.accessToken; //maybe
            if (user) {
                console.log(user)
                const userInfo = {
                    apitoken: user.accessToken,
                    bio: null,
                    date_created: user.metadata.creationTime,
                    email: user.email,
                    first_name: null,
                    id: user.uid,
                    last_name: null,
                    profile_pic: user.photoURL,
                }
                console.log(JSON.parse(JSON.stringify(userInfo)))
                const userData = JSON.parse(JSON.stringify(userInfo))
                // make the API request 
                const url = 'http://127.0.0.1:5000/api/google-auth';
                const options = {
                    // mode: 'no-cors',
                    method: "POST",
                    headers: {
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify({
                        email: userData.email,
                        google_id: userData.id,
                        profile_pic: userData.profile_pic,
                        apitoken: userData.apitoken,
                    })
                };

                const res = await fetch(url, options);
                const data = await res.json();
                if (data.status === 'ok'){
                    // Show success msg
                    console.log(data)
                    console.log('success')
                    const myUserInfo = data.data // the stuff under the 'data' key in the info
                    console.log(myUserInfo)

                    logMeIn(myUserInfo);

                    animateDisappearance();
                }
            }
        }
    }

    // // FOR RETRIEVING THE USER'S FAVORITES
    // const getFavorites = async () => {
    //     // const url = 'http://127.0.0.1:5000/api/favorites';
    
    //     if (user.apitoken) { // if the user is logged in
    //       const res = await fetch('http://127.0.0.1:5000/api/favorites', {
    //           headers: {Authorization: `Bearer ${user.apitoken}`}
    //       })
    //       const data = await res.json()
    //       console.log(data)
    //       if (data.status === 'ok') {
    //           console.log('the favorites list was a success')
    //           setFavorites(data.favorites)
    //       }
    //       else {
    //           // if you log out then if should log out
    //           // setCart([])
    //           console.log('the favorites list was a failure')
    //           setFavorites([])
    //       }
    //     } else { // if the user has logged out 
    //         setFavorites([])
    //     }
    
    //   }

    useEffect(()=>{
        getFavorites()
    },[user])

    // const onDoorCheckChange = (e) => {
    //     if (checked === true) {
    //         setChecked(false)
    //     } else {
    //         setChecked(true)
    //     }
    // }

    // const icon = document.getElementById('icon');
    // icon.addEventListener('click', () => {
    // icon.classList.toggle('green');
    // });
    // var login = document.querySelector('#login')
    // var signup = document.querySelector('#signup')
    // setTimeout(function(){ signup.checked = true}, 1000)
    // setTimeout(function(){ login.checked = true}, 2000)

    return (
        // <div align="center">
        //     <div className="login" align="center">
        //         <h2>Login</h2>
        //         <form id= "login-form" onSubmit={handleSubmit}>
        //             <input id="username"type="text" placeholder="Email" value={emailText} onChange={handleChange}/>
        //             <input id="password"type="password" placeholder="Password" value={passwordText} onChange={handleChange}/>
        //             <button type="submit">Login</button>
        //         </form>
        //     </div>
        // </div>
        <>
        {/* {lockExists?  */}
        {userUnlocked==='locked'? 
        <div className="auth-background">
        {/* <div className="curtain">
            <div className="curtain__wrapper">
                <input type="checkbox" checked={checked} onChange={onDoorCheckChange}/>
                
                <div className="curtain__panel curtain__panel--left">
                </div> 
                
                <div className="curtain__content">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/9632/trophy.svg"/>
                <h2>Achievement Unlocked!</h2>
                </div>
                
                <div className="curtain__panel curtain__panel--right">
                </div>
                
            </div>
        </div>  */}
            {authVisibility? 
            <div className={`container ${visibleClass}`}>
                <input id="login" type="radio" name="tab" defaultChecked/>
                <input id="signup" type="radio" name="tab"/>
                <div className="pages">
                    <div className="page">
                        <form id= "login-form" onSubmit={handleSubmit}>
                            <div className="input">
                                <div className="title"><HiOutlineMail className="material-icons" /> E-MAIL</div>
                                <input className="text" id="login-email" type="text" placeholder="E-mail" value={loginEmailText} onChange={handleChange}/>
                            </div>
                            <div className="input">
                                <div className="title"><HiOutlineLockClosed className="material-icons"/> PASSWORD</div>
                                <input id="login-password" className="text" type="password" placeholder="Password" value={loginPasswordText} onChange={handleChange}/>
                            </div>
                            <div className="input">
                                <input type="submit" value="LOG IN"/>
                            </div>
                            <div className="input">
                                <GoogleButton className="google-button" onClick={createGoogleLoginPopup}/>
                            </div>
                        </form>
                    </div>
                    <div className="page signup">
                        <form id= "signup-form" onSubmit={handleSubmit}>
                            <div className="input">
                                <div className="title"><HiOutlineMail className="material-icons" /> EMAIL</div>
                                <input id="signup-email" className="text" type="text" placeholder="E-mail" value={signupEmailText} onChange={handleChange}/>
                            </div>
                            <div className="input">
                                <div className="title"><HiOutlineLockClosed className="material-icons"/> PASSWORD</div>
                                <input id="signup-password" className="text" type="password" placeholder="Password" value={signupPasswordText} onChange={handleChange}/>
                            </div>
                            <div className="input">
                                <div className="title"><HiOutlineLockClosed className="material-icons"/> CONFIRM PASSWORD</div>
                                <input id="confirm-password" className="text" type="password" placeholder="Confirm Password" value={confirmPasswordText} onChange={handleChange}/>
                            </div>
                            <div className="input">
                                <input type="submit" value="SIGN UP"/>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="tabs">
                    <label className="tab text" htmlFor="login">
                    Log In</label>
                    <label className="tab text" htmlFor="signup">
                    Sign Up</label>
                </div>
            </div>
            :<></>}
            {lockExists? 
            <div id="icon" className={`${greenClass} ${lockVis}`} onClick={handleLockClick}>
                <div id="keyhole"></div>
                <svg viewBox="0 0 22 25">
                <rect x="0.505493" y="10.1519" width="21.3777" height="14.2868" rx="3" />
                <path d="M5.73621 10.4592V7.32508C5.73621 4.31064 8.1799 1.86694 11.1943 1.86694V1.86694C14.2088 1.86694 16.6525 4.31064 16.6525 7.32508V10.4592" strokeWidth="3.5" />
                </svg>
            </div>
            : <></>}
        </div>
        : <></>}
        {/* : <></>} */}
        </>
    )
}

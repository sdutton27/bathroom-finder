import React, { useContext, useEffect } from 'react'
import { NavContext } from '../../context/NavContext';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';

import { FeedbackForm } from '../../components/FeedbackForm/FeedbackForm';

import './about.css';


export default function About() {
  const {user} = useContext(UserContext);
  const { setCurrentPage } = useContext(NavContext)
  const navigate = useNavigate();
  if(Object.keys(user).length === 0) {
    navigate('/')
  }
  useEffect(() => {
    console.log(user);
  
    setCurrentPage('about');
  }, [])
  const theme = useTheme()
  return (
    <>
    {(Object.keys(user).length === 0) ? <></> : 
    <div className='page-container about-page' style={{ backgroundColor: theme.palette.background.default }}>
      <h1>About</h1>
{/* 
      <div className="letter-holder">
        <div className="l-1 letter">L</div>
        <div className="l-2 letter">o</div>
        <div className="l-3 letter">a</div>
        <div className="l-4 letter">d</div>
        <div className="l-5 letter">i</div>
        <div className="l-6 letter">n</div>
        <div className="l-7 letter">g</div>
        <div className="l-8 letter">.</div>
        <div className="l-9 letter">.</div>
        <div className="l-10 letter">.</div>
      </div> */}


      <FeedbackForm />

    </div>
  }
  </>
  )
}

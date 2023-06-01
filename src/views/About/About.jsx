import React, { useContext, useEffect } from 'react'
import { NavContext } from '../../context/NavContext';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import Rating from '@mui/material/Rating';

import { FeedbackForm } from '../../components/FeedbackForm/FeedbackForm';

import './about.css';

import { Card, Typography, Grid } from '@mui/material';

import { Image } from '@mui/icons-material';


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
    <div className='page-container about-page' align="center" style={{ backgroundColor: theme.palette.background.default, overflow:"scroll" }}>
      {/* <h1>About</h1> */}
      <Grid container alignItems="center" spacing={1} direction="column">
        <Grid item >
      <div className="letter-holder" style={{alignSelf:"center", paddingTop: "30vh", paddingBottom: "10vh"}}>
        <div className="l-1 letter">I</div>
        <div className="l-2 letter">t&nbsp;</div>
        
        {/* <div className="letter"> </div> */}
        <div className="l-3 letter">a</div>
        <div className="l-4 letter">l</div>
        <div className="l-5 letter">l&nbsp;</div>
        <div className="l-6 letter">s</div>
        <div className="l-7 letter">t</div>
        <div className="l-8 letter">a</div>
        <div className="l-9 letter">r</div>
        <div className="l-10 letter">t</div>
        <div className="l-11 letter">e</div>
        <div className="l-12 letter">d&nbsp;</div>
        <div className="l-13 letter">w</div>
        <div className="l-14 letter">i</div>
        <div className="l-15 letter">t</div>
        <div className="l-16 letter">h&nbsp;</div>
        <div className="l-17 letter">a&nbsp;</div>
        <div className="l-18 letter">G</div>
        <div className="l-19 letter">o</div>
        <div className="l-20 letter">o</div>
        <div className="l-21 letter">g</div>
        <div className="l-22 letter">l</div>
        <div className="l-23 letter">e&nbsp;</div>
        <div className="l-24 letter">R</div>
        <div className="l-25 letter">e</div>
        <div className="l-26 letter">v</div>
        <div className="l-27 letter">i</div>
        <div className="l-28 letter">e</div>
        <div className="l-29 letter">w</div>
      </div>
      </Grid>
      <Grid item>
      <img src={require("./bathroom-doors-gendered.jpeg")} style={{width: "70vw", marginBottom: "50px"}}/>
      </Grid>
      
      <Grid item >
      <Card  sx={{height: "260px", padding:"20px", width: "70vw"}}>
        <Typography>I’ve been lucky enough to spend the past few summers in the mountains, where I worked at a summer camp for transgender / nonbinary youth. One day a week, my coworkers and I would have off work, and we would cram into a car to explore the nearby towns. 

        On my first day off, I went to grab breakfast with some friends in the biggest town nearby. We stopped at a cafe and as we sat outside, drinking our coffees, one of my friends started to write up a Google review for the establishment. </Typography>
        <br/>
        <Rating name="half-rating"sx={{fontSize: "1rem", direction: "column"}}  value={1} precision={1} readOnly />
        <Typography sx={{fontStyle:'italic'}}>"Unnecessarily gendered bathrooms"</Typography>
      </Card>
      
      <Grid item >
      <Card  sx={{height: "250px", padding:"20px", width: "70vw"}}>
        <Typography>I had never actually witnessed anyone write up a Google review before (I thought the people who actually take the time to review things on Google were myths) but their reason for writing it stuck out. My friend, who identifies as non-binary, needed a place to use the bathroom and this establishment had decided that even though the bathrooms were single-stalls, they still needed gendering for whatever reason. We had spent a long time afterwards trying to find a gender-neutral bathroom in the town, which was proven even more difficult being in a Red state, where bathroom/other laws around transgender people are one of the most heated topics sadly up for debate.</Typography>
      </Card>
      </Grid>
      </Grid>
      <Grid item>
      <Card sx={{margin:"10px", padding:"30px", width: "50vw"}}>
        <Typography>
        While my friend was eventually able to find a bathroom (and actually received a reply to their Google review saying the cafe was going to take the signs down, which they did!), this story is incredibly common, and becoming increasingly more so. Everyone, regardless of gender, age, ability, or parental status, needs to use a bathroom sometimes, and needs to have safety when they do it.
        </Typography>
      </Card>
      </Grid>
      <Grid item>
      <Card sx={{margin:"10px", padding:"30px", width: "50vw"}}>
        <Typography sx={{fontSize:"45px"}}>
          Then came us.
         </Typography>
      </Card>
      </Grid>
      <Grid item>
      <Card sx={{margin:"10px", padding:"30px", width: "50vw"}}>
        <Typography sx={{fontSize:"23px"}}>
        The GNB-Finder is a way to locate restrooms near a location (on a route: coming soon).
        </Typography>
        <ul>
          <li>
          Recent search history (stores for up to a week)
          </li>
          <li>
          Favoriting
          </li>
          <li>
          Links to Google Maps
          </li>
          <li>
          Links to review bathrooms
          </li>
        </ul>
      </Card>
      </Grid>
      <Grid item>
      <Card sx={{margin:"10px", padding:"30px", width: "50vw"}}>
      <Typography>If you would like to add a bathroom to our database click here <a href="https://www.refugerestrooms.org/restrooms/new">(link)</a></Typography>
        <br></br>
        <Typography>
        Happy going!
        </Typography>
      </Card>
      </Grid>

      <br/>
      <Typography sx={{fontSize: "20px", fontStyle:"bold"}}>Feedback?</Typography>
      <FeedbackForm />
      
      </Grid>
    </div>

  }
  </>
  )
}

import React, { useContext, useState, useEffect } from 'react'

import { HeartButton } from '../HeartButton/HeartButton';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Card, Grid } from '@mui/material';
import Rating from '@mui/material/Rating';
import TransgenderIcon from '@mui/icons-material/Transgender';
import AccessibleIcon from '@mui/icons-material/Accessible';
import BabyChangingStationIcon from '@mui/icons-material/BabyChangingStation';

import { useTheme } from '@emotion/react';

// import ClickAwayListener from '@mui/material/ClickAwayListener';

import './recent-search-bathroom.css'

export default function RecentSearchBathroom({ bathroom, originName, originAddress}) {
  const theme = useTheme()
  const [open, setOpen] = useState(false);

  // useEffect(()=>{
  //   setOpen(accordionOpen)
  // },[accordionOpen])

  const handleClickAway = () => {
    console.log({open})
    setOpen(prev=>(!prev))
  };
  useEffect(()=>{
    setOpen(false)
  },[])
  return (
    <Card className="recent-search-card" sx={{ backgroundColor: "background.card", padding: "5px", marginBottom: "5px", width: "100%" }}>
      <Grid container sx={{ width: '100%' }}>
        <Grid container item justifyContent="center" xs={12}>
          <Grid item align="start" justifyContent="center" xs={6}>
            <Typography sx={{fontSize:"20px", fontWeight:500, padding:"0px 10px"}}>{bathroom.name}</Typography>
            {/* <img src={require("./google-maps.png")} style={{margin: "12.5px"}} alt="google maps icon" height="30px"/> */}
            {/* <a href={`https://www.google.com/maps?saddr=My+Location&daddr=${bathroom.name.replace(/ /g, '+') + "+" + bathroom.street.replace(/ /g, '+') + "+" + bathroom.city.replace(/ /g, '+') }`} target="_blank"><img src={require("./google-maps.png")} style={{margin: "12.5px"}} alt="google maps icon" height="30px"/></a> */}
          </Grid>
          <Grid item container direction="row" spacing={1} alignItems="center" justifyContent="flex-end" xs={6}>
            {/* {inFavorites(bathroom) ? 
                      <Favorite fontSize="large" sx={{margin: "10px"}} onClick={()=>{removeFromFavorites(bathroom)}}/>
                      :
                      <FavoriteBorder fontSize="large" onClick={()=>{addToFavorites(bathroom)}} />
                  } */}

            <Grid item>
              <a href={`https://www.google.com/maps?saddr=${originName.replace(/ /g, '+') + "+" + originAddress.replace(/ /g, '+')}&daddr=${bathroom.name.replace(/ /g, '+') + "+" + bathroom.street.replace(/ /g, '+') + "+" + bathroom.city.replace(/ /g, '+') }`} target="_blank">
                <img src={require("./google-maps.png")} style={{margin: "1px", filter: 'drop-shadow(0px 1px 1px #415f7c)'}} alt="google maps icon" height="22px"/></a>
              {/* <img src={require("./google-maps.png")} style={{
                margin: "1px",
              }}
                alt="google maps icon" height="22px" /> */}

            </Grid>

            <Grid item>
              <TransgenderIcon color={bathroom.unisex===true?"":"disabled"}/>
              {/* <TransgenderIcon /> */}
            </Grid>
            <Grid item>
              <AccessibleIcon color={bathroom.accessible===true?"":"disabled"}/>
              {/* <AccessibleIcon /> */}
            </Grid>
            <Grid item>
              {/* <BabyChangingStationIcon color={"disabled"} /> */}
              <BabyChangingStationIcon color={bathroom.changingTable===true?"":"disabled"}/>
            </Grid>
            <Grid item>
              <HeartButton bathroom={bathroom} size={32} sx={{ marginTop: "0px !important" }} />
            </Grid>
            <Grid item>
            {/* <ClickAwayListener onClickAway={handleClickAway}>  */}
              <ExpandMoreIcon onClick={handleClickAway} />
            {/* </ClickAwayListener> */}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Accordion expanded={open} sx={open ? {} : {height: 0}}>
              {/* <AccordionSummary
                // expandIcon="accordion-ic"
                aria-controls="panel3a-content"
                id="panel3a-header"
                sx={{height:0, direction:"column"}}
              >  */}
              <AccordionDetails>
              <Typography><b>Address:</b></Typography>
                    <Typography align="center" sx={{fontWeight:300}}>{bathroom.name}</Typography>
                    <Typography align="center" sx={{fontWeight:300}}>{bathroom.street}</Typography>
                    <Typography align="center" sx={{fontWeight:300}}>{bathroom.city}, {bathroom.country==="US"||bathroom.country==="USA"||bathroom.country==="United States"? bathroom.state : bathroom.country}</Typography>
                {bathroom.comment === null || bathroom.comment === "" ? <></>
                        : 
                        <>
                        <Typography >
                           <b> Info:</b>
                        </Typography>
                        <Typography sx={{fontWeight:300}}>
                        {bathroom.comment} 
                        </Typography>
                        </>
                }
                {bathroom.directions === null || bathroom.directions === "" ? <></>
                        : 
                        <>
                        <Typography >
                            <b>Directions:</b>
                        </Typography>
                        <Typography sx={{fontWeight:300}}>
                            {bathroom.directions}
                        </Typography>
                        </>}
                <Typography><b>Rating:</b></Typography>
                <Grid item align="center">
                <a href={`https://www.refugerestrooms.org/restrooms/${bathroom.id}`} target="_blank"><Rating name="half-rating"sx={{fontSize: "1.3rem"}} value={(bathroom.upvote /(bathroom.upvote + bathroom.downvote)) * 5} precision={.25} readOnly /></a>
                </Grid>
              
              </AccordionDetails>
                {/* <Typography><b>Address:</b></Typography>
                <Typography>(Address goes here)</Typography>
                <Typography><b>Info:</b></Typography>
                <Typography>(Info goes here)</Typography>
                <Typography><b>Directions:</b></Typography>
                <Typography>(Directions go here)</Typography> */}
              
              
              {/* </AccordionSummary> */}
              {/* <AccordionDetails>
                <Typography>Testing</Typography>
                </AccordionDetails> */}
              {/* <AccordionDetails>
                            {bathroom.comment === null || bathroom.comment === "" ? <></>
                        : 
                        <>
                        <Typography sx={{fontWeight:500}}>
                            Info:
                        </Typography>
                        <Typography sx={{fontWeight:300}}>
                        {bathroom.comment} 
                        </Typography>
                        <br></br>
                        </>
                        }
                        {bathroom.directions === null || bathroom.directions === "" ? <></>
                        : 
                        <>
                        <Typography sx={{fontWeight:500}}>
                            Directions:
                        </Typography>
                        <Typography sx={{fontWeight:300}}>
                            {bathroom.directions}
                        </Typography>
                        </>}
                        </AccordionDetails> */}
            </Accordion>
          </Grid>
        </Grid>
      </Grid>

      {/* <Grid container sx={{width: '100%'}}>
            <Grid item container direction="column" xs={10}>
                <Grid item align="center">
                    <Typography sx={{fontSize:20, fontWeight:500, paddingTop: "32px", paddingBottom:"4px", wordWrap: 'break-word', width: `${((cardWidth * 10 / 12) - 10)}px`}}>{bathroom.name}</Typography>
                    <Typography sx={{fontWeight: 300, wordWrap: 'break-word', width: `${((cardWidth * 10 / 12) - 10)}px`}}>{bathroom.street}</Typography>
                    <Typography sx={{fontWeight: 300, wordWrap: 'break-word', width: `${((cardWidth * 10 / 12) - 10)}px`}}>{bathroom.city}, {bathroom.country==="US"||bathroom.country==="USA"||bathroom.country==="United States"? bathroom.state : bathroom.country}</Typography>
                </Grid>
                <Grid item align="center">
                    <a href={`https://www.refugerestrooms.org/restrooms/${bathroom.id}`} target="_blank"><Rating name="half-rating"sx={{fontSize: "1rem", direction: "column"}} fontSize=".5rem" value={(bathroom.upvote /(bathroom.upvote + bathroom.downvote)) * 5} precision={.25} readOnly /></a>
                </Grid>
            </Grid>
            <Grid container item direction="column" xs={2} spacing={1} sx={{paddingTop: 1, paddingBottom:1}}>
                <Grid item>
                    <a href={`https://www.google.com/maps/dir/?api=1&origin=${originName.replace(/ /g, '+')}+${originAddress.replace(/ /g, '+')}&destination=${bathroom.name.replace(/ /g, '+') + "+" + bathroom.street.replace(/ /g, '+') + "+" + bathroom.city.replace(/ /g, '+') }`} target="_blank"><img src={require("./google-maps.png")} alt="google maps icon" height="22px"/></a>
                </Grid>
                <Grid item>
                    <TransgenderIcon color={bathroom.unisex===true?"":"disabled"}></TransgenderIcon>
                </Grid>
                <Grid item>
                    <AccessibleIcon color={bathroom.accessible===true?"":"disabled"}/>
                </Grid>
                <Grid item>
                    <BabyChangingStationIcon color={bathroom.changingTable===true?"":"disabled"}/>
                </Grid>
                <Grid item sx={{padding:"0px !important"}}>
                    <HeartButton bathroom={bathroom} size={28}/>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        sx={{height: 15}}
                        >
                        <Typography>More Info</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {bathroom.comment === null || bathroom.comment === "" ? <></>
                        : 
                        <>
                        <Typography sx={{fontWeight:500}}>
                            Info:
                        </Typography>
                        <Typography sx={{fontWeight:300}}>
                        {bathroom.comment}
                        </Typography>
                        <br></br>
                        </>
                        }
                        {bathroom.directions === null || bathroom.directions === "" ? <></>
                        : 
                        <>
                        <Typography sx={{fontWeight:500}}>
                            Directions:
                        </Typography>
                        <Typography sx={{fontWeight:300}}>
                            {bathroom.directions}
                        </Typography>
                        </>}
                        </AccordionDetails>
                    </Accordion>
                </Grid> 
        </Grid> */}

    </Card>
  )
}

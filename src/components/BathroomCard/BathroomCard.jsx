import React from 'react'


import { Card, Grid } from '@mui/material';
import Rating from '@mui/material/Rating';
import TransgenderIcon from '@mui/icons-material/Transgender';
import AccessibleIcon from '@mui/icons-material/Accessible';
import BabyChangingStationIcon from '@mui/icons-material/BabyChangingStation';
import { Favorite, FavoriteBorder } from '@mui/icons-material';

// import { Image } from '@mui/icons-material';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function BathroomCard({ name, index, cardWidth, 
                                id, street, state, city, country, directions, comment, 
                                rating, accessible, changingTable, unisex}) {
  return (
    <Card sx={{marginBottom:"5px", width: `${cardWidth}px`}}>
        <Grid container sx={{width: '100%'}}>
            <Grid item container direction="column" xs={10}>
                <Grid item sx={{position: "relative"}}>
                    <img src={require("./pinhead.png")} alt="pinhead icon" height="20px" style={{position: "absolute", margin: "5px 5px"}}/>
                    <Typography sx={{lineHeight: 1, position: "absolute", margin:"7px 9px"}}>{String.fromCharCode((index + 65))}</Typography>
                    {/* <Typography sx={{lineHeight: 1, paddingLeft: 1, paddingTop: 1}}>A</Typography> */}
                </Grid>
                <Grid item align="center">
                    <Typography sx={{fontSize:20, fontWeight:500, paddingTop: "32px", paddingBottom:"4px", wordWrap: 'break-word', width: `${((cardWidth * 10 / 12) - 10)}px`}}>{name}</Typography>
                    <Typography sx={{fontWeight: 300, wordWrap: 'break-word', width: `${((cardWidth * 10 / 12) - 10)}px`}}>{street}</Typography>
                    <Typography sx={{fontWeight: 300, wordWrap: 'break-word', width: `${((cardWidth * 10 / 12) - 10)}px`}}>{city}, {country==="US"||country==="USA"||country==="United States"? state : country}</Typography>
                </Grid>
                <Grid item align="center">
                    <a href={`https://www.refugerestrooms.org/restrooms/${id}`} target="_blank"><Rating name="half-rating"sx={{fontSize: "1rem", direction: "column"}} fontSize=".5rem" value={rating} precision={.25} readOnly /></a>
                </Grid>
            
                {/* <Grid item align="center">
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        sx={{height: 15}}
                        >
                        <Typography>Directions</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Grid> */}
            </Grid>
            <Grid container item direction="column" xs={2} spacing={1} sx={{paddingTop: 1, paddingBottom:1}}>
                <Grid item>
                    <img src={require("./google-maps.png")} alt="google maps icon" height="22px"/>
                </Grid>
                <Grid item>
                    <TransgenderIcon color={unisex===true?"":"disabled"}></TransgenderIcon>
                </Grid>
                <Grid item>
                    <AccessibleIcon color={accessible===true?"":"disabled"}/>
                </Grid>
                <Grid item>
                    <BabyChangingStationIcon color={changingTable===true?"":"disabled"}/>
                </Grid>
                <Grid item>
                    {/* <Favorite /> */}
                    <FavoriteBorder />
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
                            {comment === null || comment === "" ? <></>
                        : 
                        <>
                        <Typography sx={{fontWeight:500}}>
                            Info:
                        </Typography>
                        <Typography sx={{fontWeight:300}}>
                        {comment}
                        </Typography>
                        <br></br>
                        </>
                        }
                        {directions === null || directions === "" ? <></>
                        : 
                        <>
                        <Typography sx={{fontWeight:500}}>
                            Directions:
                        </Typography>
                        <Typography sx={{fontWeight:300}}>
                            {directions}
                        </Typography>
                        </>}
                        </AccordionDetails>
                    </Accordion>
                </Grid> 
        </Grid>
        
    </Card>
  )
}

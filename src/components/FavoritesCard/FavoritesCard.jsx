import React, { useContext } from 'react'


import { Card, Grid } from '@mui/material';
import Rating from '@mui/material/Rating';
import TransgenderIcon from '@mui/icons-material/Transgender';
import AccessibleIcon from '@mui/icons-material/Accessible';
import BabyChangingStationIcon from '@mui/icons-material/BabyChangingStation';
import { Favorite, FavoriteBorder } from '@mui/icons-material';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { FavoritesContext } from '../../context/FavoritesContext';

export default function FavoritesCard({bathroom}) {
    const {favorites, setFavorites, addToFavorites, removeFromFavorites, inFavorites} = useContext(FavoritesContext)                                                             
    
    // const cardWidth = 200

    return (
    <Card sx={{marginBottom:"5px", width: `80vw`}}>
        <Grid container sx={{width: '100%'}}>
            <Grid container item xs={12}>
                <Grid item align="start" xs={6}>
                        <a href={`https://www.google.com/maps?saddr=My+Location&daddr=${bathroom.name.replace(/ /g, '+') + "+" + bathroom.street.replace(/ /g, '+') + "+" + bathroom.city.replace(/ /g, '+') }`} target="_blank"><img src={require("./google-maps.png")} style={{margin: "12.5px"}} alt="google maps icon" height="30px"/></a>
                </Grid>
                <Grid item align="end" xs={6}>
                    {inFavorites(bathroom) ? 
                        <Favorite fontSize="large" sx={{margin: "10px"}} onClick={()=>{removeFromFavorites(bathroom)}}/>
                        :
                        <FavoriteBorder fontSize="large" onClick={()=>{addToFavorites(bathroom)}} />
                    }
                </Grid>
            </Grid>
            <Grid item align="center" xs={12}>
                <Typography sx={{fontSize:20, fontWeight:500, padding:"0px 20px", wordWrap: 'break-word'}}>{bathroom.name}</Typography>
                <Typography sx={{fontWeight: 300, wordWrap: 'break-word'}}>{bathroom.street}</Typography>
                <Typography sx={{fontWeight: 300, wordWrap: 'break-word'}}>{bathroom.city}, {bathroom.country==="US"||bathroom.country==="USA"||bathroom.country==="United States"? bathroom.state : bathroom.country}</Typography>
                <a href={`https://www.refugerestrooms.org/restrooms/${bathroom.id}`} target="_blank"><Rating name="half-rating"sx={{fontSize: 30}} value={(bathroom.upvote /(bathroom.upvote + bathroom.downvote)) * 5} precision={.25} readOnly /></a>
            </Grid>
            {/* <Grid item container align="center"xs={12}> */}
            <Grid item container direction="row" xs={12}>
                <Grid item align="end" xs={4}>
                    <TransgenderIcon fontSize="large" color={bathroom.unisex===true?"":"disabled"}></TransgenderIcon>
                </Grid>
                <Grid item align="center" xs={4}>
                    <AccessibleIcon fontSize="large" color={bathroom.accessible===true?"":"disabled"}/>
                </Grid>
                <Grid item align="start" xs={4}>
                    <BabyChangingStationIcon fontSize="large" color={bathroom.changingTable===true?"":"disabled"}/>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        sx={{height: 15}}
                        align="center"
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
            {/* </Grid> */}
            {/* <Grid item align="center">
                <a href={`https://www.refugerestrooms.org/restrooms/${bathroom.id}`} target="_blank"><Rating name="half-rating"sx={{fontSize: "1rem", direction: "column"}} fontSize=".5rem" value={(bathroom.upvote /(bathroom.upvote + bathroom.downvote)) * 5} precision={.25} readOnly /></a>
            </Grid> */}
            {/* <Grid item container direction="column" xs={10}>
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
                    <a href={`https://www.google.com/maps?saddr=My+Location&daddr=${bathroom.name.replace(/ /g, '+') + "+" + bathroom.street.replace(/ /g, '+') + "+" + bathroom.city.replace(/ /g, '+') }`} target="_blank"><img src={require("./google-maps.png")} alt="google maps icon" height="22px"/></a>
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
                <Grid item>
                    {inFavorites(bathroom) ? 
                    <Favorite onClick={()=>{removeFromFavorites(bathroom)}}/>
                    :
                    <FavoriteBorder onClick={()=>{addToFavorites(bathroom)}} />
                    }
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
                </Grid> */}
        </Grid>
        
    </Card>
  )
}

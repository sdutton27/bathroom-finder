import React, { useEffect, useContext } from 'react'


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

import { FavoritesContext } from '../../context/FavoritesContext';

import { HeartButton } from '../HeartButton/HeartButton';
import { RecentSearchContext } from '../../context/RecentSearchContext';

export default function BathroomCard({ bathroom, index, cardWidth,
                                selected, refProp, originName, originAddress}) {
    
    const {favorites, setFavorites, addToFavorites, removeFromFavorites, inFavorites} = useContext(FavoritesContext)                                

    const { addRecentSearchBathroom } = useContext(RecentSearchContext)
    // console.log(selected)
    // console.log("bathroom is: " + JSON.stringify(bathroom))
    // if a place is selected, move into that view 
    // if(selected === true) {
    //     // console.log({refProp})
    //     refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start"}) 

    //     console.log({refProp})

    //     addRecentSearchBathroom(bathroom)
    //     // console.log('should be scrolling')
    //     // setTimeout(function () {refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start"})}, 100)
    // }   
    
    useEffect(()=>{
        if (selected === true) {
            //refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start"}) 
            // refProp?.current?.scrollTop = 0;
            // console.log({refProp})
            //refProp?.current?.scroll({top:0,behavior:'smooth'})
            // console.log(refProp.current.offsetTop)
            const topPos = refProp?.current?.offsetTop 
            //document.getElementById('bathroom-list')?.scrollTop = topPos;
            document.getElementById('bathroom-list')?.scrollTo({top:topPos-118,behavior:'smooth'});
            // refProp?.current?.scrollTo({top:0,behavior:'smooth'})
            addRecentSearchBathroom(bathroom)
        }
    },[selected, refProp])
  
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
                    <Typography sx={{fontSize:20, fontWeight:500, paddingTop: "32px", paddingBottom:"4px", wordWrap: 'break-word', width: `${((cardWidth * 10 / 12) - 10)}px`}}>{bathroom.name}</Typography>
                    <Typography sx={{fontWeight: 300, wordWrap: 'break-word', width: `${((cardWidth * 10 / 12) - 10)}px`}}>{bathroom.street}</Typography>
                    <Typography sx={{fontWeight: 300, wordWrap: 'break-word', width: `${((cardWidth * 10 / 12) - 10)}px`}}>{bathroom.city}, {bathroom.country==="US"||bathroom.country==="USA"||bathroom.country==="United States"? bathroom.state : bathroom.country}</Typography>
                </Grid>
                <Grid item align="center">
                    <a href={`https://www.refugerestrooms.org/restrooms/${bathroom.id}`} target="_blank"><Rating name="half-rating"sx={{fontSize: "1rem", direction: "column"}} fontSize=".5rem" value={(bathroom.upvote /(bathroom.upvote + bathroom.downvote)) * 5} precision={.25} readOnly /></a>
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
                <Grid item sx={{padding:"0px !important", marginTop:"8px"}}>
                    {/* <Favorite /> */}
                    {/* {inFavorites(bathroom) ? 
                        <Favorite onClick={()=>{removeFromFavorites(bathroom)}}/>
                    :
                        <FavoriteBorder onClick={()=>{addToFavorites(bathroom)}} />
                    } */}
                    <HeartButton bathroom={bathroom} size={28}/>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon onClick={()=>{addRecentSearchBathroom(bathroom);}}/>}
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
        </Grid>
        
    </Card>
  )
}

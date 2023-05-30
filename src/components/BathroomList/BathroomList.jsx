import React, {useEffect, useState, createRef} from 'react'

import { Grid } from '@mui/material'
import BathroomCard from '../BathroomCard/BathroomCard'

export default function BathroomList({bathrooms, childClicked, originName, originAddress}) {
    // console.log({childClicked})
    const [refs, setRefs] = useState([])

    useEffect(()=>{
        // map each bathroom- we only need the index, so _ for first value
        const references = Array(bathrooms?.length).fill().map((_, i)=> refs[i] || createRef())
        setRefs(references)
    },[bathrooms])

  return (
    <Grid item sx={{height: '66vh', overflow:'scroll'}}>
              {/* <Typography align="center" sx={{color:'text.primary'}}>Search Results Here</Typography> */}
              {bathrooms?.map((bathroom, i)=>(
                // <Typography key={i}>{bathroom.name}</Typography>
                <Grid item key={i} ref={refs[i]}>
                    <BathroomCard cardWidth='186' key={i} index={i} 
                        // id={bathroom.id}
                        // name={bathroom.name} street={bathroom.street} 
                        // city={bathroom.city}
                        // state={bathroom.state} country={bathroom.country} 
                        // directions={bathroom.directions} comment={bathroom.comment} 
                        // rating={(bathroom.upvote /(bathroom.upvote + bathroom.downvote)) * 5} 
                        // accessible={bathroom.accessible} 
                        // changingTable={bathroom.changing_table} unisex={bathroom.unisex}
                        selected={Number(childClicked) === i}
                        refProp={refs[i]}
                        originName={originName}
                        originAddress={originAddress}
                        bathroom={bathroom}
                    />
                </Grid>
                
              ))}
            </Grid> 
  )
}

import React, {useEffect, useState, useContext, createRef} from 'react'

import { Grid } from '@mui/material'
import BathroomCard from '../BathroomCard/BathroomCard'
import { BathroomsContext } from '../../context/BathroomsContext'
import { RecentSearchContext } from '../../context/RecentSearchContext'

export default function BathroomList({genderNeutralFilter, accessibleFilter, changingTableFilter, childClicked, originName, originAddress}) {
    // console.log({childClicked})
    const [refs, setRefs] = useState([])

    const {bathrooms, setBathrooms, filteredBathrooms, setFilteredBathrooms} = useContext(BathroomsContext)
    const {getRecentSearches} = useContext(RecentSearchContext)
    // const [filteredBathrooms, setFilteredBathrooms] = useState([])

    useEffect(()=>{
        getRecentSearches();
    },[]) 

    useEffect(()=>{
        getFilteredBathrooms()
        // map each bathroom- we only need the index, so _ for first value
        if (filteredBathrooms.length > 0) {
            const references = Array(filteredBathrooms?.length).fill().map((_, i)=> refs[i] || createRef())
            setRefs(references)
            console.log({references})
        } else {
            const references = Array(bathrooms?.length).fill().map((_, i)=> refs[i] || createRef())
            setRefs(references)
        }
        
        // const references = Array(bathrooms?.length).fill().map((_, i)=> refs[i] || createRef())
        // setRefs(references)
        // console.log({genderNeutralFilter})
    },[bathrooms])

    // on dismount reset filtered bathrooms 
    useEffect( () => () => setFilteredBathrooms([]), [] );

    useEffect(()=>{
        getFilteredBathrooms()
        // console.log({bathrooms})
        // let newBathrooms = []
        // for (let i=0; i < bathrooms.length; i++) {
        //     // if (bathrooms[i].accessible === accessibleFilter 
        //     //     && bathrooms[i].changing_table === changingTableFilter
        //     //     && bathrooms[i].unisex === genderNeutralFilter){
        //     //         newBathrooms.push(bathrooms[i])
        //     // }
        //     if ((accessibleFilter === true && bathrooms[i].accessible === true || accessibleFilter == false)
        //         && (bathrooms[i].changing_table === true && changingTableFilter === true || changingTableFilter == false)
        //         && (bathrooms[i].unisex === true && genderNeutralFilter === true || genderNeutralFilter === false)
        //     ){
        //         newBathrooms.push(bathrooms[i])
        //     }
        // }
        // setFilteredBathrooms(newBathrooms)
        // console.log({newBathrooms})
    },[genderNeutralFilter, accessibleFilter, changingTableFilter])

    const getFilteredBathrooms = () => {
        let newBathrooms = []
        for (let i=0; i < bathrooms.length; i++) {
            // if (bathrooms[i].accessible === accessibleFilter 
            //     && bathrooms[i].changing_table === changingTableFilter
            //     && bathrooms[i].unisex === genderNeutralFilter){
            //         newBathrooms.push(bathrooms[i])
            // }
            if ((accessibleFilter === true && bathrooms[i].accessible === true || accessibleFilter == false)
                && (bathrooms[i].changing_table === true && changingTableFilter === true || changingTableFilter == false)
                && (bathrooms[i].unisex === true && genderNeutralFilter === true || genderNeutralFilter === false)
            ){
                newBathrooms.push(bathrooms[i])
            }
        }
        setFilteredBathrooms(newBathrooms)
    }

  return (
    <Grid id="bathroom-list" container item alignItems="flex-start" justifyContent="center" sx={{maxHeight: '77vh', overflow:'scroll'}}>
              {/* <Typography align="center" sx={{color:'text.primary'}}>Search Results Here</Typography> */}
              
              {filteredBathrooms !==[]?
                filteredBathrooms?.map((bathroom, i)=>(
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
                    
                  ))

               :
               bathrooms?.map((bathroom, i)=>(
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
                
              ))
               }
              {/* {bathrooms?.map((bathroom, i)=>(
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
                
              ))} */}
            </Grid> 
  )
}

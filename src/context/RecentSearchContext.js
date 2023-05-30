import { createContext, useContext, useState } from 'react';
import { UserContext } from './UserContext';
import { FavoritesContext } from './FavoritesContext';

export const RecentSearchContext = createContext();

const RecentSearchContextProvider = ({children}) => {

    const [recentSearches, setRecentSearches] = useState([])
    const {user} = useContext(UserContext)
    const { inFavorites, addBathroom } = useContext(FavoritesContext)
    const [currentSearchID, setCurrentSearchID] = useState("")

    const addRecentSearchLoc = async (originName, originAddress, searchLocBase64="", destinationName="", destinationAddress="") => {
        // let url;
        // if (destinationName !== "") { 
        //     url = `http://127.0.0.1:5000/api/recent-search/location/${originName}/${originAddress}/${destinationName}/${destinationAddress}`;
        // } else {
        //     url = `http://127.0.0.1:5000/api/recent-search/location/${originName}/${originAddress}`;
        // }
        const url = "http://127.0.0.1:5000/api/recent-search/location"
        const options = {
            // mode: 'no-cors',
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${user.apitoken}`
            },
            body: JSON.stringify({
                "origin_name" : originName,
                "origin_address" : originAddress,
                "photo_base_64" : searchLocBase64,
                "destination_name" : destinationName,
                "destination_address" : destinationAddress,
            })
        };

        const res = await fetch(url, options);
        const data = await res.json();
        // console.log(data)
        // console.log("search id : ")
        // console.log(data.data.search_id)
        setCurrentSearchID(data.data.search_id)
        setRecentSearches((prev)=>{
            return [
              {
                "origin_name" : originName,
                "origin_address" : originAddress,
                "photo_base_64" : searchLocBase64,
                "destination_name" : "", // someday this will not be null
                "destination_address" : "", // someday this will not be null
                "search_id" : data.data.search_id,
                "bathrooms" : []
              },
              ...prev,
            ]
          })

        return data
    }

    const addRecentSearchBathroom = async (bathroom) => {
        let bathroomID = "";
        if (inFavorites(bathroom)) {
            // then we know the bathroom exists in the DB so we can just use the ID
            bathroomID = bathroom.id
        } else {
            const bathroomData = await addBathroom(bathroom)
            // if the bathroom is in the database
            if ((bathroomData.status === 'not ok' && bathroomData.message === 'That bathroom is already in the database.')
                || (bathroomData.status === 'ok')) {
                // use the ID
                bathroomID = bathroom.id 
            } 
        }
        // now that the bathroom should be in the DB
        if (bathroomID !== "") {
            const url = "http://127.0.0.1:5000/api/recent-search/bathroom"
            const options = {
                // mode: 'no-cors',
                method: "POST",
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${user.apitoken}`
                },
                body: JSON.stringify({
                    "search_id" : currentSearchID,
                    'bathroom_id' : bathroomID
                })
            };

            const res = await fetch(url, options);
            const data = await res.json();
            console.log(data)

            if (data.status === 'ok') { 
                // copy all the other recentSearches, get the length and in the last item, add bathrooms
                // const last_index = recentSearches.length - 1
                // prev[last_index]['bathroom_ids'].append(bathroomID)
                // setRecentSearches((prev)=>({
                //     // console.log(prev)
                //     // console.log(prev.length)
                //     ...prev,
                //     // if (bathroom_ids) {
                //     //     bathroom_ids.append(bathroomID)
                //     // } else {
                //     //     bathroom_ids = bathroomID
                //     // }
                //      // if (prev[prev.length - 1]['bathroom_ids']) {
                //     //     prev[prev.length - 1]['bathroom_ids'].append(bathroomID)
                //     // } else {
                //     //     prev[prev.length - 1]['bathroom_ids'] = [bathroomID]
                //     // }
                // }))

                const newList = recentSearches.map((searchedPlace)=>{
                    if (searchedPlace.search_id === currentSearchID) {
                        // if (searchedPlace.bathrooms.length > 0) {

                        
                            const updatedSearchedPlace = {
                                ...searchedPlace,
                                //bathroom
                                bathrooms: [
                                    // [
                                        bathroom,
                                        //data.data.bathroom, // add the bathroom info
                                        ...searchedPlace.bathrooms,
        
                                    // ]
                                ]
                            }
                            return updatedSearchedPlace
                        // } else {
                        //     const updatedSearchedPlace = {
                        //         ...searchedPlace,
                        //         //bathroom
                        //         bathrooms: [
                        //             [
                        //                 ...searchedPlace.bathrooms[0],
                        //                 bathroomID
                        //             ]
                        //         ]
                        //     }
                        //     return updatedSearchedPlace
                        // }
                    }
                    return searchedPlace
                })
                console.log(newList)
                setRecentSearches(newList);

            }
            // console.log(recentSearches)
            return data
        }
    }

    const recentSearchContext = {
        recentSearches, setRecentSearches, addRecentSearchLoc, currentSearchID, 
        setCurrentSearchID, addRecentSearchBathroom,
    }

    return (
        <RecentSearchContext.Provider value={recentSearchContext}>
            {children}
        </RecentSearchContext.Provider>
    )
}
export default RecentSearchContextProvider
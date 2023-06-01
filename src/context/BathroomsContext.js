import { createContext, useContext, useState } from 'react';

export const BathroomsContext = createContext();

const BathroomsContextProvider = ({children}) => {
    const [bathrooms, setBathrooms] = useState([])
    const [filteredBathrooms, setFilteredBathrooms] = useState([])

    const bathroomsContext = {
        bathrooms, setBathrooms, filteredBathrooms, setFilteredBathrooms
    }

    return (
        <BathroomsContext.Provider value={bathroomsContext}>
            {children}
        </BathroomsContext.Provider>
    )
}
export default BathroomsContextProvider
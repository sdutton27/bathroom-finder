import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

const getUserFromLocalStorage = () => {
    const found = localStorage.getItem('user_bathroom_finder')
    if (found) {
      return JSON.parse(found)
    }
    return {}
  }

const UserContextProvider = ({children}) => {
    const navigate = useNavigate();
    //const [user, setUser] = useState({})
    const [user, setUser] = useState(getUserFromLocalStorage)
    
    const [showHomepage, setShowHomepage] = useState('invisible-home-page')
    const [userUnlocked, setUserUnlocked] = useState('locked')

    const logMeIn = (user) => {
        setUser(user)
        localStorage.setItem('user_bathroom_finder', JSON.stringify(user))
    }

    const logMeOut = () => {
        setUser({})
        localStorage.removeItem('user_bathroom_finder')
        setShowHomepage('invisible-home-page')
        console.log(showHomepage)
        setUserUnlocked('locked')
        navigate('/')
    }

    // const userCtx = {
    //     user: user,
    //     setUser: setUser, 
    //     logMeIn: logMeIn,
    //     logMeOut, logMeOut,
    // }

    const userContext = {
        user, setUser, logMeIn, logMeOut, showHomepage, setShowHomepage, userUnlocked, setUserUnlocked,
    }

    return (
        <>
        {/* <UserContext.Provider value={[user, setUser]}> */}
        <UserContext.Provider value={userContext}>
        {/* <UserContext.Provider value={user}> */}
            { children }
        </UserContext.Provider>
        </>
    )

} 
export default UserContextProvider
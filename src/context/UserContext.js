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
    
    const logMeIn = (user) => {
        setUser(user)
        localStorage.setItem('user_bathroom_finder', JSON.stringify(user))
    }

    const logMeOut = () => {
        setUser({})
        localStorage.removeItem('user_bathroom_finder')
        navigate('/')
    }

    // const userCtx = {
    //     user: user,
    //     setUser: setUser, 
    //     logMeIn: logMeIn,
    //     logMeOut, logMeOut,
    // }

    const userCtx = {
        user, setUser, logMeIn, logMeOut,
    }

    return (
        <>
        {/* <UserContext.Provider value={[user, setUser]}> */}
        <UserContext.Provider value={userCtx}>
        {/* <UserContext.Provider value={user}> */}
            { children }
        </UserContext.Provider>
        </>
    )

} 
export default UserContextProvider
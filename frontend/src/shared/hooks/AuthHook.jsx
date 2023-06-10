import React, { useState, useEffect, useCallback } from 'react';

let logoutTimer;

const useAuth = () => {
    const [loggedInUser, setLoggedInUser] = useState()
    const [tokenExpirationDate, setTokenExpirationDate] = useState()
    const [token, setToken] = useState()
  
    const login = useCallback((user, token, expirationDate) => {
      setLoggedInUser(user)
      const tokenExpirationDate = new Date(new Date().getTime() + 1000 * 60 * 60)
      setTokenExpirationDate(tokenExpirationDate)
      localStorage.setItem('userData', JSON.stringify({
        user: user,
        token: token,
        expiration: expirationDate || tokenExpirationDate.toISOString()
      }))
      setToken(token)
    }, [])
    
    const logout = useCallback(() => {
      setLoggedInUser(null)
      setToken(null)
      setTokenExpirationDate(null)
      localStorage.removeItem('userData')
    }, [])
  
    useEffect(() => {
      const storedData = JSON.parse(localStorage.getItem('userData'))
      if (storedData && storedData.token && new Date(storedData.expiration) > new Date() ) {
        login(storedData.user, storedData.token, new Date(storedData.expiration))
      }
    }, [login]);
  
    useEffect(() => {
      if (token && tokenExpirationDate) {
        const remainingTime = tokenExpirationDate.getTime() - new Date().getTime()
        logoutTimer = setTimeout(logout, remainingTime);
      } else {
        clearTimeout(logoutTimer)
      }
    }, [token, logout, tokenExpirationDate]);
  

  return (
    {
        loggedInUser, token, login, logout
    }
  )
}

export default useAuth
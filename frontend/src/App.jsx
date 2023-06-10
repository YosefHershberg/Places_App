import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainNavigation from './shared/components/navigation/MainNavigation';
import LoadingSpinner from './shared/components/UIElemets/LoadingSpinner';
import { AuthContext } from './shared/context/auth-context';
import useAuth from './shared/hooks/AuthHook';

const Users = React.lazy(() => import('./user/pages/Users'))
const NewPlace = React.lazy(() => import('./places/pages/NewPlace'))
const UserPlaces = React.lazy(() => import('./places/pages/UserPlaces'))
const UpdatePlace = React.lazy(() => import('./places/pages/UpdatePlace'))
const Auth = React.lazy(() => import('./user/pages/Auth'))
const Signup = React.lazy(() => import('./user/pages/Signup'))
const Login = React.lazy(() => import('./user/pages/Login'))

function App() {
  const { loggedInUser, token, login, logout } = useAuth()

  return (
    <AuthContext.Provider value={{ loggedInUser, token, login, logout }}>
      <MainNavigation />
      <main>
        <Suspense fallback={
          <div className='center'>
            <LoadingSpinner />
          </div>
        }>
          <Routes>
            <Route path='/' element={<Users />} />
            <Route path='/places'>
              <Route path='new' element={<NewPlace />} />
              <Route path=':placeId' element={<UpdatePlace />} />
            </Route>
            <Route path='/:userId/places' element={<UserPlaces />} />
            <Route path='/auth'>
              <Route index element={<Auth />} />
              <Route path='login' element={<Login />} />
              <Route path='signup' element={<Signup />} />
            </Route>
            <Route path='*' element={<h1>404</h1>} />
          </Routes>
        </Suspense>
      </main>
    </AuthContext.Provider>
  )
}

export default App
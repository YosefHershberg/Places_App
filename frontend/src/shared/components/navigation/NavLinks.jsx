import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../context/auth-context'
import './NavLinks.css'

function NavLinks() {
  const { logout, loggedInUser } = useContext(AuthContext)

  return (
    <ul className='nav-links'>
      <li>
        <NavLink to='/' exact='true' >All Users</NavLink>
      </li>
      {loggedInUser &&
        <>
          <li>
            <NavLink to={`/${loggedInUser.id}/places`}>My Places</NavLink>
          </li>
          <li>
            <NavLink to='/places/new'>Add Place</NavLink>
          </li>
        </>
      }
      <li>
        {!loggedInUser ? <NavLink to='/auth'>Authenticate</NavLink>
          :
          <NavLink to='/'>
            <span onClick={logout}>Sign-Out</span>
          </NavLink>
        }
      </li>
    </ul>
  )
}

export default NavLinks
import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <div>
      <ul>
        <li><NavLink to={"/add"}>Add</NavLink></li>
      </ul>
    </div>
  )
}

export default Header
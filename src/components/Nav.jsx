import React from 'react'
import { Link } from 'react-router-dom'
const Nav = () => {
  return (
    <div>
        <div className='nav'>
            <Link to={"/main"}>Main</Link>
            <Link to={"/main2"}>Main2</Link>
            <Link to={"/about"}>About</Link>
        </div>
    </div>
  )
}

export default Nav
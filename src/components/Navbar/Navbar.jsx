import React from 'react'
import './navbar.css'

import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div id='nav'>
      <Link to='/' className='linkitem'> Home </Link>
      <Link to='/about' className='linkitem'>About </Link>
      <Link to='/blogs' className='linkitem'>Blogs </Link>
      <Link to='/contacts' className='linkitem'> Contacts </Link>
      <Link to='/register' className='linkitem'> Register </Link>
      <Link to='/login' className='linkitem'> Login </Link>

    </div>
  )
}

export default Navbar
import React from 'react'
import Cookies from "js-cookie"
import { useNavigate } from 'react-router-dom'
import "./Header.css"
import { toast } from 'react-toastify'

const Header = () => {
  const navigate = useNavigate()

  const onClickLogout = () => {
    Cookies.remove("jwtToken")
    toast.success("LoggedOut Successfully......")
    navigate("/login")
  }
  return (
    <div className='header-container'>
      <h1>Brewery App</h1>
      <button onClick={onClickLogout}>Logout</button>
    </div>
  )
}

export default Header
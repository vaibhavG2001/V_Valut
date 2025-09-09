import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'




export default function Navbar() {



  let styleMe = ({ isActive }) => {
    return {
      color: isActive ? "cyan" : "white",
      textDecoration: isActive ? "underline" : "none"
    }
  }



  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark ">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/" style={{color:"cyan"}}>V_VaulT</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">


              <li className="nav-item mx-4">
                <NavLink style={styleMe} className="nav active" to="/registration">Registration</NavLink>
              </li>

              <li className="nav-item mx-4">
                <NavLink style={styleMe} className="nav active" to="/login">Login</NavLink>
              </li>


              <li className="nav-item mx-4">
                <NavLink style={styleMe} className="nav active" to="/admin">Admin Pannel</NavLink>
              </li>



            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

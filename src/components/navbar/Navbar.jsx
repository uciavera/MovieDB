import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MainLogo from "../source/mainLogo.png";
import Login from '../modal/login'
import './navbar.css'



export default class Navbar extends Component {
    
      
    render() {
        return (
            <div className="nav-bar">
                <div className="imgLogoNavbar">
                        
                        <div className="imgCard">
                        <Link to="/">
                        <img  src={MainLogo} alt="fireSpot"/>
                        </Link>
                        </div>
                        <h4>Glints21</h4>
                    </div>
                
                <div className="nav-barRight">
                <input placeholder="search movie"/>
                <Login/>
                </div>
                
            </div>
        )
    }
}


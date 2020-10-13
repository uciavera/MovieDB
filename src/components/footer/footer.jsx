import React, { Component } from 'react';

import { FaPinterestSquare, FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";


import MainLogo from "../source/mainLogo.png";
import AppStore from '../source/appStore.png';
import GooglePlay from '../source/googlePlay.png';
import { Link } from 'react-router-dom';
import "./footer.css";

export default class footer extends Component {
    render() {
        return (
            <div className="containerfooter">
                <div className="top">
                    <div className="left">
                        <div className="imgLogo">

                            <div className="imgCard">
                                <Link to="/">
                                    <img src={MainLogo} alt="fireSpot" />
                                </Link>
                            </div>
                            <h4>Glints21</h4>
                        </div>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor aliquam laboriosam ipsa vel veniam ad eaque molestias sapiente, iure commodi cum libero optio placeat perspiciatis exercitationem fuga, omnis quam enim.</p>
                    </div>
                    <div className="center-footer">
                        <ol>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/about">About Us</Link>
                            </li>
                            <li>
                                <Link to="/blog">Blog</Link>
                            </li>
                            <li>
                                <Link to="/service">Services</Link>
                            </li>
                            <li>
                                <Link to="/career">Career</Link>
                            </li>
                            <li>
                                <Link to="/media">Media Center</Link>
                            </li>
                        </ol>
                    </div>
                    <div className="right">
                        <h4>Download</h4>
                        <div className='imgDownload'>
                            <a href="https://www.apple.com/app-store/">
                            <img  src={AppStore} alt="fireSpot" />
                            </a>
                            <a href="https://play.google.com/store">
                            <img  src={GooglePlay} alt="fireSpot" />
                            </a>
                        
                        </div>
                               
                            

                        <h4>Social Media</h4>
                        <div >
                            <a className="icon" href="/"><FaFacebookSquare /></a>
                            <a className="icon" href="/"><FaPinterestSquare /></a>
                            <a className="icon" href="/"><FaInstagramSquare /></a>
                        </div>

                    </div>
                </div>
                <hr className="mt-5" style={{ borderTop: "1px solid #5a606b" }}></hr>
                <div className="bottom">
                    <p className="cr">Copyright © 2000-2020 Glints21.  All Rights Reserved</p>
                </div>

            </div>
        )
    }
}

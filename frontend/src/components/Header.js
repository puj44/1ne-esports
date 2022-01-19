import React from 'react'
import headerImage from "../assets/header.png";
import logo from "../assets/logo1.png";

import '../css/Headerimg.css';
import Button from '@mui/material/Button';
import '../fonts/style.css';
export default function Header(){
    return (
        <div>
            
            <div className="image">
                <img src={headerImage}>
                </img> 
            </div> 
            
            <div className="logo">
                <img src={logo}></img>
            </div>
            <div className="tab">
                <div className="inlinetab" font-family="Bourgeois">1<span style={{'color':'yellow'}}>N</span>E EVENTS</div>
                <div className="inlinetab">ASIA <span style={{'color':'yellow'}}>POWER</span> RANKINGS</div>
                <div className="inlinetab">PLAYER <span style={{'color':'yellow'}}>BIO'S</span></div>
                <div className="inlinetab">TEAM <span style={{'color':'yellow'}}>BIO'S</span></div>
                <div className="inlinetab" font-family="Bourgeois">COMMUNITY <span style={{'color':'yellow'}}>GAME</span> NIGHT</div>
                <div className="inlinetab"><button className="font" style={{'background-color':'transparent'}} onClick={{Header}}>ABOUT 1<span style={{'color':'yellow'}}>N</span>E</button></div>
            </div>
            
        </div>
    )
}


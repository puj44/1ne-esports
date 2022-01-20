import React from 'react'
import headerImage from "../assets/header.png";
import logo from "../assets/logo.png";
import '../css/Headerimg.css';
import '../fonts/style.css';
export default function Header(){
    return (
        <div style={{'height': 'auto'}}>
            
            <div className="image">
                <img src={headerImage} style={{'height':'auto'}}>
                </img> 
            </div> 
            
            <div className="logo" >
                <img src={logo} ></img>
            </div>
            <div className="tab">
                <div className="inlinetab"><button onClick={{Header}}>1<span style={{'color':'yellow'}}>N</span>E EVENTS</button></div>
                <div className="inlinetab"><button onClick={{Header}}>ASIA <span style={{'color':'yellow'}}>POWER</span> RANKINGS</button></div>
                <div className="inlinetab"><button onClick={{Header}}>PLAYER <span style={{'color':'yellow'}}>BIO'S</span></button></div>
                <div className="inlinetab"><button onClick={{Header}}>TEAM <span style={{'color':'yellow'}}>BIO'S</span></button></div>
                <div className="inlinetab" ><button onClick={{Header}}>COMMUNITY <span style={{'color':'yellow'}}>GAME</span> NIGHT</button></div>
                <div className="inlinetab"><button onClick={{Header}}>ABOUT 1<span style={{'color':'yellow'}}>N</span>E</button></div>
            </div>
            
        </div>
    )
}


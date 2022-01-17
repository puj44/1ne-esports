import React from 'react'
import headerImage from "../assets/header.png";
import logo from "../assets/logo1.png";
import events from "../assets/tab1.PNG";
import asiapwr from "../assets/tab2.JPG";
import player from "../assets/tab3.png";
import team from "../assets/tab4.PNG";
import comm from "../assets/tab5.PNG";
import about from "../assets/tab6.jpg";
import '../css/Headerimg.css';
import Button from '@mui/material/Button';
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
                <div className="inlinetab"><Button><img src={events}></img></Button></div>
                <div className="inlinetab"><Button><img src={asiapwr}></img></Button></div>
                <div className="inlinetab"><Button><img src={player}></img></Button></div>
                <div className="inlinetab"><Button><img src={team}></img></Button></div>
                <div className="inlinetab"><Button><img src={comm}></img></Button></div>
                <div className="inlinetab"><Button><img src={about}></img></Button></div>
            </div>
            
        </div>
    )
}


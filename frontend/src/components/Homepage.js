import React from 'react'
import backgroundImg from "../assets/background.png";
import '../css/Homepage.css';
export default function Homepage() {
    return (
        <div ClassName="homepage">
            <img src={backgroundImg} style={{'margin-top':'2.5%'}} width="100%" height="100%"></img>
        </div>
    )
}

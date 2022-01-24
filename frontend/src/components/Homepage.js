import React from 'react'
import backgroundImg from "../assets/background.png";
export default function Homepage() {
    return (
        <div>
            <img src={backgroundImg} width="100%" height="100%" style={{'zIndex':'2','marginTop':'2%'}}></img>
        </div>
    )
}

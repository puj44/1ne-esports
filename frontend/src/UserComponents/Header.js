import React,{ useEffect, useState } from 'react'
import logo from "../assets/logo.png";
import '../css/Headerimg.css';
//import axios from 'axios';
import '../fonts/style.css';
import {Link} from 'react-router-dom';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';
export default function Header(){

    

    const [user,setUser]=useState(0);
    
        useEffect(()=>{
    //         (async ()=>{
	// 	axios({
	// 		method:'GET',
	// 		url:'https://esports-1ne.herokuapp.com/auth/getstatus',
	// 		withCredentials:true,
    //         headers: {
    //             'Access-Control-Allow-Origin' : '*',
    //             'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',   
    //         }
	// 	}).then((response)=>{
	// 		setUser(response.data.user);
	// 	}).catch((error)=>{
	// 		console.log(error);
	// 	})
    // })();
    (async ()=>{
        let response = () => {
          return new Promise(function(resolve, reject) {
            fetch('https://esports-1ne.herokuapp.com/auth/getstatus', {
                withCredentials:true,
            }).then(response => {
              resolve(response);
            });
          });
        };
        let responseData = await response();
        console.log(responseData.status);
        if(responseData.status === 200) 
            setUser(1);
        

      })();
	},[]);
    console.log(user);
    if(window.location.pathname ==='/admin' || user===1){

        return null;
    }
    else{
    return (
        <div>
            <div className="position-relative">
            <div style={{'borderBottom':'3px solid #fff'}} className="fixed-top">
                        <Navbar bg="black" variant="dark" expand="lg" sticky="top"  >
                        <a className='navbar-brand' href='/'><img src={logo} alt="logo" /></a>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav" >
                                <Nav className="ms-auto fonts " >
                                        <Link className='nav-link inlinetab' aria-current='page' to='/events'>
                                            1<span style={{'color':'yellow'}}>N</span>E EVENTS
                                        </Link>
                                        <Link className='nav-link inlinetab' aria-current='page' to='/rankings'>
                                            ASIA <span style={{'color':'yellow'}}>POWER</span> RANKINGS
                                        </Link>
                                        <Link className='nav-link inlinetab' aria-current='page' to='/playersbio'>
                                            PLAYER <span style={{'color':'yellow'}}>BIO'S</span>
                                        </Link>
                                        <Link className='nav-link inlinetab' aria-current='page' to='/teamsbio'>
                                            TEAM <span style={{'color':'yellow'}}>BIO'S</span>
                                        </Link>
                                        <Link className='nav-link inlinetab' aria-current='page' to='/community'>
                                            COMMUNITY <span style={{'color':'yellow'}}>GAME</span> NIGHT
                                        </Link>
                                        <Link className='nav-link inlinetab' aria-current='page' to='/about'>
                                            ABOUT 1<span style={{'color':'yellow'}}>N</span>E
                                        </Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                        
            </div>
            </div>
        </div>
    );
    }
}


import React from 'react'
import logo from "../assets/logo.png";
import '../css/Headerimg.css';
import '../fonts/style.css';
import {Link} from 'react-router-dom';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';
export default function Header(){
    if(window.location.pathname ==='/admin/' || window.location.pathname === '/admin/dashboard/'){
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


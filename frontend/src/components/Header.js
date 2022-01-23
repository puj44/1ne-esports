import React from 'react'
import logo from "../assets/logo.png";
import '../css/Headerimg.css';
import '../fonts/style.css';
import {Link} from 'react-router-dom';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
export default function Header(){
    return (
        // <nav className='navbar navbar-expand-lg navbar-dark' style={{'backgroundColor':'black'}} fixed="top">
        //         <div className='container-fluid'>
                    
        //             <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarToggler' aria-controls='navbarToggler' aria-expanded='false' aria-label='Toggle navigation'>
        //                 <span className='navbar-toggler-icon'></span>
        //             </button>
        //             <div className='collapse navbar-collapse' id='navbarToggler' >
        //             <a className='navbar-brand' href='/'><img src={logo} className="logo"/></a>
        //                 <div className='ms-auto p-2 bd-highlight pull-left' >
        //                     <ul className='navbar-nav mb-2 mb-lg-0 pull-left' >
        //                             <li className='nav-item' style={{'fontSize':'33px','fontFamily': 'bourgeois'}} >
        //                                 <Link className='nav-link inlinetab' aria-current='page' to='/events'>
        //                                     1<span style={{'color':'yellow'}}>N</span>E EVENTS
        //                                 </Link>
        //                                 <Link className='nav-link inlinetab' aria-current='page' to='/rankings'>
        //                                     ASIA <span style={{'color':'yellow'}}>POWER</span> RANKINGS
        //                                 </Link>
        //                                 <Link className='nav-link inlinetab' aria-current='page' to='/palyersbio'>
        //                                     PLAYER <span style={{'color':'yellow'}}>BIO'S</span>
        //                                 </Link>
        //                                 <Link className='nav-link inlinetab' aria-current='page' to='/teamsbio'>
        //                                     TEAM <span style={{'color':'yellow'}}>BIO'S</span>
        //                                 </Link>
        //                                 <Link className='nav-link inlinetab' aria-current='page' to='/community'>
        //                                     COMMUNITY <span style={{'color':'yellow'}}>GAME</span> NIGHT
        //                                 </Link>
        //                                 <Link className='nav-link inlinetab' aria-current='page' to='/about'>
        //                                     ABOUT 1<span style={{'color':'yellow'}}>N</span>E
        //                                 </Link>

        //                             </li>
        //                     </ul>
        //                 </div>
        //             </div>
        //         </div>
        //     </nav>
            <div>
            <div className="row">
                <div className="col-md-12">
                    
                        <Navbar bg="black" variant="dark" expand="lg" sticky="top">
                        <a className='navbar-brand' href='/'><img src={logo} /></a>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="ms-auto" style={{'fontSize':'30px','fontFamily': 'bourgeois'}}>
                                        <Nav.Link className='nav-link inlinetab' aria-current='page' to='/events'>
                                            1<span style={{'color':'yellow'}}>N</span>E EVENTS
                                        </Nav.Link>
                                        <Nav.Link className='nav-link inlinetab' aria-current='page' to='/rankings'>
                                            ASIA <span style={{'color':'yellow'}}>POWER</span> RANKINGS
                                        </Nav.Link>
                                        <Nav.Link className='nav-link inlinetab' aria-current='page' to='/palyersbio'>
                                            PLAYER <span style={{'color':'yellow'}}>BIO'S</span>
                                        </Nav.Link>
                                        <Nav.Link className='nav-link inlinetab' aria-current='page' to='/teamsbio'>
                                            TEAM <span style={{'color':'yellow'}}>BIO'S</span>
                                        </Nav.Link>
                                        <Nav.Link className='nav-link inlinetab' aria-current='page' to='/community'>
                                            COMMUNITY <span style={{'color':'yellow'}}>GAME</span> NIGHT
                                        </Nav.Link>
                                        <Nav.Link className='nav-link inlinetab' aria-current='page' to='/about'>
                                            ABOUT 1<span style={{'color':'yellow'}}>N</span>E
                                        </Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                        <br />
                        
                </div>
            </div>
            </div>
    )
}


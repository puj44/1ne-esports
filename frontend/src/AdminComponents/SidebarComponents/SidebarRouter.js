import React from 'react'
import {Routes, Route } from 'react-router-dom';
// import Sidebar from './Sidebar'
import SidebarEvents from './SidebarEvents'
import SidebarRankings from './SidebarRankings'
import SidebarPlayers from './SidebarPlayers'
import SidebarComunityGameNight from './SidebarComunityGameNight'

export default function SidebarRouter() {
  return (
    <div>
      <Routes>
      
        <Route path="/" exact element={<SidebarEvents/>}/>
        <Route path="/events" exact element={<SidebarEvents/>}/>
        <Route path="/rankings" exact element={<SidebarRankings/>}/> 
        <Route path="/players" exact element={<SidebarPlayers/>}/> 
        
        <Route path="/game-night" exact element={<SidebarComunityGameNight/>}/> 
        
      </Routes>
    </div>
  );
}

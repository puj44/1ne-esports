import React from 'react'
import {Routes, Route } from 'react-router-dom';
// import Sidebar from './Sidebar'
import SidebarEvents from './SidebarEvents'
import SidebarRankings from './SidebarRankings'
import SidebarTeams from './SidebarTeams'
import SidebarPlayers from './SidebarPlayers'
import SidebarComunityGameNight from './SidebarComunityGameNight'

export default function SidebarRouter() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SidebarEvents/>}/>
        <Route path="/events"  element={<SidebarEvents/>}/>
        <Route path="/rankings" element={<SidebarRankings/>}/> 
        <Route path="/players" element={<SidebarPlayers/>}/> 
        <Route path="/teams" element={<SidebarTeams/>}/>  
        <Route path="/game-night" element={<SidebarComunityGameNight/>}/> 
      </Routes>
    </div>
  );
}

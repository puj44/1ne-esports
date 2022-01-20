import React from 'react';
import {Route, Switch } from 'react-router-dom';
import Homepage from './Homepage';
import Events from './Events';
import PlayersBio from './PlayersBio';
import TeamsBio from './TeamsBio';
import Rankings from './Rankings';
import Community from './Community';
import About from './About';

function MainRouter() {
  return <div>
      <Switch>
          <Route path="/" exact component={Homepage}/>
          <Route path="/events" component={Events}/>
          <Route path="/palyersbio" component={PlayersBio}/>
          <Route path="/teamsbio" component={TeamsBio}/>
          <Route path="/rankings" component={Rankings}/>
          <Route path="/community" component={Community}/>
          <Route path="/about" component={About}/>
      </Switch>
  </div>;
}

export default MainRouter;


import React from "react";
import './App.css';
import Header from "./components/Header";
import MainRouter from "./components/MainRouter"


function App() {
  return (
    
     <div className="App" style={{'minHeight':'100vh','height':'100%'}}>
        <Header />
        <MainRouter/>  	      
    </div>
    
  );
}

export default App;

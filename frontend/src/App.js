import React from "react";
import './App.css';
import Header from "./UserComponents/Header";
import AdminRouter from './AdminComponents/AdminRouter';
import UserRouter from './UserComponents/UserRouter';

function App() {
  return (
    <div>
     <div className="App" style={{'minHeight':'100vh','height':'100%'}}> 
        <Header/>
        <UserRouter />
        <AdminRouter/>   
    </div>
    </div>
  );
}

export default App;

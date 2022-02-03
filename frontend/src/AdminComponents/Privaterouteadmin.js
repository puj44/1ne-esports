import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, Route} from 'react-router-dom';
import Loadingspinner from './Loadingspinner';
const Privaterouteadmin = ({component: Component, ...rest}) => {
    const [isFetched, setisFetched] = useState(false);
    const [isAuthenticated, setAuthenticated] = useState();
    useEffect(()=>{
        axios({
            method: 'GET',
            url:'https://localhost:3000/auth/getstatus',
            withCredentials: true,
        }).then((response)=>{
            setAuthenticated(true);
            setisFetched(true);
        }).catch((error)=>{
            setAuthenticated(false);
            setisFetched(true);
        });
    },[]);
    if(isFetched===false){
        return(<Loadingspinner/>);
    }
    if(isAuthenticated===true && isFetched===true){
        return (
            <Route {...rest} render={props => (<Component {...props} />)}/>
        );
    }else if(isAuthenticated===false  && isFetched===true){
        return (<Navigate to ='/'/>);   
    }
    else{
        return (<Navigate to='/admin'/>);
    }
};

export default Privaterouteadmin;
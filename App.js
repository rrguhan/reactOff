import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
  } from 'react-router-dom';
import ReactDOM from 'react-dom';

import Axios from './Axios';
import Parent from './Parent';
import Profile from './Profile';
import Login from './Login';    
import Login2 from './Login2';
import {AuthProvider} from "react-check-auth";
import EmpHome from './EmpHome';
import AdminHome from './AdminHome';
import History from './History';
class App extends Component {
   

    
   

    requireAuth = (props) =>{
        if (props.isLoggedIn) {
            alert("logged in");
          }
         else{
             alert("not logged in !");
         }
    }
    
     
    render() {
        return (

          <Router >
                 
               
                 
            
            <div>
                <div >
                        <Switch>
                        <Route path = "/login" component = {Login} />
                        
                            <Route path = "/profile" component = {Profile} />
                            <Route path = "/Axios" component = {Axios} />
                            
                            <Route path = "/parent" component = {Parent} />
                           
                            <Route path = "/login2" component = {Login2} />

                            <Route path = "/empHome" component = {EmpHome} />

                            <Route path = "/adminHome" component = {AdminHome} />
                            <Route path = "/History" component = {History} />

                        </Switch>
                       
                        
                        
                </div>
            </div>
           
            </Router>


        );
    }
}

export default App;
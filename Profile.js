import { Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText ,CardImg} from 'reactstrap';
  
  
import React, { Component } from 'react';
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';
 
class Profile extends Component {
  fun4 = () => {
    console.log(localStorage.getItem('access'));
    console.log("ok");
    if (true) {
      fetch('http://localhost:8000/hello/', {
        headers: {
          Authorization : localStorage.getItem('access'),
        }
      })
        .then(res => res.json())
        .then(json => {
          console.log(json);
        });
    }
  }
  fun() {
    if (true) {
      console.log(localStorage.getItem('token'));
      fetch('http://localhost:8000/userName/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          console.log(json);
        });
    }
  }
  render() {
    
 
    return (
        
        <div>
      hello
      <button onClick = {this.fun}>click</button>
    </div>
    )
  }
}
 
export default Profile
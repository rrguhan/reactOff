import React, { Component } from 'react';
import axios from "axios";
import EmpForm from "./EmpForm.js";
import Nav from "./Nav.js";
import cookie from 'react-cookies';
import Link from 'react-router-dom';
class EmpHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username : '',
            auth : localStorage.getItem('token') ? true : false,
            status : 'Submit'
        };
    }
    
    componentDidMount() {
        if (this.state.auth) {
            fetch('http://127.0.0.1:8000/app/current_user/', {
              headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
              }
            })
              .then(res => res.json())
              .then(json => {
                this.setState({username:json.username});
                
              })
              
              
          }
      }
     
      createPost = (e) =>{
          e.preventDefault();
          let username = this.state.username;
        let data = {
            'date':e.target.elements.date.value,
            'reason':e.target.elements.reason.value,
            'user' : this.state.username,
        }
      const site = 'http://127.0.0.1:8000/app/api/leave2/' 
     
     
      
          let lookupOptions = {
              method: "POST",
              headers: {
                  'Authorization': `JWT ${localStorage.getItem('token')}`,
                  'Content-Type': 'application/json',
                  
              },
              body: JSON.stringify(data),
              
            }

          fetch(site, lookupOptions)
          .then(function(response){
              return response.json()
          }).then(function(responseData){
              console.log(responseData)
              
              
          }).catch(function(error){
              console.log("error", error)
              alert("An error occured, please try again later.")
          })
     
      
  }
    
    render() {
        return (
            <div>
                    
                    
                    <Nav />
                    <EmpForm getUser = {this.createPost} status = {this.state.status}/>
                    
            </div>
        );
    }
}

export default EmpHome;
import React, { Component } from 'react';
import axios from "axios";
import './Axios.css';
import {AuthConsumer} from 'react-check-auth';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';
import ReactDOM from 'react-dom';
import Login from './Login';  
import UserForm from "./UserForm.js";
import EmpForm from "./EmpForm.js";
class Axios extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      auth : localStorage.getItem('token') ? true : false,
      repos: '',
      name: '',
      hname : '',
      comment:'',
      status : 'submit',
      image : null,
      startDate: null,
      date : '',
      user : '',
      reason : '',
      temp: [],
      lis : [],
    }
    this.refresh();
  }
  fun4 = () => {
    console.log("ok");
    console.log(localStorage.getItem('token'));
    if (this.state.auth) {
      fetch('http://127.0.0.1:8000/app/', {
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

  componentDidMount(){
    console.log("conponentDidMount");
    
    
  }

  refresh = () =>{
    console.log("refresh");
    console.log(localStorage.getItem('token'));
    if (this.state.auth) {
      fetch('http://127.0.0.1:8000/app/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          //console.log(json);
          this.state.temp = json;
          console.log("refresh2");
          console.log(this.state.temp);
          var x = this.state.temp;
          this.setState({res:x});
          console.log("refresh3");
          console.log(x);
          console.log("refresh4");
        })
        
        
    }
  
  }

  getUser = (e) => {
    e.preventDefault();
    const user = e.target.elements.username.value;
    this.setState({ status : 'Loading' });
    console.log(user);
    if (user) {
      axios.get(` https://superheroapi.com/api/1352768171591336/search/${user}`)
     
      .then((res) => {
        var error = res.data.response;
        if(error == "success"){
        console.log(res);
        var hname = res.data.results[0].name;
        var image = res.data.results[0].image.url;
        
        console.log(error);
        
        console.log(image);
        this.setState({ hname });
        this.setState({ image });}
        else{
          var hname = "not found";
          var image = "";
          this.setState({ image });
          this.setState({ hname });
          
        }
        this.setState({ status : 'Submit' }); 
      })
    } else return;

    
  }

  hello = () =>{
    alert("hello");
  }
 
  fun = (props) => {
    this.setState({
        name : props.target.value 
    })
}

fun2 = (event) => {
    this.setState({
        comment : event.target.value 
    })
}
fun3 = (e) => {
    e.preventDefault();
    alert(`${this.state.name} ${this.state.comment}`);
    this.setState({
        name:'',
        comment:''
    })
}
logout = () =>{
  localStorage.removeItem('token');
  this.setState({auth:false});

  
}
 emp = (e) =>{
  e.preventDefault();
  const user = e.target.elements.username.value;
  this.setState({ status : 'Loading' });
  console.log(user);
  if (user) {
    axios.get(`https://superheroapi.com/api/1352768171591336/search/${user}`)
   
    .then((res) => {
      var error = res.data.response;
      if(error == "success"){
      console.log(res);
      var hname = res.data.results[0].name;
      var image = res.data.results[0].image.url;
      
      console.log(error);
      
      console.log(image);
      this.setState({ hname });
      this.setState({ image });}
      else{
        var hname = "not found";
        var image = "";
        this.setState({ image });
        this.setState({ hname });
        
      }
      this.setState({ status : 'Submit' }); 
    })
  } else return;

 }
 handleChangeDate = (date) => {
   date.preventDefault();
  this.setState({
    startDate: date
  });
};
fun11 = () =>{
  console.log(this.state.temp);
  {this.state.temp.map(obj => (
                  
     
  
    console.log(obj.id + obj.reason + obj.date)
    

   
))}
  console.log(this.state.lis);
  var x = this.state.temp;
  this.setState({lis:x});

}
  render() {
   
    return (
      <div >
        
        {this.state.auth
            ? <div className="Axios">
              <button onClick = {this.fun11}>click</button>
              <header className="Axios-header">
                <h1 className="Axios-title">Request</h1>
              
              </header>
          
              <br></br>
           
              <table>
                <thead>
              <tr>
                  <th>status</th>
                  <th>date</th>
                  <th>reason</th>
                </tr>
                </thead>
               <tbody>
               {console.log("this.state.lis")}
                 {console.log(this.state.lis)}
               {this.state.lis.map(obj => (
                    
                    <tr>
                    <td> {obj.id} </td>
        
                    <td> { obj.date }</td>
                    <td> { obj.reason }</td>
                    

                    </tr>
                ))}
               
               </tbody>
               
               
              </table>
              
              <img className="image" src={ this.state.image }  />
              <h1>{ this.state.hname }</h1> 
              <button onClick = {this.logout}  >logout</button>
            </div>
            :<div id='loginBox'> <Link to='/login2'>Login here</Link> </div> }
           

          
          </div>
       
    );
  }
};

export default Axios;

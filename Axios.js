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
import PostForm from "./PostForm.js";
import Nav from "./Nav.js";
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
      link : 'http://127.0.0.1:8000/app/api/leave2/',
      next : '',
      previous : '',
      
      totalPage:'',
      dateOrder : 'Asc',
      statusOrder : 'All',
      currentPage : '1',
      paginationControl : true,
      previousN:'',
      nextN:'2',
      actualSite : 'http://127.0.0.1:8000/app/filter/?page=1',
      site : 'http://127.0.0.1:8000/app/filter/?page=1',
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
    this.setState({paginationControl:true})
    console.log("refresh");
   
    console.log(localStorage.getItem('token'));
    let link = this.state.link;
    console.log("link in refresh "+link);
   
    if (this.state.auth) {
      axios.get(link, {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        },
        
      })
        .then(res => {
          console.log(res);
          this.state.temp = res.data.results;
          var x = this.state.temp;
          let next = res.data.links.next;
          let previous = res.data.links.previous;
          let totalPage = res.data.total_pages;
          let currentPage = res.data.pagenum;
          if (currentPage == null){
            currentPage = 1;
          }
          this.setState({lis:x ,temp:x, next ,previous ,totalPage,currentPage});
         
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
pagination = (e) =>{
  let value = e.target.name;
  console.log(value);
  let link = '';
  if(value == 'next'){
    
    link = this.state.next;
    
  }
  else{
    link = this.state.previous;
  }
  if(link == null){
    return;
  }
  this.setState({link},()=>{this.refresh()});
  
  
}
deleteRecord = (e) =>{
  console.log(e.target.name);
 
let data = {
    id : e.target.name,
}
const site = 'http://127.0.0.1:8000/app/snippets/'+e.target.name+'/'; 



  let lookupOptions = {
      method: "DELETE",
      headers: {
          'Authorization': `JWT ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
          
      },
      body: JSON.stringify(data),
      
    }
let ref= this;
  fetch(site, lookupOptions)
  .then(function(response){
      return response.json()
  }).then(function(responseData){
      console.log(responseData.results)
      alert(responseData)
      ref.refresh()
      
  }).catch(function(error){
      console.log("error", error)
      console.log("An error occured, please try again later.")

  })
  


}
filter = (e) =>{
  console.log(e.target.name)
  this.setState({[e.target.name]:e.target.value},()=>{
    console.log("state value date "+this.state.dateOrder)
    console.log("state value  desc "+this.state.statusOrder)
  })
  
}
filter2 = () =>{
  this.setState({paginationControl:false});
  let data = {
      date : this.state.dateOrder,
      status : this.state.statusOrder,
  }
  
  const site = this.state.site; 
  
  console.log(site)
  
    let lookupOptions = {
        method: "POST",
        headers: {
            'Authorization': `JWT ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
            
        },
        body: JSON.stringify(data),
        
      }
  let that= this;
    fetch(site, lookupOptions)
    .then(function(response){
        return response.json()
    }).then(function(responseData){
        console.log(responseData)
        var x = responseData.data.results;
        let next = responseData.next;
        let previous = responseData.previous;
        
        that.setState({temp:x , currentPage:responseData.pagenum,totalPage:responseData.total_pages,next,previous},()=>{console.log(that.state.temp)})
        
    })
    .catch(function(error){
        console.log("error", error)
        console.log("An error occured, please try again later.")
        
    })
    that.setState({site:that.state.actualSite})
}
paginationC = (e) =>{
  if(this.state.paginationControl){
    this.pagination(e);
  }
  else{
    let value = e.target.name;
  console.log(value);
  let link = '';
  if(value == 'next'){
    
    link = this.state.next;
    
  }
  else{
    link = this.state.previous;
  }
  if(link == null){
    return;
  }
  
    
    this.setState({site:link},()=>{
      this.filter2();
    })
    
  }
}
  render() {
   
    return (
      <div >
        {this.state.auth
            ?
         <div className="Axios">
             
              <header >
                <Nav status = {this.state.status} user={this.state.username}/>
               
              
              </header>
             
              <br></br> 
              <div>
              <select onChange={this.filter} name="dateOrder">
                <option value="Asc"  >Date</option>
                <option value="Asc" >Ascending</option>
                <option value="Des" >Descending</option>
              </select>
              <select onChange={this.filter} name="statusOrder">
                <option value="All"  >All</option>
                <option value="Acc" >Accepted</option>
                <option value="Rej" >Rejected</option>
                <option value = "UK" >UnKnown</option>
              </select>
              <button onClick={this.filter2}>filter</button>
              </div>
              
              <table>
                <thead>
               
              <tr>
                  <th>status</th>
                  <th>date</th>
                  <th>reason</th>
                  <th>cancel </th>
                </tr>
                </thead>
               <tbody>
               
             
               {this.state.temp .map(obj => (
                    
                    <tr>
                    <td> {obj.status} </td>
        
                    <td> { obj.date }</td>
                    <td> { obj.reason }</td>
                    <td><button onClick={this.deleteRecord} name={obj.id}>cancel</button></td>

                    </tr>
                ))}
               
               </tbody>
               
              
              </table>
              <div className="center" >
                <button onClick = {this.paginationC}  name='previous'> previous </button>
  <span>page {this.state.currentPage}/{this.state.totalPage}</span>
                <button onClick = {this.paginationC}  name = 'next'> next </button>
               
              </div>
         
              <img className="image" src={ this.state.image }  />
              <h1>{ this.state.hname }</h1> 
              
            </div>
           :<div id='loginBox'> <Link to='/login2'>Login here</Link> </div> }
           

          
          </div>
       
    );
  }
};

export default Axios;

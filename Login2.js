import React, { Component } from 'react';
import './Style.css';
import { Button } from 'reactstrap';
import axios from "axios";
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import { Alert } from 'reactstrap';
class Login2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
         
          logged_in: localStorage.getItem('access') ? true : false,
          username: ''
        };
      }
   
    formLogin = (props) =>{
        props.preventDefault();
       
       
       var username = props.target.elements.username.value;
       var password ='password';
       var email = '';
     /*  // var payload = props.target.elements.username.value;
       */
        axios.post(`http://127.0.0.1:8000/token-auth/`,{
            "username": props.target.elements.username.value,
            "password":props.target.elements.password.value, 
        } )
        .then((res) => {
            console.log(res); 
           // props.history.push("/");
            if(res.status == 200){
                console.log(res.data.token);  
                console.log(res); 
                //localStorage.removeItem('token');
                localStorage.setItem('token', res.data.token);
                this.setState({logged_in:'true'});
                this.props.history.push("/Axios");
          }
          else{
              console.log("wrong pass");
            alert("wrong credentials");
          }
      })
      .catch((error) => {
        alert("wrong password")
      });

    }
    render() {
        return (
            <div id='loginBox' className="text-center">
                <h1>Login</h1> 
                <h1>{ this.state.logged_in }</h1>

                <hr/>    
                <form onSubmit={this.formLogin} method='post'>
                
                <input style={{ margin:"10px auto", display:"block" }} type="text" name="username" placeholder="Username"/>
                <input style={{ margin:"20px auto", display:"block" }} type="password" name="password" placeholder="Password"/>
                <Button color="primary" >Login</Button> 
                </form>          
            </div>
        );
    }
}

export default Login2;
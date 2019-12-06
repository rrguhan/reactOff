
import React from 'react';
import {
    BrowserRouter as Router,
   
    Link,
    
  } from 'react-router-dom';
function AdminNav(props) {
   function logout(){
       console.log("logout");
        localStorage.removeItem('token');
        
    }
    return (
        <div>
                    <div className="topnav">
                        <Link to ='/adminHome' >Home</Link>
                        <Link to='/History'>History</Link>
                    <div className="topnav-right">
                        <Link to='/login2' onClick = {logout}> Logout</Link>
                        
                    </div>
                </div>
            </div>
    );
}

export default AdminNav;
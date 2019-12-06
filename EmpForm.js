import React from 'react';
import { Button } from 'reactstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Button as Btn } from 'reactstrap';
const UserForm = (props) => {
   
  return (
    <div id='loginBox'>
<h1>Request Leave</h1>
<hr></hr>
<form onSubmit={props.getUser}>
      
      <textarea rows="4" cols="30" name="reason" />
      <input type="date" name="date" />
      
      <Btn color="primary">{props.status}</Btn>
    </form>

  </div>
  );
}

export default UserForm;
import React from 'react';
import { Button } from 'reactstrap';

const UserForm = (props) => {
  return (
    <form onSubmit={props.getUser}>
      <input style={{ margin:"20px auto", display:"block" }} type="text" name="username"/>
      <Button color="primary">{ props.status }</Button>
    </form>
  );
}

export default UserForm;
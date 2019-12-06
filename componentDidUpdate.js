import React, { Component } from 'react';

class App extends React.Component {

    
  
    render() {
      return this.props.children
    }
  }
  
  
  
  export default connect(mapStateToProps)(App)
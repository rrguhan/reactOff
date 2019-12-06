import React, { Component } from 'react';
import Child from './Child';


class Parentcom extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             name : "parent"
        }
    }
    
    gp = () =>{
        alert(`${this.state.name}`)
    }

    gp2 = () =>{
        alert("gb2")
    }


    render() {
        return (
            <div>
                <Child fun = {this.gp2}/>
            </div>
        )
    }
}

export default Parentcom

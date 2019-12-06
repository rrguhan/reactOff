import React from 'react'

function Child(obj) {
    return (
        <div>
            <button onClick = {obj.fun}>child button</button>
        </div>
    )
}

export default Child

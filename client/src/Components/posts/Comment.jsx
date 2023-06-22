import React from "react";

function Comment({name, email, body}){
    return (
        <div>
            <h3 style={{textAlign: 'left'}}>{name}</h3>
            <h4 style={{textAlign: 'left'}}>{email}</h4>
            <p>{body}</p>
        </div>
    )
}

export default Comment;
import React, { useState, useEffect } from "react";
import Comment from './Comment';
import { Link } from "react-router-dom";


function Post({post, index}){
    const [extend, setExtend] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        if (showComments){
            const getComments = async () => {
                fetch('https://jsonplaceholder.typicode.com/comments?postId=' + post.id)
                    .then(response => response.json())
                    .then(newComments => setComments(newComments))
                }    
            getComments();
        }
        else{
            setComments([]);
        }
    }, [showComments])

    return (
        <div style={extend? {borderStyle: "solid", borderColor: "red"}: {}}>
            {/* TODO: deednt fully understand the porpse of the fiture */}
            <button onClick={() => setExtend((prevVal)=>!prevVal)}>extend</button>
            
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <button onClick={()=>setShowComments(prevVal => !prevVal)}>
                {showComments? "hide comments": "comments"}
            </button>

            <div style={{maxHeight: 300, overflow: 'scroll'}}>
                {showComments &&
                comments.map((comment, index) => 
                <div key={index}>
                    <hr/>
                    <Comment {...comment}/>
                </div>
                )}
            </div>
        </div>
    );
}

export default Post;
import React, { useState, useEffect, useContext } from "react";
import Comment from './Comment';
import { Link } from "react-router-dom";
import ApiContext from "../../ApiContext";
import { useUser } from "../../UserContext";
function Post({post}){
    const [extend, setExtend] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const api = useContext(ApiContext);
    const user = useUser();
    useEffect(() => {
        if (showComments){
            const getComments = async () => {
                api.get('posts/' + post.userId + '/' + post._id + '/comments')
                    .then(response => setComments(response.data))
                }    
            getComments();
        }
        else{
            setComments([]);
        }
    }, [showComments])

    const addComment = () => {
        const commentObj = {
            name: user?.username ?? 'anonymous',
            body: comment
        }
        api.post('posts/' + post.userId + '/' + post._id + '/CreateComment', commentObj).then((response) => {
            if (response.status === 201) {
                alert("Comment added successfuly");
                setComments([...comments, response.data]);
                setShowComments(true);
                setComment('');
            }
            else {
                alert("Comment failed");
            }
        }).catch((error) => {
            console.log(error)
            alert("Comment failed");
        });
    }

    return (
        <div style={extend? {borderStyle: "solid", borderColor: "red"}: {}}>
            {/* TODO: didnt fully understand the purpse of the feature */}
            <button onClick={() => setExtend((prevVal)=>!prevVal)}>extend</button>
            
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <button onClick={()=>setShowComments(prevVal => !prevVal)}>
                {showComments? "hide comments": "comments"}
            </button>

            <div style={{maxHeight: 300, overflow: 'scroll'}}>
                <input type="text" value={comment} onChange={(event) => setComment(event.target.value)} />
                <button onClick={addComment}>Add Comment</button>
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
import React from "react";
import { Link } from "react-router-dom";

function PhotoPreview({thumbnailUrl, id, title, url}){
    return (
        <div style={{margin: 5, backgroundColor: 'gray', display: 'inline-block'}}>
            <Link to={`../photo/${id}`}>
                <img src={thumbnailUrl}/>
            </Link>
            <h3 style={{maxWidth: 150}}>{title}</h3>
                
        </div>
    )
}

export default PhotoPreview
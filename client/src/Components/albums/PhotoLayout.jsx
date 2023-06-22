import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PhotoLayout(){
    const {id} = useParams();
    const [state, setState] = useState(null);

    useEffect(() => {
        async function getState(){
            console.log(id)
            fetch(`https://jsonplaceholder.typicode.com/photos/${id}`)
            .then(respond=>respond.json())
            .then(data=>setState(data));
        }

        getState();
    },[])

    return(
        <>
        {state&&
        <div style={{display: 'inline-block'}}>
            <h1 style={{maxWidth: 600}}>{state.title}</h1>
            <img src={state.url}></img>
            <h1>Description...</h1>
        </div>}
        </>
    )
}

export default PhotoLayout;
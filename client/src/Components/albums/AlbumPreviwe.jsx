import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const style = {
    color: 'black', 
    textDecoration: 'none', 
    borderStyle: 'solid', 
    borderColor: 'black',
    margin: 10,
    backgroundColor: 'gray',
};

function AlbumPreviwe({album, display}){
    const nPreviewPhotos = 6
    const [coverPhotos, setCoverPhotos] = useState(false)
    useEffect(() => {
        if (display){
            async function getCoverPhotos(){ 
                fetch('https://jsonplaceholder.typicode.com/photos?albumId=' + album.id)
                    .then(res => res.json())
                    .then(p => setCoverPhotos(p.slice(0, nPreviewPhotos)))
            }
    
            getCoverPhotos();
        }
    }, [display])

    return (
        <div style={style}>
            <h1 style={{width: '50%',backgroundColor: 'purple', textDecoration: 'none', textAlign: 'center'}}>{album.title}</h1>
            <Link to={'./'+album.id} >
                <div style={{borderStyle: 'solid', borderWidth: 5, borderColor: 'blue'}}>
                    {coverPhotos
                    ?coverPhotos.map((p, index) => <img key={index} src={p.thumbnailUrl}/>)
                    :<h1>Loading...</h1>}
                </div>
            </Link>
        </div>
    )
}

export default AlbumPreviwe;
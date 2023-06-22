import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PhotoPreview from "./PhotoPreview";


function AlbumLayaout(){
    const {id} = useParams();

    const [album, setAlbum] = useState({});
    const [photos, setPhotos] = useState([]);
    const [displayPage, setDisplayPage] = useState([]);
    const photosPerPage = 20;
    const [pageIndex, setPageIndex] = useState(0); // the index of the first photo in the page

    useEffect(() => {
        async function getData(){
            fetch(`https://jsonplaceholder.typicode.com/albums/${id}`)
                .then(respond=>respond.json())
                .then(data => {setAlbum(data); console.log(album)});
        }
                
        
        async function getPhotos(){
            //TODO: not all photos at once
            fetch(`https://jsonplaceholder.typicode.com/alboms/${id}/photos`)
            .then(respond=>respond.json())
            .then(data => setPhotos(data.slice(0, 45).map(p=>p)))
            .then(console.log(photos));
        }
        
        getPhotos();
        getData();

    }, [])

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>{album.title}</h1>
            <br/>
            <div style={{maxHeight: 500, overflow: 'scroll'}}>
                {photos.slice(pageIndex, pageIndex+photosPerPage).map((photo, index) =>
                    <PhotoPreview key={index} {...photo}/>
                )}
            </div>
            <nav>
                <button onClick={() => setPageIndex(i => i-photosPerPage)} disabled={pageIndex == 0}>previus</button>
                <button onClick={() => setPageIndex(i => i+photosPerPage)} disabled={pageIndex + photosPerPage >= photos.length}>next</button>
            </nav>
        </div>
    )
}

export default AlbumLayaout;
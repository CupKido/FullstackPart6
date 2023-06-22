import { useState, useEffect } from 'react'
import axios from 'axios';
import AlbumLayaout from './AlbumLayout';
import AlbumPreviwe from './AlbumPreviwe';
import { useUser } from '../../UserContext';
function Albums() {
  const user = useUser();
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    async function getAlbums(){
      fetch('https://jsonplaceholder.typicode.com/albums?userId=' + user.id)
        .then(respond => respond.json())
        .then(newAlboms => setAlbums(newAlboms));
    }

    getAlbums();
  }, [])

  return (
    <div>   
      {albums.map((album, index)=>

      <AlbumPreviwe key={index} album={album} display={true}/>)
      }
    </div>
  )
}

  export default Albums
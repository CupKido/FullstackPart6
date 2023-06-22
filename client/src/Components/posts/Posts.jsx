import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Post from './Post';
import { useUser } from '../../UserContext';

function Posts() {
  
  const user = useUser();
  const [posts, setPosts] = useState([]);
  const {selected} = useParams();

  useEffect(() => {
    async function loadPosts(){
      console.log(user);
      fetch('https://jsonplaceholder.typicode.com/posts?userId=' + user.id)
        .then(respond => respond.json())
        .then(posts => setPosts(posts))
        .catch((error=>console.log(error)));
    }

    loadPosts();
  }, [])

  return (
    <>
      {posts.map((post, index) =>
          <div>
            <Post id={index} post={post}/>
            <hr style={{height: 5, backgroundColor: 'black'}}/>
          </div>
        )}
    </>
  )
}

export default Posts;
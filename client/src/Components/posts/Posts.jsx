import { useEffect, useState, useContext } from 'react'
import { Link, useParams } from 'react-router-dom';
import Post from './Post';
import { useUser } from '../../UserContext';
import ApiContext from '../../ApiContext';
import '../../styles/posts.css';
function Posts() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const user = useUser();
  const [posts, setPosts] = useState([]);
  const {selected} = useParams();
  const api = useContext(ApiContext);
  useEffect(() => {
    async function loadPosts(){
      console.log(user);
      api.get('/posts/' + user._id)
        .then(response => setPosts(response.data))
        .catch((error=>console.log(error)));
    }

    loadPosts();
  }, [])

  const AddPost = () => {
    const post = {
      title: title,
      body: body
    }
    api.post('/posts/' + user._id + '/CreatePost', post)
    .then((response) => {
      if (response.status === 201) {
        alert("Post added successfuly");
        setPosts([...posts, response.data]);
        setTitle('');
        setBody('');
      }
      else {
        alert("Post failed");
      }
    }).catch((error) => {
      console.log(error)
      alert("Post failed");
    });
  }

  return (
    <>
      <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
      <input type="text" value={body} onChange={(event) => setBody(event.target.value)} />
      <button onClick={AddPost}>Add Post</button>
      {posts.map((post, index) =>
          <div>
            <Post post={post}/>
            <hr style={{height: 5, backgroundColor: 'black'}}/>
          </div>
        )}
    </>
  )
}

export default Posts;
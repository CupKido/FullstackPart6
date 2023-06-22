import { useState, useEffect, useContext } from 'react'
import { useUserUpdate } from '../../UserContext'
import { useNavigate } from 'react-router-dom'
import '../../styles/Login.css';
import ApiContext from '../../ApiContext';

const Login = ({onLogIn, isLoggedIn}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const api = useContext(ApiContext);
  async function getUser(username, password) {
    return api.post("/users/login", {
      username: username ,
      password: password
    })
  }

  const userUpdatedFunction = useUserUpdate();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn){
      userUpdatedFunction(null);
      onLogIn(undefined);
      localStorage.setItem('logged_user', null);
    }
  }, []);
  

  const handleLogin = async (event) => {
    event.preventDefault();
    //console.log(await getUsers())
    if (username === '') {
      console.log('Login Failed');
      setLoginError('Please enter a username');
      return;
    }
    if (password === '') {
      console.log('Login Failed');
      setLoginError('Please enter a password');
      return;
    }
    getUser(username, password).then((response) => {
      if (response.status === 200) {
        alert("Login successful");
        const user = response.data;
        user.password = password;
        onLogIn(user);
        navigate("/");
      }
      else {
        console.log('Login Failed');
        setLoginError('Mismatched password');
      }
    }).catch((error) => {
      console.log(error)
      setLoginError('Error logging in');
    });
    
  };

  const handleSubmitRegister = (event) => {
    event.preventDefault();
    navigate("/Register");
  };  

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <label className="login-label" htmlFor="username">Username:</label>
        <input
          className="login-input"
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className="login-label" htmlFor="password">Password:</label>
        <input
          className="login-input"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className='login-error'>{loginError}</p>
        <button className="login-button" type="submit">Login</button>
        <button type="submit" onClick={handleSubmitRegister} >Register</button>
      </form>
    </div>
  );
};
  
  export default Login
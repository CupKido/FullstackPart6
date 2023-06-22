import { useState, useEffect } from 'react'
import { useUserUpdate } from '../../UserContext'
import { useNavigate } from 'react-router-dom'
import '../../styles/Login.css';

const Login = ({onLogIn, isLoggedIn}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  async function getUser(username) {
    return await fetch(
      'https://jsonplaceholder.typicode.com/users?username=' + username
    ).then((response) => response.json());
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
    const users = await getUser(username);
    console.log(users);
    if (users.length === 0) {
      console.log('Login Failed');
      setLoginError('User not found');
      return;
    }
    const user = users[0];
    let number = user.address.geo.lat;
    console.log(number);
    let lastFourDigits = String(number).replace('.', '').slice(-4);
    console.log(lastFourDigits);
    if (password === lastFourDigits) {
      console.log('Login Successful');
      userUpdatedFunction(user);
      localStorage.setItem('logged_user', JSON.stringify(user));
      setLoginError('');
      navigate('/todos');
      onLogIn(user);
      // save user to LocalStorage
    } else {
      console.log('Login Failed');
      setLoginError('Mismatched password');
    }
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
      </form>
    </div>
  );
};
  
  export default Login
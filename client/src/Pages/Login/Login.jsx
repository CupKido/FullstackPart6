import { useState } from "react";
import "./LoginStyle.css";
import axios from "axios";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    axios.post("http://localhost:5000/api/users/login", {
        username: username ,
        password: password
    })
    .then((response) => {
        console.log(response);
        if (response.status === 200) {
          console.log(response.data);
            alert("Login successful");
            const user = response.data;
            user.password = password;
            onLogin(user);
        }
        else {
            alert("Password is incorrect");
        }    
    })
  }



  return (
    <main>
      <h1>Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <label className="Login-Label" htmlFor="username">Username</label>
          <input className="Login-Input"
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <label className="Login-Label" htmlFor="password">Password</label>
          <input className="Login-Input"
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="button" onClick={handleSubmit} >Log In</button>
      </form>
    </main>
  );
}

export default Login;

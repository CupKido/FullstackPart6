import { useState, useContext } from "react";
import "./LoginStyle.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Registration from "../Registration/Registration.jsx";
import ApiContext from '../../ApiContext';
function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const api = useContext(ApiContext);
  const navigate = useNavigate();
    async function handleSubmitLogin(event) {
        api.post("/users/login", {
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

    const handleSubmitRegister = (event) => {
        event.preventDefault();
        navigate("/Register");
    }


  return (
    <main>
      <h1>Login</h1>
      <form className="login-form" onSubmit={handleSubmitLogin}>
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
        <button type="button" onClick={handleSubmitLogin} >Log In</button>
        <button type="button" onClick={handleSubmitRegister} >Registr</button>
      </form>
    </main>
  );
}

export default Login;

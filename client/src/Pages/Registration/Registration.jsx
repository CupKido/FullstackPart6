import { useState } from "react";
import axios from "axios";
import ApiContext from '../../ApiContext';
import {useNavigate} from "react-router-dom";

function Registration({ onRegistr }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [Email, setEmail] = useState("");
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [Phone, setPhone] = useState("");
    const api = useContext(ApiContext);
    const navigate = useNavigate();
    async function handleSubmitRegister(event) {
        api.post("/users/login", {
            username: username,
            password: password,
            Email: Email,
            FirstName: FirstName,
            LastName: LastName,
            Phone: Phone

        })
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    console.log(response.data);
                    alert("Register successful");
                    const user = response.data;
                    user.password = password;
                    onRegistr(user);
                }
                else if () {
                    alert("Registration is incorrect");
                }

            }


}
    const handleSubmitLogin = (event) => {
        event.preventDefault();
        navigate("/Login");
    }


return (
    <main>
        <h1>Registration</h1>
        <form className="login-form" onSubmit={handleSubmitRegister}>
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
            <div>
                <label className="Login-Label" htmlFor="Email">Email</label>
                <input className="Login-Input"
                    type="text"
                    id="Email"
                    value={Email}
                    onChange={(event) => setEmail(event.target.value)}
                />
            </div>
            <div>
                <label className="Login-Label" htmlFor="FirstName">FirstName</label>
                <input className="Login-Input"
                    type="text"
                    id="FirstName"
                    value={FirstName}
                    onChange={(event) => setFirstName(event.target.value)}
                />
            </div>
            <div>
                <label className="Login-Label" htmlFor="LastName">LastName</label>
                <input className="Login-Input"

                    type="text"
                    id="LastName"
                    value={LastName}
                    onChange={(event) => setLastName(event.target.value)}
                />
            </div>
            <div>
                <label className="Login-Label" htmlFor="Phone">Phone</label>
                <input className="Login-Input"
                    type="text"
                    id="Phone"
                    value={Phone}
                    onChange={(event) => setPhone(event.target.value)}
                />
            </div>
            <button type="button" onClick={handleSubmitRegister} >Register</button>
            <button type="button" onClick={handleSubmitLogin} >Login</button>

        </form>
    </main>
);

}
export default Registration;
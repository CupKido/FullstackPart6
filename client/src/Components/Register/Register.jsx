import { useState, useContext } from "react";
import ApiContext from '../../ApiContext';
import {useNavigate} from "react-router-dom";
import "../../styles/Register.css";

function Register({ onRegister }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setemail] = useState("");
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [phone, setphone] = useState("");
    const api = useContext(ApiContext);
    const navigate = useNavigate();
    async function handleSubmitRegister(event) {
        api.post("/users/CreateUser", {
            username,
            password,
            email,
            firstName,
            lastName,
            phone
        })
        .then((response) => {
            console.log(response);
            if (response.status === 201) {
                console.log(response.data);
                alert("Register successful");
                const user = response.data;
                user.password = password;
                onRegister(user);
                navigate("/");
            }
            else {
                alert("Registration is incorrect");
            }

        });
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
                    <label className="Login-Label" htmlFor="email">email</label>
                    <input className="Login-Input"
                        type="text"
                        id="email"
                        value={email}
                        onChange={(event) => setemail(event.target.value)}
                    />
                </div>
                <div>
                    <label className="Login-Label" htmlFor="firstName">firstName</label>
                    <input className="Login-Input"
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(event) => setfirstName(event.target.value)}
                    />
                </div>
                <div>
                    <label className="Login-Label" htmlFor="lastName">lastName</label>
                    <input className="Login-Input"

                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(event) => setlastName(event.target.value)}
                    />
                </div>
                <div>
                    <label className="Login-Label" htmlFor="phone">phone</label>
                    <input className="Login-Input"
                        type="text"
                        id="phone"
                        value={phone}
                        onChange={(event) => setphone(event.target.value)}
                    />
                </div>
                <button type="submit" onClick={handleSubmitRegister} >Register</button>
                <button type="submit" onClick={handleSubmitLogin} >Login</button>

            </form>
        </main>
    );
}
export default Register;
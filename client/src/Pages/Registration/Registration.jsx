import { useState } from "react";
import axios from "axios";

function Registration({ onRegistr }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [Email, setEmail] = useState("");
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [Phone, setPhone] = useState("");


    async function handleSubmit(event) {
        axios.post("http://localhost:5000/api/users/Registr", {
            username: username,
            password: password,
            Email: Email,
            FirstName: FirstName,
            LastName: LastName,
            Phone: Phone

        })


}

return (
    <main>
        <h1>Registration</h1>
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
            <button type="button" onClick={handleSubmit} >Registr</button>
        </form>
    </main>
);

}
export default Registration;
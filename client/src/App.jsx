import "./App.css";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import TopNav from "./Components/TopNav/TopNav";
import Login from "./Pages/Login/Login";
import Info from "./Pages/Info/Info";
import Registration from "./Pages/Registration/Registration.jsx";

// import Todos from "./Pages/Todos/Todos";
const api = axios.create({
    baseURL: 'http://verybad.site:80',
  });
function App() {
    const [user, setUser] = useState(localStorage.getItem("User"));
    const navigate = useNavigate();

    function handleRegistration(username) {
        setUser(username);
        localStorage.setItem("User", JSON.stringify(username));
        navigate("/");
    }

    function handleLogin(username) {
        setUser(username);
        localStorage.setItem("User", JSON.stringify(username));
        navigate("/");
    }

    function handleLogout() {
        setUser(null);
        localStorage.clear();
        navigate("/Login");
    }

    return (
        <>
            {user && <TopNav onLogout={handleLogout} />}
            {user ? (
                <Routes>
                    {/* <Route path="/" element={<Navigate to="/Info" />} /> */}
                    {/* <Route path="/Info" element={<Info />} /> */}
                    {/* <Route path="/Todos" element={<Todos />} /> */}
                    {/*<Route path="/Posts">*/}
                    {/*    <Route index element={<Posts />} />*/}
                    {/*    <Route path=":id" element={<Post />} />*/}
                    {/*    <Route path="NewPost" element={<NewPost></NewPost>}></Route>*/}
                    {/*</Route>*/}
                    {/*<Route path="/Albums">*/}
                    {/*    <Route index element={<Albums />} />*/}
                    {/*    <Route path=":id" element={<Album />} />*/}
                    {/*</Route>*/}
                    {/*<Route path="*" element={<NotFound />} />*/}
                </Routes>
            ) : (
                <Routes>
                    <Route path="/" element={<Navigate to="/Login" />} />
                    <Route path="/Login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/Registr" element={ <Registration onRegistr={handleRegistration} />} />
                    {/*<Route path="*" element={<NotFound />} />*/}
                </Routes>
            )}
        </>
    );
}

export default App;

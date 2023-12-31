import Login from './Components/Login/Login'
import Todos from './Components/Todo/Todos'
import Posts from './Components/posts/Posts'
import UserInfo from './Components/UserInfo/UserInfo'
import Register from './Components/Register/Register'
import { useUserUpdate } from './UserContext'
import { useState, useEffect } from 'react'
import './styles/App.css'
import {BrowserRouter, Route, Routes, NavLink, Navigate, useNavigate } from 'react-router-dom'


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')
  const userUpdated = useUserUpdate();
  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem('logged_user'))
  //   if (user !== undefined) {
  //     if (userUpdate){
  //       userUpdate(user)
  //     }
  //     handleLogin(user)
  //   }
  // }, [])


  const handleSubmit = (user) => {
    setIsLoggedIn(user !== undefined);
    setUserName(user?.username ?? '');
    userUpdated(user);
  }
  function getNav(){
    if (isLoggedIn){
        return (
            <nav>
                <ul className="navbar">
                    <li>
                    <NavLink to="/Login" activeClassName="active">{isLoggedIn ? "Logout" : "Login"}</NavLink>
                    </li>
                    <li>
                    <NavLink to="/Todos" activeClassName="active">Todos</NavLink>
                    </li>
                    <li>
                    <NavLink to="/Posts" activeClassName="active">Posts</NavLink>
                    </li>
                    <li>
                    <NavLink to="/UserInfo" activeClassName="active">Info</NavLink>
                    </li>
                    <li style={{ marginLeft: "auto" }}>
                    {userName}
                    </li>
                </ul>
            </nav>
        )
    }
  }

  return (
      <BrowserRouter>
        {getNav()}
        <Routes>
          <Route exact path="/" element={ isLoggedIn ? <Navigate to="/UserInfo" /> : <Navigate to="/Login" />}>
            
          </Route>
          <Route path="/Login" element={<Login onLogIn={handleSubmit} isLoggedIn={isLoggedIn} />} />
          <Route path="/Register" element={<Register onRegister={handleSubmit} />} />
          <Route path="/Todos" element={ isLoggedIn ? <Todos /> : <Navigate to="/Login" />} />
          <Route path="/Posts" element={ isLoggedIn ?<Posts /> : <Navigate to="/Login" />} />
          <Route path="/UserInfo" element={ isLoggedIn ? <UserInfo /> : <Navigate to="/Login" />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App

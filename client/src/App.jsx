import Login from './Components/Login/Login'
import Todos from './Components/Todo/Todos'
import Posts from './Components/posts/Posts'
import Albums from './Components/albums/Albums'
import UserInfo from './Components/UserInfo/UserInfo'
import { useUserUpdate } from './UserContext'
import { useState, useEffect } from 'react'
import './styles/App.css'
import {BrowserRouter, Route, Routes, NavLink, Navigate } from 'react-router-dom'
import UserProvider from './UserContext'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')
  const userUpdate = useUserUpdate()

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem('logged_user'))
  //   if (user !== undefined) {
  //     if (userUpdate){
  //       userUpdate(user)
  //     }
  //     handleLogin(user)
  //   }
  // }, [])


  function handleLogin(user) {
    setIsLoggedIn(user !== undefined)
    setUserName(user?.name ?? '')
  }

  return (
    <UserProvider>
      <BrowserRouter>
        <nav>
          <ul className="navbar">
            <li>
              <NavLink to="/login" activeClassName="active">{isLoggedIn ? "Logout" : "Login"}</NavLink>
            </li>
            <li>
              <NavLink to="/Todos" activeClassName="active">Todos</NavLink>
            </li>
            <li>
              <NavLink to="/Posts" activeClassName="active">Posts</NavLink>
            </li>
            <li>
              <NavLink to="/Album" activeClassName="active">Album</NavLink>
            </li>
            <li>
              <NavLink to="/UserInfo" activeClassName="active">Info</NavLink>
            </li>
            <li style={{ marginLeft: "auto" }}>
              {userName}
            </li>
          </ul>
        </nav>
        <Routes>
          <Route exact path="/" element={ isLoggedIn ? <Navigate to="/Todos" /> : <Navigate to="/login" />}>
            
          </Route>
          <Route path="/login" element={<Login onLogIn={handleLogin} isLoggedIn={isLoggedIn} />} />
          <Route path="/Todos" element={ isLoggedIn ? <Todos /> : <Navigate to="/login" />} />
          <Route path="/Posts" element={ isLoggedIn ?<Posts /> : <Navigate to="/login" />} />
          <Route path="/Album" element={ isLoggedIn ? <Albums /> : <Navigate to="/login" />} />
          <Route path="/UserInfo" element={ isLoggedIn ? <UserInfo /> : <Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App

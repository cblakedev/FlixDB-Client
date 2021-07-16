import logo from './logo.svg';
import './App.css';
import Login from './authorization/Login'
import Register from './authorization/Register';
import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';


function App() {
  const [sessionToken, setSessionToken] = useState('');

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setSessionToken(localStorage.getItem('token'));
    }
  }, [])

  const clearToken = () => {
    localStorage.clear();
    setSessionToken('');
    console.log('Successfully logged out!')
  }

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  }

  // const protectedViews = () => {
  //   return (
  //     sessionToken === localStorage.getItem('token') ? <WorkoutIndex token={sessionToken} />
  //       : <Auth updateToken={updateToken} />)
  // }

  return (
    <div className="App">
      <div>
        <Router>
          <Login updatetoken={updateToken}/>
        </Router>
      </div>
    </div>
  )

}
export default App;

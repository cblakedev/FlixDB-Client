import logo from './logo.svg';
import './App.css';
import Auth from './authorization/Auth';
import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import SideBar from './home/SideBar'



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

  //put this function in login file
  

  // const protectedViews = () => {
  //   return (
  //     sessionToken === localStorage.getItem('token') ? <WorkoutIndex token={sessionToken} />
  //       : <Auth updateToken={updateToken} />)
  // }

  return (
    <div className="App">
      <div>
        <Router>
          <SideBar />
        </Router>
      </div>
    </div>
  )

}
export default App;

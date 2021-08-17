import './App.css';
import Auth from './authorization/Auth';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import SideBar from './home/Sidebar'
import WebFont from 'webfontloader';

function App() {
  const [sessionToken, setSessionToken] = useState('');

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Arvo']
      }
    });
  }, []);

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

  const updateToken = (newToken) => { //updates a user token and saves it in local stoage
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
}
  //put this function in login file
  

  const protectedViews = () => {
    return (
      sessionToken === localStorage.getItem('token') ? <SideBar token={sessionToken} logout={clearToken}/>
        : <Auth updateToken={updateToken}/>
    )}

  return (
    <div className="App">
      <div>
        <Router>
          {protectedViews()}
        </Router>
      </div>
    </div>
  )

}

export default App;
import React, { useState } from 'react'
import Sidebar from './Sidebar';
import Header from './Header.jsx';
import Page from './Routers.jsx';
import Login from '../Pages/login/Login';

export default function MainMenu() {

  const [navMenuExpended, setNavMenuExpended] = useState(false);
  const [userIsLogIn, setUserIsLogIn] = useState(false);
  const [direction,setDirection]=useState('left');
  let navbarBackgroundColor = '#cad4ff';



  return (<>
    {userIsLogIn && <Sidebar
      backgroundColor={navbarBackgroundColor}
      setNavMenuExpended={setNavMenuExpended}
      navMenuExpended={navMenuExpended}
      direction={direction}
    />}
    <Header
      setUserIsLogIn={(val) => { setUserIsLogIn(val) }}
      userIsLogIn={userIsLogIn}
      setDirection={(val)=>{setDirection(val)}}
      direction={direction}
    />
    {userIsLogIn ?
      <Page
        direction={direction}
        navMenuExpended={navMenuExpended}
      /> :
      <Login
        setUserIsLogIn={(val) => { setUserIsLogIn(val) }}
      />}
  </>
  )
}

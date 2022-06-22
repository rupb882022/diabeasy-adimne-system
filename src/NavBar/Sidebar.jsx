import './Sidebar.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { SidebarLayout } from './Routers.jsx';
import { Row, Col } from 'react-bootstrap';
import * as BsIcons from 'react-icons/bs';
import logo from '../logo.png'

export default function Navbar(props) {
  const { setNavMenuExpended, navMenuExpended, navbarBackgroundColor, direction } = props
  const [openSlidebar, setOpenSlidebar] = useState(false);

  const styles = {
    navbarToggle: {
      'backgroundColor': navbarBackgroundColor,
    },
}

const show = () => { setOpenSlidebar(!openSlidebar); }

const LayoutPage = SidebarLayout.map((item, index) => {
  return (
    <li key={index} className={item.ClassName}>
      <Link to={item.path}>
        {item.icon}
        <span>{item.title}</span>
      </Link>
    </li>
  )
})


return (
  <div style={direction === 'left'?{direction:'ltr'}:{direction:'rtl'}} className='navbarContainer'>
    <IconContext.Provider value={{ color: 'rgb(2 62 141)' }}>
      <nav
        className={
          `nav-menu ${direction === 'left' ? 'left-side' : 'right-side'} 
          ${openSlidebar || !navMenuExpended ?  'active' : ''}`}
      onMouseEnter={() => { setOpenSlidebar(true) }}
      onClick={() => { setOpenSlidebar(true) }}
      onMouseLeave={() => { setOpenSlidebar(false) }}
        >
      <ul className='nav-menu-items' onClick={show}>
        <li className='navbarToggle' styles={styles.navbarToggle}>
          <Row>
            <Col>
              <div className='menu-bars'>
                <img className='logo' src={logo} alt="" />
                <span className='arrowIcon'>
                  {navMenuExpended ?
                    <span className='icons' onClick={() => setNavMenuExpended(false)}><BsIcons.BsFillArrowRightCircleFill /></span> :
                    <span className='icons' onClick={() => setNavMenuExpended(true)}><BsIcons.BsFillArrowLeftCircleFill /></span>
                  }
                </span>
              </div>
            </Col>
          </Row>
        </li>
        {LayoutPage}
      </ul>
    </nav>
  </IconContext.Provider>
    </div >
  )
}

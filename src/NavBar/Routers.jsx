import React, { useLayoutEffect, useState } from "react";
import * as AiIcons from 'react-icons/ai'
import { MdForum, MdFastfood,MdBugReport } from 'react-icons/md'
import { Route, Routes } from 'react-router-dom';
import Home from '../Pages/Home.jsx';
import Food from '../Pages/Food/Food.jsx';
import Forum from '../Pages/Forum/Forum.jsx';
import Reports from '../Pages/Reports/Reports.jsx';
import logo from '../../src/logo.png'
export const SidebarLayout = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    ClassName: 'nav-text'
  },
  {
    title: 'Food',
    path: '/Food',
    icon: <MdFastfood />,
    ClassName: 'nav-text'
  },
  {
    title: 'Forum',
    path: '/Forum',
    icon: <MdForum />,
    ClassName: 'nav-text'
  },
  {
    title: 'Reports',
    path: '/Reports',
    icon: <MdBugReport />,
    ClassName: 'nav-text'
  },
]

export default function Page(props) {

  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const { navMenuExpended, direction } = props
  const windowWidth = screenSize;
  let pageWidth = parseFloat(windowWidth) - (navMenuExpended ? 50 : 200);

  // Responsible on responsiveness when screen size changes
  useLayoutEffect(() => {
    function updateSize() {
      setScreenSize(window.innerWidth);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    //will clean eventListener before updateSize
    return () => window.removeEventListener('resize', updateSize);
  }, []);




  const styles = {
    page: (dir) => {
      return {
        'textAlign': 'center',
        'alignItems': 'center',
        'alignSelf': 'center',
        'transition': '850ms',
        'zIndex': -1,
        'animationDirection': 'alternate',
        'float': dir,
        width: pageWidth,
        padding: '0px 10px',
        backgroundImage: `url(${logo})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: window.innerHeight
      }

    },
    content: {
      height: window.innerHeight,
      width: pageWidth,
      backgroundColor:'rgb(255 255 255 / 78%)'
    }
  }



  return (<div style={styles.page(direction === 'left' ? 'right' : 'left')} >
    <div style={styles.content}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Food" element={<Food />} />
        <Route path="/Forum" element={<Forum />} />
        <Route path="/Reports" element={<Reports />} />
      </Routes>
    </div>
  </div>)
}
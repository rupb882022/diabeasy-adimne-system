import React,{useLayoutEffect,useState} from "react";
import * as AiIcons from 'react-icons/ai'
import { GiRiceCooker } from 'react-icons/gi'
import { Route, Routes } from 'react-router-dom';
import Home from '../Pages/Home.jsx';
import SecoundPage from '../Pages/SecoundPage/SecoundPage.jsx';

export const SidebarLayout = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        ClassName: 'nav-text'
    },
    {
        title: 'secound page',
        path: '/SecoundPage',
        icon: <GiRiceCooker />,
        ClassName: 'nav-text'
    },
]

export default function Page(props) {

    const [screenSize, setScreenSize] = useState(window.innerWidth);
    const {navMenuExpended,direction}=props
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
        page:(dir)=> {
          return{
            'textAlign': 'center',
          'alignItems': 'center',
          'alignSelf': 'center',
          'transition': '850ms',
          'zIndex': -1,
          'animationDirection': 'alternate',
          'float': dir,
          width:pageWidth,
          padding:'0px 10px'
        }
        }
      }


      
    return (<div style={styles.page(direction==='left'?'right':'left')} >
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/SecoundPage" element={<SecoundPage />} />
        </Routes>
    </div>)
}
import './Sidebar.css';
import { Button } from 'react-bootstrap';
import { AiOutlineGlobal } from "react-icons/ai";

export default function Header(props) {
  const {  setUserIsLogIn, userIsLogIn,setDirection,direction } = props
  const styels = {
    Container: {
      width: '100%',
      height: '45px',
      'backgroundColor':'rgb(142 163 253)',
    },
    logOut:(dir)=> {
      return{ 
        color: 'white',
      float: dir,
      padding: '3px',
      margin: '5px',
      borderColor:'#526bfe00',
      backgroundColor:'#526bfe00',
      fontWeight: 'bold'
    }
    },
    globalIcon:(dir)=>{
      return{
      color: 'white',
      float: dir,
      margin: '11px 0 2px',
      fontSize: '22px',
      cursor: 'pointer'
    }
    }
  }

  const handelLogOut=async()=>{
    localStorage.removeItem("userDetails")
    setUserIsLogIn(false)
  }
  
  return (
    <div style={styels.Container}>
      {userIsLogIn && <><Button className='logOut' style={styels.logOut(direction==='left'?'right':'left')} onClick={() => {handelLogOut();  }}>
        log out
      </Button>
            <span
            onClick={()=>{setDirection(direction==='left'?'right':'left')}}
            className='logOut'>
            <AiOutlineGlobal
            style={styels.globalIcon(direction==='left'?'right':'left')}
            />
            </span>
            </>
      }

    </div>)
}
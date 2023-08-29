import React, { useState } from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'
import * as FaIcons from "react-icons/fa";
import * as AIIcons from "react-icons/ai";
import { SidebarData } from './SidebarData';
import { IconContext } from 'react-icons';



const Navbar = ({ onRouteChange, isSignedIn }) => {
  const [sidebar, setSidebar] = useState(false)

  const showSidebar = function () { setSidebar(!sidebar) }

  if (isSignedIn) {
    return (
      <div>
        <IconContext.Provider value={{ color: '#fff' }}>
          <div className='navbar'>
            <Link to="#" className='menu-bars'>
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
          </div>
          <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items' onClick={showSidebar}>
              <li className="navbar-toggle">
                <Link to="#" className='menu-bars'>
                  <AIIcons.AiOutlineClose />
                </Link>
              </li>
              {SidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName} onClick={() => onRouteChange(item.path)}>
                    <a>
                      {item.icon}
                      <span> {item.title} </span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>
        </IconContext.Provider>
      </div>
    )
  } else {
    return (
      <div className='navbar'></div>
    )
  }
}

export default Navbar
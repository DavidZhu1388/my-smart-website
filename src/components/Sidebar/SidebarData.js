import * as FaIcons from "react-icons/fa";
import * as AIIcons from "react-icons/ai";
import React from 'react'

export const SidebarData = [
    {
        title: 'Home',
        path: 'home',
        icon: <AIIcons.AiFillHome />,
        cName: 'nav-text'
    },

    {
        title: 'History',
        path: 'history',
        icon: <FaIcons.FaHistory />,
        cName: 'nav-text'
    },

    {
        title: 'Sign Out',
        path: 'signin',
        icon: <FaIcons.FaSignOutAlt />,
        cName: 'nav-text'
    }
]

import React from 'react'
import {Link, NavLink} from 'react-router-dom'


const Nav = () => {
    return (
        <nav>
            <ul>
                <Link to={'/'}><li>Home</li></Link>
                <Link to={'/create'}><li>Create</li></Link>
            </ul>
        </nav>
    )
}

export default Nav
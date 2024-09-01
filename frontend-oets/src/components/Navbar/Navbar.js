import React from 'react'
import '../Navbar/Navbar.css'
import Logo from '../../Images/logo2.jfif'
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='navbar-section'>
            <ul>
                <img Src={Logo} className='logo'></img>

                <li>
                    <Link to="/register">Register
                    </Link>
                </li>
                <li>Expenses</li>
                <li>Incomes</li>
                <li>Feedback</li>
                <li>Logout</li>

            </ul>

        </div>

    )
}

export default Navbar
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
                    <Link to="/home" className="link-no-underline">Home
                    </Link>
                </li>
                <li>
                    <Link to="/register" className="link-no-underline">Register
                    </Link>
                </li>
                <li>
                    <Link to="/expense" className="link-no-underline">Expenses
                    </Link>
                </li>
                <li>
                    <Link to="/income" className="link-no-underline">Incomes
                    </Link>
                </li>
                <li>
                    <Link to="/feedback" className="link-no-underline">Feedback
                    </Link>
                </li>
                <li>
                    <Link to="/logout" className="link-no-underline">Logout
                    </Link>
                </li>

            </ul>

        </div>

    )
}

export default Navbar
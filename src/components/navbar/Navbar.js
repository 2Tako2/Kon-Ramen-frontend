import React, {useState} from 'react';
import './Navbar.css';
import {Link} from 'react-router-dom';
import logo from '../../imgs/logo.png';
import {GiHamburgerMenu, GiNoodles} from 'react-icons/gi';
import {IoCloseSharp} from 'react-icons/io5';
import {BiLogOut, BiLogIn} from 'react-icons/bi';
// import {MdAccountCircle} from 'react-icons/md';
import {HiHome} from 'react-icons/hi';

export default function Navbar ({authenticated, handleLogout}) {
    const [navbar, setNavbar] = useState(true)

    window.addEventListener('resize', () => (window.innerWidth <= 500) ? setNavbar(false) : setNavbar(true))
    return(
        <nav>
            <div className='nav-container'>
                <div className='logo-container'>
                    <Link to='/'>
                        <img className='logo' src={logo} alt='KON Ramen Logo' />
                    </Link>
                    <button className='menu-btn' onClick={() => setNavbar(!navbar)}>
                        { navbar ? <IoCloseSharp /> : <GiHamburgerMenu /> }
                    </button>
                    {navbar}
                </div>
                <div className='nav-links-container'>
                    <ul className={navbar ? 'nav-links' : 'nav-links hide-nav'}>
                        <li className='nav-link'>
                            <Link to='/'>
                                <HiHome className='nav-icon'/>
                                <p className='nav-link-name'>Home</p>
                            </Link>
                        </li>
                        <li className='nav-link'>
                            <Link to='/order'>
                                <GiNoodles className='nav-icon'/>
                                <p className='nav-link-name'>Order Online Now!</p>
                            </Link>
                        </li>
                        {/* {authenticated &&
                            <li className='nav-link'>
                                <Link to='/user/edit'>
                                    <MdAccountCircle className='nav-icon' />
                                    <p className='nav-link-name'>Edit Account</p>
                                </Link>
                            </li>
                        } */}
                        <li className='nav-link'>
                            {authenticated ? 
                                <button
                                    className='logout-btn'
                                    onClick={handleLogout}
                                >
                                    <BiLogOut className='nav-icon' />
                                    <p className='nav-link-name'>Log Out</p>
                                </button> :
                                <Link to='/users/login'>
                                    <BiLogIn className='nav-icon' />
                                    <p className='nav-link-name'>Log In</p>
                                </Link>
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
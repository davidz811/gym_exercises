import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { Stack } from '@mui/material';
import Logo from '../assets/icons/main-icon.png';
import '../App';
import { useLocation } from 'react-router-dom';
import { useGlobalContext2 } from './contextForPrevious';
import { signOut } from 'firebase/auth';
import { database } from '../Firebase/FirebaseConfig';
import dropdown from '../assets/images/dropdown.png';


const Navbar = () => {
    const { pathname } = useLocation();
    const { setPrevPage, isLoggedIn, setIsLoggedIn } = useGlobalContext2();
    const [showDropdown, setShowDropdown] = useState(false);
    const btnRef = useRef();
    const navigate = useNavigate();

    function closeDropdown() {
        setShowDropdown(false);
    }

    useEffect(() => {
        function closeDropdown(e) {
            if (e.target !== btnRef.current) {
                setShowDropdown(false);
            }
        }
        document.body.addEventListener('click', closeDropdown);

        return () => document.body.removeEventListener('click', closeDropdown)
    }, [])

    function handleSignOut() {
        signOut(database).then(data => {
            if (pathname === 'exercises') {
                navigate("/exercises");
            }
            else {
                if (pathname === 'workouts') {
                    navigate("/workouts");
                }
            }
        }
        )
        setIsLoggedIn(false);
    }

    return (
        <nav className='navbar'>
            <div className='first'>
                <NavLink to="/">
                    <img src={Logo} className='biceps-img' />
                </NavLink>

                <div className='navbar-menu'>
                    <NavLink to={"/"} className='nav-link'>
                        Home
                    </NavLink>
                    <NavLink to={"/exercises"} className='nav-link'>
                        Exercises
                    </NavLink>
                    <NavLink to={"/bmi"} className='nav-link'>
                        BMI Calculator
                    </NavLink>

                    <div class="relative inline-block text-left">
                        <div>
                            {/* set ref property to the button */}
                            <button ref={btnRef} onClick={() => setShowDropdown(!showDropdown)} type="button" class="inline-flex w-full justify-center rounded-md px-3 py-2 text-white focus:outline-none" id="menu-button" aria-expanded="true" aria-haspopup="true">
                                Explore Workouts
                                <svg class="-mr-1 h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </div>

                        {showDropdown &&
                            <div class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                                <div class="py-1" role="none">
                                    <NavLink to={"/workouts"} className='nav-link text-black'>
                                        Workouts
                                    </NavLink>
                                    {isLoggedIn ? (
                                        <NavLink to={"/create-workouts"} className='nav-link text-black'>
                                            Create Workouts
                                        </NavLink>
                                    ) : ''}
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className='sign-container nav-link text-2xl'>
                {!isLoggedIn ? (
                    <NavLink to={`/signInUp?prev=${pathname}`} onClick={setPrevPage(pathname)}>
                        SignIn
                    </NavLink>
                ) : (
                    isLoggedIn &&
                    <button className='nav-link sign-out' onClick={handleSignOut}>
                        SignOut
                    </button>
                )
                }
            </div>
            <button className='navbar-icon'>
                <img src={dropdown} />
            </button>
        </nav>
    )
}

export default Navbar
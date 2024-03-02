import React, { useState } from 'react';
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
    const navigate = useNavigate();

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

                    <div class="dropdown dropdown-button">
                        <button class="btn btn-secondary nav-link dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Dropdown Button
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <NavLink to={"/workouts"} className='nav-link dropdown-item'>
                                Workouts
                            </NavLink>
                            <NavLink to={"/create-workouts"} className='nav-link dropdown-item'>
                                Create Workouts
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
            <div className='sign-container'>
                {!isLoggedIn && (
                    <NavLink to={`/signInUp?prev=${pathname}`} onClick={setPrevPage(pathname)} className='nav-link'>
                        SignIn
                    </NavLink>
                )
                }
                {isLoggedIn &&
                    <button className='nav-link sign-out' onClick={handleSignOut}>
                        SignOut
                    </button>
                }
            </div>
            <button className='navbar-icon'>
                <img src={dropdown} />
            </button>
        </nav>
    )
}

export default Navbar
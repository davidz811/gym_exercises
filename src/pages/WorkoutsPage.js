import React, { useEffect, useState } from 'react'
import { fetchData } from '../utils/fetchData'
import AllWorkouts from '../components/AllWorkouts'
import AppProvider2, { useGlobalContext2 } from '../components/contextForPrevious'
import EasyWorkoutsOnly from '../components/EasyWorkoutsOnly'
import { Link } from 'react-router-dom'


export const WorkoutsPage = () => {
    const { isLoggedIn, setIsLoggedIn } = useGlobalContext2();

    return (
        <>
            <AppProvider2>
                {isLoggedIn ? (
                    <div>
                        <AllWorkouts />
                    </div>
                ) : (
                    <>
                        <EasyWorkoutsOnly />
                        <div className='findOutMoreContainer'>
                            <Link to={'/signInUp'} className='findOutMoreLink'>
                                <button className='findOutMoreButton'>
                                    Sign in to explore more Workouts
                                </button>
                            </Link>
                        </div>
                    </>
                )}
            </AppProvider2>
        </>
    )
}
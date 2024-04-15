import React from 'react';
import gymLogo from '../assets/icons/main-icon.png'
import heart from '../assets/icons/heart-icon.png'
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='bg-black my-3'>
            <div className='p-10 text-white'>
                <div className='flex justify-between'>
                    <div className='flex items-center'>
                        <img src={gymLogo} className='gym-logo rounded-lg' alt='Gym Logo' />
                        <p className='font-serif text-xl mx-4'>David's Gym</p>
                    </div>
                    <div className='flex'>
                        <Link to={'/'}>Home</Link>
                        <Link to={'/exercises'} className='px-4'>
                            Exercises
                        </Link>
                        <Link to={'/bmi'}>BMI Calculator</Link>
                        <Link to={'/workouts'} className='px-4'>
                            Workouts
                        </Link>
                        <Link to={'/create-workouts'}>Create Workout</Link>
                    </div>
                </div>

                <div className='w-full flex'>
                    <div className='w-96 py-6 font-serif'>
                        <p>Start your fitness journey with David's Gym. Explore expert-designed workouts for all levels and goals, from strength training to cardio. Your path to a healthier, stronger you starts here!</p>
                    </div>
                    <div className='w-full flex flex-col py-5'>
                        <p className='text-end py-2'>Sign Up to find out more</p>
                        <div className='flex justify-end'>
                            <button className='bg-[#FF2625] h-10 w-20 rounded-lg'>
                                <Link to={'/signInUp'}>
                                    Sign Up
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer
import React from 'react';
import backgroundImg from '../assets/images/bmg-main.jpeg'
import { Link } from 'react-router-dom';
import '../App.css'

const HeroBanner = () => {
    return (
        <div className='container'>
            <p className='getfit'>Get Fit</p>
            <h1 className='lifestyle'>Where Fitness <br /> Becomes Your <br /> Lifestyle</h1>
            <p className='checkexercises'>Check out the most effective excercises</p>
            <div className='buttons-container'>
                <Link to={"/exercises"}>
                    <button className='explore-button'>
                        Explore Exercises
                    </button>
                </Link>
                <Link to={"/workouts"}>
                    <button className='explore-button'>
                        Explore Workouts
                    </button>
                </Link>
            </div>
            <img src={backgroundImg} className='background-img' />
        </div >
    )
}


export default HeroBanner
import React from 'react'
import backExercise from '../assets/images/backExercise.gif';
import cardioExercise from '../assets/images/cardioExercise.gif';
import chestExercise from '../assets/images/chestExercise.gif';
import lowerArmsExercise from '../assets/images/lowerArmsExercise.gif';
import lowerLegsExercise from '../assets/images/lowerLegsExercise.gif';
import shoulderExercise from '../assets/images/shoulderExercise.gif';
import upperArmsExercise from '../assets/images/upperArmsExercise.gif';
import upperLegsExercise from '../assets/images/upperLegsExercise.gif';
import waistExercise from '../assets/images/waistExercise.gif';
import { Link } from 'react-router-dom';

//add back exercise image!
const DefaultExercises = () => {
    return (
        <>
            <div className='defaultExercisesContainer'>
                <img src={backExercise} className='defaultExercise' />
                <img src={cardioExercise} className='defaultExercise' />
                <img src={chestExercise} className='defaultExercise' />
                <img src={lowerArmsExercise} className='defaultExercise' />
                <img src={lowerLegsExercise} className='defaultExercise' />
                <img src={shoulderExercise} className='defaultExercise' />
                <img src={upperArmsExercise} className='defaultExercise' />
                <img src={upperLegsExercise} className='defaultExercise' />
                <img src={waistExercise} className='defaultExercise' />
            </div>
            <div className='findOutMoreContainer'>
                <Link to="/signInUp" className='findOutMoreLink'>
                    <button className='findOutMoreButton'>
                        Sign in to find out more
                    </button>
                </Link>
            </div>
        </>
    )
}

export default DefaultExercises
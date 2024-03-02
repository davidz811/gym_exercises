import { Link } from 'react-router-dom'
import React from 'react'

const EasyWorkoutCard = ({ easyWorkout }) => {

    return (
        <Link className='workout-link' to={`/easyWorkouts/${easyWorkout.workout_id}`}>
            <img src={easyWorkout.gif_url} className='workout-image' />
            <p className='workout-text'>{easyWorkout.name}</p>
        </Link>
    )
}

export default EasyWorkoutCard
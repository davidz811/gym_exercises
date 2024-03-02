import React from 'react'
import { Link } from 'react-router-dom'


const WorkoutCard = ({ workout }) => {

    return (
        <Link className='workout-link' to={`/workouts/${workout.workout_id}`}>
            <img src={workout.gif_url} className='workout-image' />
            <p className='workout-text'>{workout.name}</p>
        </Link>
    )
}

export default WorkoutCard
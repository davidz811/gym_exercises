import React, { useEffect, useState } from 'react'

const ExercisesForWorkout = ({ workoutExercise }) => {

    // console.log(workoutExercise.exercise_name);
    return (
        <>
            <div className='exercise'>
                <img src={workoutExercise.exercises_gif_url} className='exercise-image-workout' />
                <p className='exercise-text'>{workoutExercise.exercise_name}</p>
                <div className='sets-reps-duration'>
                    <p className='  sets-reps-duration-details'>
                        {workoutExercise.sets}
                        <span className='x'>
                            x   
                        </span>
                        {workoutExercise.reps}
                        reps
                        <span className='.'>
                            *
                        </span>
                        {workoutExercise.exercise_duration}
                        s
                    </p>
                </div>
                <div className='rest-time'>
                    <p>rest: {workoutExercise.rest_time}s</p>
                </div>
                <div className='equipment'>
                    <p>equipment needed: {workoutExercise.equipment}</p>
                </div>
            </div>
        </>
    )
}

export default ExercisesForWorkout
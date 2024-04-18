import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ExercisesForWorkout = ({ workoutExercise, onDelete, isLoggedIn }) => {
    // console.log(workoutExercise);

    async function handleDelete(exerciseId) {
        try {
            const response = await axios.delete(`http://localhost:3000/workouts/deleteExercise/${exerciseId}`)
            console.log("Exercise deleted successfully: ", response.data);
            onDelete(exerciseId);
        } catch (error) {
            console.log("Error deleting exercise", error);
        }
    }

    return (
        <>
            <div className='exercise'>
                <img src={workoutExercise.exercises_gif_url} className='w-40' />
                <p className='exercise-text'>{workoutExercise.exercise_name}</p>
                <div className='sets-reps-duration'>
                    <p className='sets-reps-duration-details'>
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
                {workoutExercise.exercise_id > 87 && isLoggedIn ? (
                    <button
                        className='absolute right-0 mb-16 px-2 py-1 bg-red-500 text-white rounded'
                        onClick={() => handleDelete(workoutExercise.exercise_id)}
                    >
                        Remove
                    </button>
                ) : ''
                }
            </div>
        </>
    )
}

export default ExercisesForWorkout
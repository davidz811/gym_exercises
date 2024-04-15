import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ExercisesForWorkout from '../components/ExercisesForWorkout';
import { Link } from 'react-router-dom';
import { useGlobalContext2 } from '../components/contextForPrevious';

const WorkoutDetails = () => {
    const { workout_id } = useParams();
    const [workoutExercises, setWorkoutExercises] = useState([]);
    const [workoutName, setWorkoutName] = useState("");
    const { isLoggedIn, setIsLoggedIn } = useGlobalContext2();
    // console.log(isLoggedIn);

    useEffect(() => {
        async function fetchWorkoutExercises() {
            const response = await fetch(`http://localhost:3000/workouts/workoutId/${workout_id}`);
            const myExercises = await response.json();
            setWorkoutExercises(myExercises);
        }
        fetchWorkoutExercises();
    }, [workout_id])
    console.log(workoutExercises);

    useEffect(() => {
        if (workoutExercises.length > 0)
            setWorkoutName(workoutExercises[0].name);
    })

    console.log(workoutExercises.length)
    return (
        <div className='workoutExercises-container'>
            <p className='workout-title py-3'>{workoutName}</p>
            {workoutExercises.map((workoutExercise, index) => (
                <div className={index % 2 !== 0 ? '' : 'bg-slate-200'}>
                    <ExercisesForWorkout key={workoutExercise.workout_id} workoutExercise={workoutExercise} />
                </div>
            ))}
            {isLoggedIn ? (
                <Link to={`/createExercise/${workout_id}`}>
                    <button>Add Exercise</button>
                </Link>
            ) : ''
            }
        </div>
    )
}

export default WorkoutDetails
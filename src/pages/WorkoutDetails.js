import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ExercisesForWorkout from '../components/ExercisesForWorkout';
import { Link } from 'react-router-dom';

const WorkoutDetails = () => {
    const { workout_id } = useParams();
    const [workoutExercises, setWorkoutExercises] = useState([]);
    const [workoutName, setWorkoutName] = useState("");

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

    return (
        <div className='workoutExercises-container'>
            <p className='workout-title'>{workoutName}</p>
            {workoutExercises.map((workoutExercise) => (
                <ExercisesForWorkout key={workoutExercise.workout_id} workoutExercise={workoutExercise} />
            ))}
            <Link to={"/createExercise"}>
                <button>Add Exercise</button>
            </Link>
        </div>
    )
}

export default WorkoutDetails
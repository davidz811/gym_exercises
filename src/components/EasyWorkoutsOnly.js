import React, { useEffect, useState } from 'react'
import EasyWorkoutCard from './EasyWorkoutCard';

const EasyWorkoutsOnly = () => {
    const [easyWorkoutsData, setEasyWorkoutsData] = useState([]);

    useEffect(() => {
        async function fetchEasyWorkouts() {
            const response = await fetch('http://localhost:3000/workouts/easyWorkouts');
            const easyWorkouts = await response.json();
            setEasyWorkoutsData(easyWorkouts);
            console.log(easyWorkoutsData);
        }
        fetchEasyWorkouts();
    }, [])


    return (
        <div className='workouts-container'>
            {easyWorkoutsData.map((easyWorkout) => (
                <EasyWorkoutCard key={easyWorkout.workout_id} easyWorkout={easyWorkout} />
            ))}
        </div>
    )
}

export default EasyWorkoutsOnly
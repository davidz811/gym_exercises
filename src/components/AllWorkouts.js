import React, { useEffect, useState } from 'react'
import WorkoutCard from './WorkoutCard';


const AllWorkouts = () => {
    const [workoutsData, setWorkoutsData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const carsOnPage = 6;

    useEffect(() => {
        async function fetchWorkoutsData() {
            const response = await fetch('http://localhost:3000/workouts/workouts');
            const workouts = await response.json();
            setWorkoutsData(workouts);
        }
        fetchWorkoutsData();
    }, []);

    const indexOfLastPage = carsOnPage * currentPage;
    const indexOfFirstPage = indexOfLastPage - carsOnPage;

    const exercisesOnPage = workoutsData.slice(indexOfFirstPage, indexOfLastPage);

    console.log('Exercises on page :', exercisesOnPage);

    function handleNextPage() {
        setCurrentPage(currentPage + 1);
    }

    function handlePrevPage() {
        setCurrentPage(currentPage - 1);
    }


    return (
        <div className='workouts-container'>
            {exercisesOnPage.map((workout) => (
                <WorkoutCard key={workout.workout_id} workout={workout} />
            ))}
            <div className='next-prev'>
                <button className='next-btn' onClick={handleNextPage} disabled={indexOfLastPage >= workoutsData.length}>
                    Next
                </button>
                <button className='prev-btn' onClick={handlePrevPage} disabled={currentPage === 1}>
                    Prev
                </button>
            </div>
        </div>
    )
}

export default AllWorkouts
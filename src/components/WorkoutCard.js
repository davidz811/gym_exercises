import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { MdDelete } from "react-icons/md";
import axios from 'axios';

const WorkoutCard = ({ workout }) => {
    const [deleteButtonClicked, setDeleteButtonClicked] = useState(false);

    async function deleteWorkout() {
        try {
            const deleteEndpoint = await axios.delete(`http://localhost:3000/workouts/deleteWorkout/${workout.workout_id}`)
            console.log(deleteEndpoint.data);
            setDeleteButtonClicked(true);
        }
        catch (e) {
            console.log("Error deleting workout", e);
        }
    }

    return (
        <div>
            <Link className='workout-link' to={`/workouts/${workout.workout_id}`}>
                <div className='relative workout-image'>
                    <img src={workout.gif_url} className='w-full h-full object-cover' />
                    {workout.workout_id > 12 ? (
                        <button onClick={deleteWorkout} className="absolute top-0 right-0 bg-slate-800 text-white p-2 rounded hover:bg-[#FF2625] m-2">
                            <MdDelete />
                        </button>
                    ) : ''}
                </div>
                <p className='workout-text'>{workout.name}</p>
            </Link>
        </div>
    );
}

export default WorkoutCard
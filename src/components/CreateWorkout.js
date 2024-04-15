import React, { useEffect, useState } from 'react';
import wimg from '../assets/images/Main-background.jpg';
import axios from 'axios';

const CreateWorkout = () => {
    const [workoutData, setWorkoutData] = useState(
        {
            name: '',
            gif_url: '',
        }
    );

    function handleInputChange(e) {
        e.preventDefault();
        const { name, value } = e.target;

        setWorkoutData({
            ...workoutData,
            [name]: value
        })
        console.log(workoutData);
    }

    //function for adding workouts
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/workouts/createWorkouts', workoutData);

            if (response.status === 201) {
                const addedWorkout = response.data;
                console.log('Workout created successfully!', addedWorkout);
            } else {
                console.error('Failed to create workout');
            }
        } catch (error) {
            console.error('Error creating workout:', error);
        }
    }

    return (
        <div className='w-full h-screen'>
            <h2 className='text-center text-3xl font-semibold py-8'>Create your own Workout</h2>
            <div className='flex justify-center'>
                <form onSubmit={handleSubmit} className='flex flex-col min-w-[450px] my-10'>
                    <input
                        type='text'
                        placeholder='Name'
                        name='name'
                        value={workoutData.name}
                        className='w-full p-2 text-center bg-slate-200'
                        onChange={handleInputChange}
                    />
                    <input
                        type='text'
                        placeholder='gif_url'
                        name='gif_url'
                        value={workoutData.gif_url}
                        className='w-full p-2 text-center my-3 bg-slate-200'
                        onChange={handleInputChange}
                    />
                    <div className='flex justify-center my-4'>
                        <button className='p-2 bg-[#FF2625] text-white rounded-lg'>
                            Create Workout
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateWorkout
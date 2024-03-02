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
            [name]: value,
        })
        // console.log(workoutData);
    }

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
        <div className='create-workout-container'>
            <h2 className='create-workout'>Create your own Workout</h2>
            <div className='create-workout-form'>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        placeholder='Name'
                        name='name'
                        value={workoutData.name}
                        className='name-gif_url-input'
                        onChange={handleInputChange}
                    />
                    <br />
                    <input
                        type='text'
                        placeholder='gif_url'
                        name='gif_url'
                        value={workoutData.gif_url}
                        className='name-gif_url-input'
                        onChange={handleInputChange}
                    />
                    <div className='create-button-cont'>
                        <button className='create-button'>
                            Create Workout
                        </button>
                    </div>
                </form>
            </div>
            <img src={wimg} className='background-img' />
        </div>
    )
}

export default CreateWorkout
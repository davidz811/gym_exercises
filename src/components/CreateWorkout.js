import React, { useEffect, useState } from 'react';
import wimg from '../assets/images/Main-background.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateWorkout = () => {
    const navigate = useNavigate();
    const [workoutData, setWorkoutData] = useState(
        {
            name: '',
            gif_url: '',
        }
    );
    const [displayImage, setDisplayImage] = useState(false);

    function handleInputChange(e) {
        const { name, value } = e.target;

        setWorkoutData({
            ...workoutData,
            [name]: value
        })
        if (name === 'gif_url' && value.trim() !== '') {
            setDisplayImage(true);
        }
        //console.log(displayImage);
        //console.log(workoutData);
    }

    //function for adding workouts
    async function handleSubmit(e) {
        e.preventDefault();

        if (!workoutData.name.trim() || !workoutData.gif_url.trim()) {
            toast.error('Please provide a name and gif_url for the workout');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/workouts/createWorkouts', workoutData);

            if (response.status === 201) {
                const addedWorkout = response.data;
                console.log('Workout created successfully!', addedWorkout);
                setWorkoutData(
                    {
                        name: '',
                        gif_url: ''
                    }
                )
                navigate('/workouts');
            } else {
                console.error('Failed to create workout');
            }
        } catch (error) {
            console.error('Error creating workout:', error);
            toast.error('Failed to create workout.');
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
                    {
                        displayImage && workoutData.gif_url.trim() !== '' && (
                            <img src={workoutData.gif_url} className='w-full my-3' />
                        )
                    }
                    <div className='flex justify-center my-4'>
                        <button type='submit' className='p-2 bg-[#FF2625] text-white rounded-lg'>
                            Create Workout
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    )
}

export default CreateWorkout
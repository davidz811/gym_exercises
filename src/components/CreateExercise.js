import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateExercise = () => {
    const { workoutId } = useParams();
    //console.log(workoutId);
    const [exerciseData, setExerciseData] = useState(
        {
            imageUrl: '',
            exerciseName: '',
            sets: '',
            reps: '',
            duration: '',
            restTime: '',
            equipment: '',
            workoutId: '',
        }
    );
    const [displayImage, setDisplayImage] = useState(false);
    const navigate = useNavigate();

    function handleInputChange(e) {
        const { name, value } = e.target;

        setExerciseData({
            ...exerciseData,
            [name]: value,
        })

        if (name === 'imageUrl' && value.trim() !== '') {
            setDisplayImage(true);
        }
        console.log(exerciseData);
    }


    async function handleSubmit(e) {
        e.preventDefault();

        if (!exerciseData.imageUrl || !exerciseData.exerciseName || !exerciseData.sets || !exerciseData.reps || !exerciseData.duration || !exerciseData.restTime || !exerciseData.equipment) {
            toast.error('Please fill in all fields to add an exercise to a workout');
        }

        try {
            //data being sent with the request is contained in the exerciseData object.
            const response = await axios.post(`http://localhost:3000/workouts/createExercise/${workoutId}`, exerciseData);

            if (response.status === 201) {
                const addedExercise = response.data;
                console.log("Exercise created successfully ", addedExercise);
                navigate(`/workouts/${workoutId}`)
            } else {
                console.log("Exercise not successfully created");
            }
        }
        catch (error) {
            console.log("Error creating exercise: ", error);
            toast.error('Error creating exercise');
        }
    }

    //form to fill for adding an exercise
    return (
        <div className='w-full h-screen'>
            <h2 className='text-center text-3xl font-semibold py-8'>Add an Exercise to your Workout</h2>
            <div className='flex justify-center'>
                <form className='flex flex-col min-w-[450px] my-10' onSubmit={handleSubmit}>
                    <input
                        type='text'
                        placeholder='Image Url'
                        name='imageUrl'
                        value={exerciseData.imageUrl}
                        className='w-full p-2 text-center bg-slate-200'
                        onChange={handleInputChange}
                    />
                    {displayImage && exerciseData.imageUrl.trim() !== '' && (
                        <img src={exerciseData.imageUrl} className="w-full my-3" />
                    )}
                    <input
                        type='text'
                        placeholder='Exercise Name'
                        name='exerciseName'
                        value={exerciseData.exerciseName}
                        className='w-full p-2 text-center my-3 bg-slate-200'
                        onChange={handleInputChange}
                    />
                    <input
                        type='text'
                        placeholder='Sets'
                        name='sets'
                        value={exerciseData.sets}
                        className='w-full p-2 text-center bg-slate-200'
                        onChange={handleInputChange}
                    />
                    <input
                        type='text'
                        placeholder='Reps'
                        name='reps'
                        value={exerciseData.reps}
                        className='w-full p-2 text-center bg-slate-200 my-3'
                        onChange={handleInputChange}
                    />
                    <input
                        type='text'
                        placeholder='Duration'
                        name='duration'
                        value={exerciseData.duration}
                        className='w-full p-2 text-center bg-slate-200'
                        onChange={handleInputChange}
                    />
                    <input
                        type='text'
                        placeholder='Rest: Time s'
                        name='restTime'
                        value={exerciseData.restTime}
                        className='w-full p-2 text-center my-3 bg-slate-200'
                        onChange={handleInputChange}
                    />
                    <input
                        type='text'
                        placeholder='Equipment Needed:'
                        name='equipment'
                        value={exerciseData.equipment}
                        className='w-full p-2 text-center bg-slate-200'
                        onChange={handleInputChange}
                    />
                    <div className='flex justify-center my-4'>
                        <button className='p-2 bg-[#FF2625] text-white rounded-lg'>
                            Add Exercise
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    )
}

export default CreateExercise
import React, { useEffect, useState } from 'react'
import { Details } from '../components/Details.js'
import { SimilarExercises } from '../components/SimilarExercises.js'
import { fetchData } from '../utils/fetchData.js'
import { exerciseOptions } from '../utils/fetchData.js'
import { useParams } from 'react-router-dom'


const ExerciseDetail = () => {
    const { id } = useParams();
    const [exerciseData, setExerciseData] = useState({});

    useEffect(() => {
        async function fetchExerciseData() {
            const selectedExerciseData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`, exerciseOptions);
            setExerciseData(selectedExerciseData);
        }
        fetchExerciseData();
    }, [id])
    console.log(exerciseData);

    return (
        <div>
            <Details exerciseData={exerciseData} />
            <SimilarExercises />
        </div>
    )
}

export default ExerciseDetail
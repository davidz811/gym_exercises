import React, { useEffect, useState } from 'react'
import { Details } from '../components/Details.js'
import { SimilarExercises, VideoExercises } from '../components/VideoExercises.js'
import { fetchData, youtubeOptions } from '../utils/fetchData.js'
import { exerciseOptions } from '../utils/fetchData.js'
import { useParams } from 'react-router-dom'


const ExerciseDetail = () => {
    const { id } = useParams();
    const [exerciseData, setExerciseData] = useState({});
    const [exerciseVideos, setExerciseVideos] = useState([]);

    useEffect(() => {
        async function fetchExerciseData() {
            const selectedExerciseData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`, exerciseOptions);
            setExerciseData(selectedExerciseData);
            const exerciseVideo = await fetchData(`https://youtube-search-and-download.p.rapidapi.com/search?query=${selectedExerciseData.name}`, youtubeOptions);
            setExerciseVideos(exerciseVideo);
        }
        fetchExerciseData();
    }, [id])
    console.log(exerciseData);

    return (
        <div>
            <Details exerciseData={exerciseData} />
            <VideoExercises exerciseVideos={exerciseVideos} name={exerciseData.name} />
        </div>
    )
}

export default ExerciseDetail
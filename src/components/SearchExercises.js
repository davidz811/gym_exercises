import React, { useEffect, useState } from 'react'
import { Box, Button } from '@mui/material'
import { fetchData, exerciseOptions } from '../utils/fetchData';
import BodyPartsScrollbar from './BodyPartsScrollbar';
import { useGlobalContext } from './context';


export default function SearchExercises() {
    const { exercises, setExercises, selectedBodyPart, setSelectedBodyPart } = useGlobalContext();
    const [search, setSearch] = useState('');
    const [bodyPartsData, setBodyPartsData] = useState([]);
    const [error, setError] = useState(false);


    //for fetching categories
    useEffect(() => {
        async function fetchBodyPartsData() {
            const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);

            setBodyPartsData(['all', ...bodyPartsData]);
        }
        fetchBodyPartsData();
    }, [])
    //console.log(bodyPartsData); //all bodyParts


    function validateInput(e) {
        e.preventDefault();

        let myExercises = (exercises.map((exercise) => (exercise.name.toLowerCase().includes(search))))
        if (search === '' || !(bodyPartsData.includes(search)) || !(myExercises)) {
            setError(true);
        }
    }


    async function handleSearch() {
        if (search) {
            setError(false);
            const exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises?limit=900', exerciseOptions);
            //console.log(exercisesData);

            const searchedExercises = exercisesData.filter((exercise) =>
                exercise.name.toLowerCase().includes(search) ||
                exercise.bodyPart.toLowerCase().includes(search) ||
                exercise.equipment.toLowerCase().includes(search) ||
                exercise.target.toLowerCase().includes(search)
            )
            setSearch('');
            setExercises(searchedExercises);

            //exercises = searchedExercises
        }
    }

    return (
        <div className='main-container'>
            <h1 className='awesomeExercises'>Great Exercises to <br /> Train with</h1>
            <div className='inputContainer'>
                <form onSubmit={validateInput}>
                    <input
                        placeholder='Search Exercises'
                        value={search}
                        onChange={e => setSearch(e.target.value.toLowerCase())}
                        type='text'
                        className='search-input '
                    />
                    <button className='searchButton' onClick={handleSearch}>
                        Search
                    </button>
                    {/* <div className='error'>
                        {error && search.length === 0 ? <label>Please type something</label> : ''}
                    </div> */}

                    <div className='error'>
                        {error ? <label>Please enter a valid value</label> : ''}
                    </div>
                </form>
            </div>
            <div className='scrollbar'>
                <BodyPartsScrollbar data={bodyPartsData} selectedBodyPart={selectedBodyPart} setSelectedBodyPart={setSelectedBodyPart} />
            </div>
        </div>
    )
}
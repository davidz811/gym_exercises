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


    async function handleSearch(e) {
        e.preventDefault();

        if (search) {
            const exercisesData = await fetchData(
                'https://exercisedb.p.rapidapi.com/exercises?limit=900',
                exerciseOptions
            );

            const searchedExercises = exercisesData.filter((exercise) =>
                exercise.name.toLowerCase().includes(search) ||
                exercise.bodyPart.toLowerCase().includes(search) ||
                exercise.equipment.toLowerCase().includes(search) ||
                exercise.target.toLowerCase().includes(search)
            );

            if (searchedExercises.length === 0) {
                setError(true)
            } else {
                setError(false)
            }

            setSearch('');
            setExercises(searchedExercises);
        } else {
            setError(true);
        }
        console.log(error)
    }

    return (
        <div className='main-container'>
            <h1 className='awesomeExercises'>Great Exercises to <br /> Train with</h1>
            <div className='inputContainer'>
                <form onSubmit={handleSearch}>
                    <input
                        placeholder='Search Exercises'
                        value={search}
                        onChange={e => setSearch(e.target.value.toLowerCase())}
                        type='text'
                        className='search-input '
                    />
                    <button className='searchButton'>
                        Search
                    </button>
                    <div className='text-red-700 text-2xl my-3 text-center font-sans'>
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
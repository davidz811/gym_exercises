import React, { useState } from 'react'
import { useEffect } from 'react'
import { useGlobalContext } from './context'
import { exerciseOptions } from '../utils/fetchData';
import { Box, Pagination, Stack, Typography } from '@mui/material';
import ExerciseCard from './ExerciseCard';
import { fetchData } from '../utils/fetchData';


export default function Exercises() {
    const { exercises, setExercises, selectedBodyPart } = useGlobalContext();
    const [currentPage, setCurrentPage] = useState(1);
    const cardsOnPage = 9;

    useEffect(() => {
        async function fetchExercises() {
            let exercisesData = [];

            if (selectedBodyPart === 'all') {
                exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises?limit=900', exerciseOptions);
            }
            else {
                exercisesData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${selectedBodyPart}?limit=900`, exerciseOptions)
                console.log(exercisesData);
            }
            setExercises(exercisesData);
        }
        fetchExercises();
    }, [selectedBodyPart])


    function changePage(e, value) {
        setCurrentPage(value);
    }
    const indexOfLastPage = currentPage * cardsOnPage;
    const indexOfFirstPage = indexOfLastPage - cardsOnPage;

    const currentExercisesOnPage = exercises.slice(indexOfFirstPage, indexOfLastPage);

    return (
        <Box
            sx={{ mt: { lg: '130px' } }}
            id='exercises' >
            <Typography sx={{ fontSize: '50px', fontWeight: '600', mb: '70px', ml: '47px' }}>
                Showing Results
            </Typography>
            <Stack direction='row' flexWrap='wrap' justifyContent='center' sx={{ gap: { lg: '100px', xs: '40px' } }}>
                {currentExercisesOnPage.map((exercise, index) => (
                    <ExerciseCard index={index} exercise={exercise} />
                ))}
            </Stack>
            <Stack sx={{ alignItems: 'center', mt: '100px' }}>
                {exercises.length > 9 && (
                    <Pagination
                        defaultPage={1}
                        count={Math.ceil(exercises.length / cardsOnPage)} //9 cards/page 
                        page={currentPage}
                        onChange={(e, value) => changePage(e, value)}
                    >
                    </Pagination>
                )}
            </Stack>
        </Box >
    )
}

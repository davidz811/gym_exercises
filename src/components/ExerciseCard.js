import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { Stack } from '@mui/material'


export default function ExerciseCard({ exercise }) {
    return (
        <Link className='exercise-card' to={`/exercise/${exercise.id}`} >
            <img src={exercise.gifUrl} loading='lazy' />
            <Stack direction="row">
                <Button sx={{ ml: '18px', mr: '20px', color: "#fff", backgroundColor: '#ffa9a9', borderRadius: '18px', height: '40px', fontSize: '16px', textTransform: 'capitalize' }}>
                    {exercise.bodyPart}
                </Button>
                <Button sx={{ ml: '18px', color: "#fff", backgroundColor: '#fcc757', borderRadius: '18px', height: '40px', textTransform: 'capitalize', fontSize: '16px' }}>
                    {exercise.target}
                </Button>
            </Stack>
            <Typography sx={{ color: 'black', textTransform: 'capitalize', fontSize: '22px', fontWeight: '600', ml: '20px', mt: '25px' }}>
                {exercise.name}
            </Typography>
        </Link>
    )
}
import React from 'react';
import { Stack, Typography } from '@mui/material';
import gymLogo from '../assets/icons/gym.png';


export default function BodyPartCard({ item, selectedBodyPart, setSelectedBodyPart }) {
    return (
        <Stack
            type="button"
            justifyContent='center'
            alignItems='center'
            className='bodyPart-card'
            //if I am on selected bodyPart make a borderTop
            sx={{
                borderTop: selectedBodyPart === item ? '5px solid #ff2625' : '',
                backgroundColor: '#fff',
                borderBottomLeftRadius: '20px',
                width: '270px',
                height: '282px',
                cursor: 'pointer',
                gap: '47px'
            }}
            onClick={() => {
                setSelectedBodyPart(item);  //selectedBodyPart = item
                console.log(item);
                //window.scrollTo({ top: 1800, behavior: 'smooth' })
            }}
        >
            <img src={gymLogo} style={{ height: '40px', width: '40px' }} />
            <Typography sx={{ fontSize: '26px', fontWeight: '500', textTransform: 'capitalize' }}>
                {item}
            </Typography>
        </Stack >
    )
}
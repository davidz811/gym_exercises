import React from 'react'
import target from '../assets/icons/targets.png'


export function Details({ exerciseData }) {
    console.log(exerciseData);

    return (
        <div className='exercise-container'>
            <img src={exerciseData.gifUrl} loading='lazy' className='exercise-image' />
            <div className='exercise-details'>
                <p className='exercise-name'>{exerciseData.name}</p>
                <p className='exercise-instructions'>{exerciseData.instructions}</p>
            </div>
        </div>
    )
}

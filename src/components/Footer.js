import React from 'react';
import gymLogo from '../assets/icons/main-icon.png'
import heart from '../assets/icons/heart-icon.png'

const Footer = () => {
    return (
        <div className='footer-container'>
            <div className='gym-img-text'>
                <img src={gymLogo} className='gym-logo' />
                <p className='david-gym'>David's Gym</p>
            </div>
            <div className='made-by'>
                <p>Made with <img src={heart} className='heart' /> by Coldea David Beniamin</p>
            </div>
        </div>
    )
}

export default Footer
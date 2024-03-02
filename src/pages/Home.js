import React from 'react';
import HeroBanner from '../components/HeroBanner';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const history = useNavigate();

    return (
        <div>
            <HeroBanner />
        </div>
    )
}

export default Home
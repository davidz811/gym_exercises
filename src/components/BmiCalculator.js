import React, { useEffect, useState } from 'react'
import bmi from '../assets/images/bmi-image.jpg'
import underweight from '../assets/images/underweight.png'
import healthy from '../assets/images/healthy.png'
import overweight from '../assets/images/overweight.png'
import { reload } from 'firebase/auth'


const BmiCalculator = () => {
    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [bmiState, setBmiState] = useState("");
    const [message, setMessage] = useState("");
    const [bmiImage, setBmiImage] = useState("");


    useEffect(() => {
        let imgSrc = '';

        if (bmiState !== "") {
            if (bmiState <= 18.5) {
                setMessage("You are underweight");
                imgSrc = underweight;
            }
            if (bmiState > 18.5 && bmiState < 24.9) {
                setMessage("You are in the healthy weight range");
                imgSrc = healthy;
            }
            if (bmiState > 24.9) {
                setMessage("You are overweight");
                imgSrc = overweight;
            }
        }
        setBmiImage(imgSrc);
    }, [bmiState]);


    function calculateBmi(e) {
        //prevent submitting
        e.preventDefault();

        if (weight === 0 || height === 0) {
            if (e.nativeEvent.submitter.name !== 'reloadButton') {
                alert('Please enter a valid weight and height');
            }
        }
        else {
            let bmiValue = (weight / ((height / 100) * (height / 100)));
            const numericBmi = parseFloat(bmiValue.toFixed(1));
            setBmiState(numericBmi);
            // console.log(typeof (bmiState));
        }
    }

    function reload() {
        setHeight(0);
        setWeight(0);
        setBmiImage("");
        setMessage("");
        setBmiState("");
    }

    return (
        <>
            <div className='bmi-container'>
                <div className='secondary-container'>
                    <h2 className='bmi-text'>BMI Calculator</h2>
                    <form className='bmi-form' onSubmit={calculateBmi}>
                        <div className='inside-form'>
                            <label className='label'>Weight (kg)</label>
                            <input
                                type='number' placeholder='Your Weight' value={weight}
                                onChange={(e) => setWeight(e.target.value)} className='bmi-input'
                            />
                        </div>
                        <div className='inside-form'>
                            <label className='label'>Height (cm)</label>
                            <input
                                type='number' placeholder='Your Height' value={height}
                                onChange={(e) => setHeight(e.target.value)} className='bmi-input'
                            />
                        </div>
                        <div className='bmi-buttons'>
                            <button type='submit' className='submit-reload-button'>Submit</button>
                            <button onClick={reload} className='submit-reload-button' name='reloadButton'>Reset</button>
                        </div>
                    </form>
                    <div className='bmiText'>
                        <p className='your-bmi'>Your BMI is: {bmiState}</p>
                        <p className='you-are'>{message}</p>
                    </div>
                    <div className='bmi-photo'>
                        <img src={bmiImage} className='kid-img' />
                    </div>
                </div>
            </div>
            <img src={bmi} className='bmi-img' />
        </>
    )
}

export default BmiCalculator
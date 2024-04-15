import React, { useEffect, useState } from 'react'
import bmi from '../assets/images/my_bmi.jpg'
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

        if ((weight === 0 || height === 0) || (weight < 0 || height < 0)) {
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
            <div className='flex justify-center items-center'>
                <div className='bg-[#f8f8f8] min-w-[500px] my-3'>
                    <h2 className='text-center font-serif text-3xl'>
                        BMI Calculator
                    </h2>
                    <form className='my-3' onSubmit={calculateBmi}>
                        <div className='flex flex-col items-center'>
                            <label>Weight (kg)</label>
                            <input
                                type='number' placeholder='Your Weight' value={weight}
                                onChange={(e) => setWeight(e.target.value)} className='bmi-input'
                            />
                        </div>
                        <div className='flex flex-col items-center py-3'>
                            <label>Height (cm)</label>
                            <input
                                type='number' placeholder='Your Height' value={height}
                                onChange={(e) => setHeight(e.target.value)} className='bmi-input'
                            />
                        </div>
                        <div className='flex h-11 my-3'>
                            <button type='submit'
                                className='w-full bg-[#FF2625] mx-3 text-white text-base rounded-sm text-center border-color-[#FF2625]'>
                                Submit
                            </button>
                            <button onClick={reload} className='w-full bg-[#FF2625] mx-3 text-white text-base rounded-sm text-center border-none' name='reloadButton'>Reset</button>
                        </div>
                    </form>
                    <div className='text-center'>
                        <div>
                            <p className='font-semibold text-2xl'>Your BMI is: {bmiState}</p>
                            <p className='my-2'>{message}</p>
                        </div>
                        <div className='flex justify-center'>
                            <img src={bmiImage} className='max-h-[150px]' />
                        </div>
                    </div>
                </div>
            </div>
            <img src={bmi} className='bmi-img' />
        </>
    )
}

export default BmiCalculator
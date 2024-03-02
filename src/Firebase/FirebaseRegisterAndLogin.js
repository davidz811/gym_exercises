import React, { useEffect, useState } from 'react'
import { database } from '../Firebase/FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import backgroundImg from '../assets/images/bmg-main.jpeg'
import { useGlobalContext2 } from '../components/contextForPrevious';
import ExercisesPage from '../pages/ExercisesPage';
import DefaultExercises from '../components/DefaultExercises';


export const FirebaseRegisterAndLogin = () => {
    //for SignIn and SignUp, login true for SignIn
    const [login, setLogin] = useState(false);
    const { prevPage, setPrevPage, isLoggedIn, setIsLoggedIn } = useGlobalContext2();
    const [wantedLocation, setWantedLocation] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (prevPage != '/signInUp') {
            setWantedLocation(prevPage);
            // console.log(wantedLocation);
        }
    }, [prevPage])


    function handleSubmit(e, type) {
        e.preventDefault();
        const email = e.target.email.value
        const password = e.target.password.value

        if (type === 'Sign Up') {
            createUserWithEmailAndPassword(database, email, password).then(data => {
                console.log(data, "authData");
                navigate(wantedLocation);
                setIsLoggedIn(true);
            }).catch(error => {
                alert(error.code);
                setLogin(true);
            })
        }
        else {
            signInWithEmailAndPassword(database, email, password).then(data => {
                console.log(data, "authData");
                navigate(wantedLocation);
                setIsLoggedIn(true);
            }).catch(error => {
                alert(error.code);
                setLogin(true);
            })
        }
    }


    return (
        <>
            <div className='signtype-container'>
                <div className='sign-types'>
                    <div className={login === true ? 'current' : 'pointer'} onClick={() => setLogin(true)}>Sign in</div>
                    <div className={login === false ? 'current' : 'pointer'} onClick={() => setLogin(false)}>Sign up</div>
                </div>
                <h1 className='sign-heading'>{login ? 'Sign In' : 'Sign Up'}</h1>
                <div className='form'>
                    <form onSubmit={(e) => handleSubmit(e, login ? 'Sign In' : 'Sign Up')}>
                        <input name='email' type='text' placeholder='Email' className='email-pass-input' />
                        <br />
                        <input name='password' type='password' placeholder='Password' className='email-pass-input' />
                        <br />
                        <div className='sign-button-container'>
                            <button className='sign-button'>
                                {login ? 'Sign In' : 'Sign Up'}
                            </button>
                        </div>
                    </form>
                </div>
                {isLoggedIn && (isLoggedIn ? <ExercisesPage /> : <DefaultExercises />)}
            </div>
            <img src={backgroundImg} className='background-img-form' />
        </>
    )
}
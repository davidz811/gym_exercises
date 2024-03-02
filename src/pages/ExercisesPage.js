import React from 'react'
import SearchExercises from '../components/SearchExercises'
import Exercises from '../components/Exercises'
import AppProvider from '../components/context'
import AppProvider2, { useGlobalContext2 } from '../components/contextForPrevious'
import DefaultExercises from '../components/DefaultExercises'


const ExercisesPage = () => {
    const { isLoggedIn, setIsLoggedIn } = useGlobalContext2();
    console.log(isLoggedIn);

    return (
        <AppProvider2>
            <AppProvider>
                {isLoggedIn ?
                    <div>
                        <SearchExercises />
                        <Exercises />
                    </div>
                    : <DefaultExercises />}
            </AppProvider>
        </AppProvider2>
    )
}

export default ExercisesPage
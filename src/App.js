import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ExerciseDetail from './pages/ExerciseDetail';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ExercisesPage from './pages/ExercisesPage';
import { FirebaseLogin } from './pages/FirebaseLogin';
import AppProvider2, { useGlobalContext2 } from './components/contextForPrevious';
import { WorkoutsPage } from './pages/WorkoutsPage';
import WorkoutDetails from './pages/WorkoutDetails';
import BmiCalculatorPage from './pages/BmiCalculatorPage';
import CreateWorkoutsPage from './pages/CreateWorkoutsPage';
import CreateExercisePage from './pages/CreateExercisePage';

export default function App() {

    return (
        <AppProvider2>
            <div>
                <Navbar />
                <Routes>
                    <Route path='/signInUp' element={<FirebaseLogin />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/exercise/:id" element={<ExerciseDetail />} />
                    <Route path="/exercises" element={<ExercisesPage />} />
                    <Route path="/workouts" element={<WorkoutsPage />} />
                    <Route path="/workouts/:workout_id" element={<WorkoutDetails />} />
                    <Route path="/easyWorkouts/:workout_id"
                        element={<WorkoutDetails />} />
                    <Route path="/bmi" element={<BmiCalculatorPage />} />
                    <Route path="/create-workouts" element={<CreateWorkoutsPage />} />
                    <Route path="/createExercise" element={<CreateExercisePage />} />
                </Routes>
                <Footer />
            </div>
        </AppProvider2>
    )
}
const express = require('express')
const bodyParser = require('body-parser')
const db = require('./queries');
const app = express()
const port = 3000
const cors = require('cors');

app.use(cors());

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (req, res) => {
    res.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/workouts/exercises', db.getExercises);
app.get('/workouts/difficulty/:difficultyLevel', db.getExercisesByDifficulty);
app.get('/workouts/muscleGroup/:muscleGroup', db.getExercisesByMuscleGroup);
app.get('/workouts/workoutId/:workoutId', db.getDataAboutWorkout);
app.get('/workouts/workouts', db.getWorkouts);
app.get('/workouts/easyWorkouts', db.getEasyWorkouts);
app.post('/workouts/createWorkouts', db.createWorkouts);
// app.get('/users/:id', db.getUserById)
// app.post('/users', db.createUser)
// app.put('/users/:id', db.updateUser)
// app.delete('/users/:id', db.deleteUser)

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})
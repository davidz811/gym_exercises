const { response, request } = require('express')
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432,
})


const getWorkouts = (request, response) => {
    pool.query('SELECT * FROM workouts ORDER BY workout_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}


const getExercises = (request, response) => {
    pool.query('SELECT * FROM exercises ORDER BY exercise_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getExercisesByDifficulty = (request, response) => {
    const difficultyLevel = request.params.difficultyLevel;

    const query = `
        SELECT * 
        FROM exercises 
        WHERE difficulty_level = $1
        ORDER BY exercise_id ASC;`;

    pool.query(query, [difficultyLevel], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const getExercisesByMuscleGroup = (request, response) => {
    const muscle_group = request.params.muscleGroup;

    const query = `
        SELECT * 
        FROM exercises 
        WHERE muscle_group = $1
        ORDER BY exercise_id ASC;`;

    pool.query(query, [muscle_group], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const getDataAboutWorkout = (request, response) => {
    const id = parseInt(request.params.workoutId);

    const query =
        `SELECT *
    FROM exercises AS ex
    INNER JOIN workouts_exercises AS wo_ex ON
    ex.exercise_id = wo_ex.exercise_id
    INNER JOIN workouts AS wo ON
    wo.workout_id = wo_ex.workout_id
    WHERE wo.workout_id = $1
    ORDER BY wo_ex.exercise_id ASC;`;

    pool.query(query, [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    })
}

const getEasyWorkouts = (request, response) => {
    pool.query('SELECT * FROM workouts WHERE workout_id < 7 ORDER BY workout_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

//endpoint for creating workout card
const createWorkouts = (request, response) => {
    const { name, gif_url } = request.body;

    if (!name || !gif_url) {
        return response.status(400).json({ error: 'Name and GIF URL are required' });
    }

    pool.query('INSERT INTO workouts (name , gif_url) VALUES ($1, $2)', [name, gif_url], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Workout added with ID: ${results.insertId}`)
    })
}

const deleteWorkout = (request, response) => {
    const workoutId = parseInt(request.params.workoutId);

    if (workoutId > 12) {
        pool.query('DELETE FROM workouts WHERE workout_id = $1', [workoutId], (error, results) => {
            if (error) {
                throw error;
            }

            if (results.rowCount === 0) {
                response.status(404).send(`Workout with ID ${workoutId} not found.`);
            } else {
                response.status(200).send(`Workout with ID ${workoutId} deleted successfully.`);
            }
        });
    } else {
        response.status(403).send(`Cannot delete workout with ID ${workoutId}. ID must be greater than 12.`);
    }
}

const createExercise = (request, response) => {
    const workoutId = parseInt(request.params.workoutId);

    const { imageUrl, exerciseName, sets, reps, duration, restTime, equipment } = request.body;

    if (!workoutId) {
        return response.status(400).send('Workout ID is required');
    }

    if (!imageUrl || !exerciseName || !sets || !reps || !duration || !restTime || !equipment) {
        return response.status(400).json({ error: 'imageUrl , exerciseName , sets , reps , duration , restTime , equipment are required' });
    }

    pool.query('INSERT INTO exercises (exercise_name, exercises_gif_url, muscle_group, equipment, difficulty_level) VALUES ($1, $2, $3, $4, $5) RETURNING exercise_id ',
        [exerciseName, imageUrl, '', equipment, ''],
        (error, results) => {
            if (error) {
                throw error;
            }
            const exerciseId = results.rows[0].exercise_id;

            pool.query('INSERT INTO workouts_exercises (exercise_id, workout_id, sets, reps, exercise_duration, rest_time) VALUES ($1, $2, $3, $4, $5, $6)',
                [exerciseId, workoutId, sets, reps, duration, restTime],
                (error, insertResults) => {
                    if (error) {
                        throw error;
                    }
                    response.status(201).send(`Exercise added with ID: ${exerciseId}`)
                }
            )
        })
}


const deleteExercise = (request, response) => {
    const exerciseId = parseInt(request.params.exerciseId);

    // if (!exerciseId) {
    //     return response.status(400).send('Exercise ID is required');
    // }

    if (exerciseId > 80) {
        pool.query('DELETE FROM workouts_exercises WHERE exercise_id = $1', [exerciseId], (error, results) => {
            if (error) {
                throw error
            }

            if (results.rowCount === 0) {
                response.status(404).send(`Exercise with ID ${exerciseId} not found`);
            } else {
                pool.query('DELETE FROM exercises WHERE exercise_id = $1 ', [exerciseId], (error, results) => {
                    if (error) {
                        throw error;
                    } else {
                        if (results.rowCount === 0) {
                            response.status(404).send(`Exercise with ID ${exerciseId} not found`);
                        } else {
                            response.status(200).send(`Exercise with ID ${exerciseId} deleted successfully`);
                        }
                    }
                })
            }
        })
    } else {
        response.status(403).send(`Cannot delete Exercise , Exercise with ID ${exerciseId} must be grater than 80`);
    }
}

// const getUsers = (request, response) => {
//     pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
//         if (error) {
//             throw error
//         }
//         response.status(200).json(results.rows)
//     })
// }

// const getUserById = (request, response) => {
//     const id = parseInt(request.params.id)

//     pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
//         if (error) {
//             throw error
//         }
//         response.status(200).json(results.rows)
//     })
// }

// const createUser = (request, response) => {
//     const { name, email } = request.body

//     pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
//         if (error) {
//             throw error
//         }
//         response.status(201).send(`User added with ID: ${results.insertId}`)
//     })
// }

// const updateUser = (request, response) => {
//     const id = parseInt(request.params.id)
//     const { name, email } = request.body

//     pool.query(
//         'UPDATE users SET name = $1, email = $2 WHERE id = $3',
//         [name, email, id],
//         (error, results) => {
//             if (error) {
//                 throw error
//             }
//             response.status(200).send(`User modified with ID: ${id}`)
//         }
//     )
// }

// const deleteUser = (request, response) => {
//     const id = parseInt(request.params.id)

//     pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
//         if (error) {
//             throw error
//         }
//         response.status(200).send(`User deleted with ID: ${id}`)
//     })
// }

module.exports = {
    getWorkouts,
    getExercises,
    getExercisesByDifficulty,
    getExercisesByMuscleGroup,
    getDataAboutWorkout,
    getEasyWorkouts,
    createWorkouts,
    deleteWorkout,
    createExercise,
    deleteExercise,
}
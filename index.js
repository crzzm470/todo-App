const express = require('express');
const app = express();
const pool = require('./db');

app.use(express.json());
app.get('/tasks/pending', (req, res) => {
    const query = 'SELECT * FROM tasks WHERE completed = false ORDER BY due_date';

    pool.query(query, (error, result) => {
        if (error) {
            res.status(500).json({
                error: 'Ocurrió un error al obtener las tareas pendientes',
                message: error.message,
            });
        } else {
            res.status(200).json(result.rows);
        }
    });
});

app.get('/', (req, res) => {
    res.send('¡Bienvenido a la aplicación de gestión de tareas!');
});

app.post('/tasks', (req, res) => {
    const { title, description, dueDate, completed } = req.body;
    const query =
        'INSERT INTO tasks (title, description, due_date, completed) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [title, description, dueDate, completed];

    pool.query(query, values, (error, result) => {
        if (error) {
            res.status(500).json({ error: 'Ocurrió un error al crear la tarea' });
        } else {
            res.status(201).json(result.rows[0]);
        }
    });
});

app.get('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const query = 'SELECT * FROM tasks WHERE id = $1';
    const values = [taskId];

    pool.query(query, values, (error, result) => {
        if (error) {
            res.status(500).json({ error: 'Ocurrió un error al obtener la tarea' });
        } else if (result.rows.length === 0) {
            res.status(404).json({ error: 'La tarea no existe' });
        } else {
            res.status(200).json(result.rows[0]);
        }
    });
});

app.put('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const { title, description, dueDate, completed } = req.body;
    const query =
        'UPDATE tasks SET title = $1, description = $2, due_date = $3, completed = $4 WHERE id = $5';
    const values = [title, description, dueDate, completed, taskId];

    pool.query(query, values, (error, result) => {
        if (error) {
            res
                .status(500)
                .json({ error: 'Ocurrió un error al actualizar la tarea' });
        } else if (result.rowCount === 0) {
            res.status(404).json({ error: 'La tarea no existe' });
        } else {
            const selectQuery = 'SELECT * FROM tasks WHERE id = $1';
            pool.query(selectQuery, [taskId], (selectError, selectResult) => {
                if (selectError) {
                    res.status(500).json({
                        error: 'Ocurrió un error al obtener la tarea actualizada',
                    });
                } else {
                    const updatedTask = selectResult.rows[0];
                    res.status(200).json(updatedTask);
                }
            });
        }
    });
});

app.delete('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const query = 'DELETE FROM tasks WHERE id = $1';
    const values = [taskId];

    pool.query(query, values, (error, result) => {
        if (error) {
            res.status(500).json({ error: 'Ocurrió un error al eliminar la tarea' });
        } else if (result.rowCount === 0) {
            res.status(404).json({ error: 'La tarea no existe' });
        } else {
            res.status(200).json({ message: 'Tarea eliminada exitosamente' });
        }
    });
});

app.get('/tasks', (req, res) => {
    const query = 'SELECT * FROM tasks';

    pool.query(query, (error, result) => {
        if (error) {
            res.status(500).json({ error: 'Ocurrió un error al obtener las tareas' });
        } else {
            res.status(200).json(result.rows);
        }
    });
});

const port = 3000;
if (!module.parent) {
    app.listen(port, () => { });
}

module.exports = app;

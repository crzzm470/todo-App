const request = require('supertest');
const {
    beforeAll,
    afterAll,
    describe,
    beforeEach,
    it,
    expect,
} = require('@jest/globals');
const app = require('../index');
const pool = require('../db');

let server;

beforeAll((done) => {
    server = app.listen(3001, () => {
        done();
    });
});

afterAll((done) => {
    server.close(done);
});

// Mock de la base de datos
jest.mock('../db', () => ({
    query: jest.fn(),
}));

describe('Pruebas de los endpoints GET', () => {
    beforeEach(() => {
        pool.query.mockReset();
    });

    it('Debería devolver un arreglo con las tareas pendientes', async () => {
        // Mock de los datos de respuesta de la base de datos
        const mockTasks = [
            { id: 1, title: 'Tarea 1', completed: false },
            { id: 2, title: 'Tarea 2', completed: false },
        ];
        pool.query.mockImplementation((query, callback) => {
            callback(null, { rows: mockTasks });
        });

        const response = await request(app).get('/tasks/pending');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockTasks);
    });

    it('Debería devolver una tarea específica por su ID', async () => {
        const taskId = 1;
        // Mock de los datos de respuesta de la base de datos
        const mockTask = { id: taskId, title: 'Tarea 1', completed: false };
        pool.query.mockImplementation((query, values, callback) => {
            callback(null, { rows: [mockTask] });
        });

        const response = await request(app).get(`/tasks/${taskId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockTask);
    });

    it('Debería devolver un arreglo con todas las tareas', async () => {
        // Mock de los datos de respuesta de la base de datos
        const mockTasks = [
            { id: 1, title: 'Tarea 1', completed: false },
            { id: 2, title: 'Tarea 2', completed: false },
            { id: 3, title: 'Tarea 3', completed: true },
        ];
        pool.query.mockImplementation((query, callback) => {
            callback(null, { rows: mockTasks });
        });

        const response = await request(app).get('/tasks');

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(mockTasks.length);
    });
});

describe('Pruebas del endpoint PUT', () => {
    const taskId = '1';
    const updatedTask = {
        id: taskId,
        title: 'Tarea actualizada',
        description: 'Descripción actualizada',
        dueDate: '2023-05-20',
    };

    beforeEach(() => {
        pool.query.mockReset();
    });

    it('Debería actualizar una tarea existente y devolver la tarea actualizada', async () => {
        pool.query.mockImplementation((query, values, callback) => {
            if (
                query ===
                'UPDATE tasks SET title = $1, description = $2, due_date = $3, completed = $4 WHERE id = $5'
            ) {
                callback(null, { rowCount: 1 });
            } else {
                callback(null, { rows: [{ ...updatedTask }] });
            }
        });

        const response = await request(app)
            .put(`/tasks/${taskId}`)
            .send(updatedTask);

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(updatedTask.id);
        expect(response.body.title).toBe(updatedTask.title);
        expect(response.body.description).toBe(updatedTask.description);
        expect(response.body.dueDate).toBe(updatedTask.dueDate);
    });
});

describe('Pruebas del endpoint DELETE', () => {
    let taskId;

    beforeAll(async () => {
        // Agregar una tarea de prueba
        const response = await request(app).post('/tasks').send({
            title: 'Tarea de prueba',
            description: 'Descripción de prueba',
            dueDate: '2023-05-20',
            completed: false,
        });
        taskId = response.body.id;
    });

    afterEach(() => {
        pool.query.mockReset();
    });

    it('Debería eliminar una tarea existente y devolver un mensaje de éxito', async () => {
        pool.query.mockImplementation((query, values, callback) => {
            callback(null, { rowCount: 1 });
        });

        const response = await request(app).delete(`/tasks/${taskId}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Tarea eliminada exitosamente');
    });

    it('Debería devolver un error si se intenta eliminar una tarea inexistente', async () => {
        // Generar un ID único que no exista en la base de datos
        const nonExistentTaskId = '99999999';
        pool.query.mockImplementation((query, values, callback) => {
            callback(null, { rowCount: 0 });
        });

        const response = await request(app).delete(`/tasks/${nonExistentTaskId}`);
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('La tarea no existe');
    });
});

describe('Pruebas del endpoint POST', () => {
    beforeEach(() => {
        pool.query.mockReset();
    });

    it('Debería crear una nueva tarea y devolver la tarea creada', async () => {
        const newTask = {
            title: 'Nueva tarea',
            description: 'Descripción de la nueva tarea',
            dueDate: '2023-05-21',
            completed: false,
        };

        const createdTask = {
            id: 1,
            ...newTask,
        };

        pool.query.mockImplementation((query, values, callback) => {
            callback(null, { rows: [createdTask] });
        });

        const response = await request(app).post('/tasks').send(newTask);

        expect(response.status).toBe(201);
        expect(response.body).toEqual(createdTask);
    });
});

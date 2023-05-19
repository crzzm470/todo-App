# ToDo Api

Esta es una aplicación ToDo simple construida con Node.js, Express y PostgreSQL. Permite a los usuarios crear y gestionar sus tareas diarias.

## Requisitos

Asegúrate de tener los siguientes requisitos instalados en tu máquina:

- Node.js
- npm
- PostgreSQL
- Docker
- Docker Compose

## Instalación

Sigue estos pasos para instalar y configurar la aplicación ToDo:

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone https://github.com/crzzm470/todo-App.git
   ```
2. Ve al directorio del proyecto:
  ```bash
   cd todo-App
   ```
   
3. Copia el archivo de ejemplo .env model y renómbralo a .env.

4. Abre el archivo .env y completa las variables de entorno con tus propias configuraciones. 

## Uso

1. Haz la build:
  ```bash
  docker build . 
  ```
2. Inicia la aplicación utilizando Docker Compose:
  ```bash
  docker compose up
  ```
3. La aplicación estará disponible en http://localhost:3000.

## API

La API de Gestión de Tareas proporciona endpoints para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en tareas.

Obtener tareas pendientes
  ```bash
  GET /tasks/pending
  ```
Este endpoint devuelve una lista de todas las tareas pendientes ordenadas por fecha de vencimiento.
Respuesta exitosa
  ```bash
  Status: 200 OK
  ```
```javascript
 [
  {
    "id": 1,
    "title": "Tarea 1",
    "description": "Descripción de la tarea 1",
    "dueDate": "2023-05-20",
    "completed": false
  },
  {
    "id": 2,
    "title": "Tarea 2",
    "description": "Descripción de la tarea 2",
    "dueDate": "2023-05-22",
    "completed": false
  },
  ...
]
```
  
 Respuesta de error
 ```bash
  Status: 500 Internal Server Error
 ```
  
```javascript
  {
  "error": "Ocurrió un error al obtener las tareas pendientes",
  "message": "Mensaje de error detallado"
}
```

Crear una tarea
```bash
  POST /tasks
```
  
Este endpoint crea una nueva tarea con la información proporcionada en el cuerpo de la solicitud.

#### Parámetros de entrada

| Nombre      | Tipo     | Descripción              |
|-------------|----------|--------------------------|
| title       | String   | Título de la tarea       |
| description | String   | Descripción de la tarea  |
| dueDate     | String   | Fecha de vencimiento     |
| completed   | Boolean  | Indicador de completitud |


Respuesta exitosa
```bash
 Status: 201 Created
```
```javascript
  {
  "id": 1,
  "title": "Tarea 1",
  "description": "Descripción de la tarea 1",
  "dueDate": "2023-05-20",
  "completed": false
}
```

Respuesta de error
```bash
 Status: 500 Internal Server Error
```
  
```javascript
 {
  "error": "Ocurrió un error al crear la tarea"
}
```

Obtener una tarea por ID
```bash
GET /tasks/:id
```
  
  Este endpoint devuelve la tarea correspondiente al ID proporcionado.

| Nombre   | Tipo   | Descripción       |
|----------|--------|-------------------|
| id       | Number | ID de la tarea    |



Respuesta exitosa

```bash
Status: 200 OK
```
  
```javascript
{
  "id": 1,
  "title": "Tarea 1",
  "description": "Descripción de la tarea 1",
  "dueDate": "2023-05-20",
  "completed": false
}
```

Respuesta de error
  ```bash
  Status: 500 Internal Server Error
  ```
  ```javascript
  {
    "error": "Ocurrió un error al obtener la tarea"
  }
  ```
  ```bash
  Status: 404 Not Found
  ```
  ```javascript
  {
    "error": "La tarea no existe"
  }
  ```
Actualizar una tarea
```bash
PUT /tasks/:id
```
  
Este endpoint actualiza la tarea correspondiente al ID proporcionado con la información proporcionada en el cuerpo de la solicitud.

Parámetros de entrada
| Nombre       | Tipo    | Descripción                      |
|--------------|---------|----------------------------------|
| id           | Number  | ID de la tarea a actualizar      |
| title        | String  | Nuevo título de la tarea         |
| description  | String  | Nueva descripción de la tarea    |
| dueDate      | String  | Nueva fecha de vencimiento       |
| completed    | Boolean | Nuevo indicador de completitud    |

Respuesta exitosa
```bash
Status: 200 OK
```

```javascript
{
  "id": 1,
  "title": "Tarea 1 (actualizada)",
  "description": "Descripción de la tarea 1 (actualizada)",
  "dueDate": "2023-05-20",
  "completed": true
}
```

Respuesta de error
```bash
Status: 500 Internal Server Error
  ```
```javascript
{
  "error": "Ocurrió un error al actualizar la tarea"
}

```
```bash
Status: 404 Not Found
```
```javascript
{
  "error": "La tarea no existe"
}
```
Eliminar una tarea

```bash
DELETE /tasks/:id
```

Este endpoint elimina la tarea correspondiente al ID proporcionado.

Parámetros de entrada
| Nombre  | Tipo   | Descripción           |
|---------|--------|-----------------------|
| id      | Number | ID de la tarea        |


Respuesta exitosa
```bash
Status: 200 OK
```
```javascript
{
  "message": "Tarea eliminada exitosamente"
}
```
Respuesta de error
```bash
Status: 500 Internal Server Error
```
```javascript
{
  "error": "Ocurrió un error al eliminar la tarea"
}
```
```bash
Status: 404 Not Found
```
```javascript
{
  "error": "La tarea no existe"
}
```

Obtener todas las tareas
```bash
GET /tasks
```
Este endpoint devuelve una lista de todas las tareas.

Respuesta exitosa
```bash
Status: 200 OK
```
```javascript
[
  {
    "id": 1,
    "title": "Tarea 1",
    "description": "Descripción de la tarea 1",
    "dueDate": "2023-05-20",
    "completed": false
  },
  {
    "id": 2,
    "title": "Tarea 2",
    "description": "Descripción de la tarea 2",
    "dueDate": "2023-05-22",
    "completed": true
  },
  ...
]
```
Respuesta de error
```bash
Status: 500 Internal Server Error
```
```javascript
{
  "error": "Ocurrió un error al obtener las tareas"
}
```
  
  
  
  
  
  
  
  
  
  
  
  
  














  

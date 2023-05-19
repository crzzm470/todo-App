exports.up = function(knex) {
  return knex.schema.createTable('tasks', function(table) {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.string('description');
    table.date('due_date');
    table.boolean('completed').defaultTo(false);
    table.timestamps(true, true);
  }).then(function() {
    // Insertar 10 tareas de ejemplo
    return knex('tasks').insert([
      { title: 'Tarea 1', description: 'Descripción de la tarea 1', due_date: '2023-05-20', completed: false },
      { title: 'Tarea 2', description: 'Descripción de la tarea 2', due_date: '2023-05-21', completed: true },
      { title: 'Tarea 3', description: 'Descripción de la tarea 3', due_date: '2023-05-22', completed: false },
      { title: 'Tarea 4', description: 'Descripción de la tarea 4', due_date: '2023-05-22', completed: true },
      { title: 'Tarea 5', description: 'Descripción de la tarea 5', due_date: '2023-05-22', completed: false },
      { title: 'Tarea 6', description: 'Descripción de la tarea 6', due_date: '2023-05-22', completed: false },
      { title: 'Tarea 7', description: 'Descripción de la tarea 7', due_date: '2023-05-22', completed: false },
      { title: 'Tarea 8', description: 'Descripción de la tarea 8', due_date: '2023-05-22', completed: false },
      { title: 'Tarea 9', description: 'Descripción de la tarea 9', due_date: '2023-05-22', completed: false },
      { title: 'Tarea 10', description: 'Descripción de la tarea 10', due_date: '2023-05-30', completed: false }
    ]);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('tasks');
};

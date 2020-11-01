exports.up = function (knex, Promise) {
  return knex.schema.createTable('quiz', function (table) {
    table.increments();
    table.string('category').notNullable();
    table.text('question').notNullable();
    table.text('options').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('quiz');
};

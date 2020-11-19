exports.up = function (knex, Promise) {
  return knex.schema.createTable('answer', function (table) {
    table.increments();
    table.integer('userId').notNullable();
    table.integer('questionId').notNullable();
    table.text('checkedOptions').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('answer');
};

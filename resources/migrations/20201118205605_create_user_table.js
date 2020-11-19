exports.up = function (knex, Promise) {
  return knex.schema.createTable('user', function (table) {
    table.increments();
    table.string('image').notNullable();
    table.string('full_name').notNullable();
    table.string('rank').notNullable();
    table.string('kpp').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('user');
};

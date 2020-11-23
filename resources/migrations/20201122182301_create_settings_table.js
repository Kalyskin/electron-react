exports.up = function (knex, Promise) {
  return knex.schema.createTable('setting', function (table) {
    table.string('name').notNullable().unique();
    table.string('value').notNullable();
    table.string('title').notNullable();
    table.string('type').notNullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('setting');
};

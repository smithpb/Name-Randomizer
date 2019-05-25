
exports.up = function(knex, Promise) {
  return knex.schema.createTable('names', table => {
    table.increments()
    table.string('name')
      .notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('names');
};

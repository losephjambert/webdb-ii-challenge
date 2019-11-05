exports.up = function(knex) {
  // create the cars table

  /**
   * Car
   *  Vin // required
   *  Make // required
   *  Model // required
   *  Mileage // required
   *  TransmissionType
   *  TitleStatus
   */
  return knex.schema.createTable('cars', table => {
    table.increments(); // id
    table.string('vin', 255).notNullable();
    table.string('make', 128).notNullable();
    table.string('model', 128).notNullable();
    table.integer('mileage').notNullable();
    table.string('transmissionType', 128);
    table.string('titleStatus', 128);
    table.timestamps(true, true); // createdAt && updatedAt
  });
};

exports.down = function(knex) {
  // drop the cars table
  return knex.schema.dropTableIfExists('cars');
};

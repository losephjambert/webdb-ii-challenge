exports.up = knex => {
  return knex.schema.alterTable('cars', table => {
    table.unique('vin');
  });
};

exports.down = table => {
  return table.dropUnique(columns, ['vin']);
};

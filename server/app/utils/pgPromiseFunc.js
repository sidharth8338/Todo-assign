const pgp = require("pg-promise")({
  /* initialization options */
  capSQL: true, // capitalize all generated SQL
});

const DataInserts = (db_name, col_set, data) => {
  const colSet = new pgp.helpers.ColumnSet(col_set, { table: db_name });
  return pgp.helpers.insert(data, colSet);
};

const DataUpdate = (db_name, col_set, data, conditionString) => {
  const colSet = new pgp.helpers.ColumnSet(col_set, { table: db_name });
  return (
    pgp.helpers.update(data, colSet) + pgp.as.format(conditionString, data)
  );
};

module.exports = { DataInserts, DataUpdate };

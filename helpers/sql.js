const { BadRequestError } = require("../expressError");

// THIS NEEDS SOME GREAT DOCUMENTATION.

// Helper that functions by building columns/values that will be used to query the database.

// const keys = Store keys that comes in as JSON data.
//
// const cols = Store the key name and the index of the key in an array.
//
// Example: 
// {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
// Returns:
//  { setCols: '"firstName" = $1, "age"= $2', values: ['Aliya', 32]}

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };

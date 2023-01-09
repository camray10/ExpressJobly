const { sqlForPartialUpdate } = require("../helpers/sql");

describe("Test sqlForPartialUpdate", function () {
  test("Test for accurate data.", async function () {
    const results = sqlForPartialUpdate({ firstName: "Cam", age: 25 }, "");
    expect(results).toEqual({
      setCols: '"firstName"=$1, "age"=$2',
      values: ["Cam", 25],
    });
  });
});
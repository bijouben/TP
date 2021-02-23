var sql = require("../Config/db");

var Salary = (salary) => {
  this.salaryName = salary.salaryName;
  this.tel_sal = salary.tel_salary;
};

Salary.createSalary = (newSalary, result) => {
  sql.query("INSERT INTO T_Salaries SET ?", newSalary, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

Salary.getSalaries = (result) => {
  sql.query("SELECT * FROM T_Salaries", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

Salary.remove = function (id, result) {
  sql.query(
    "DELETE FROM T_Salaries WHERE matricule = ?",
    [id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = Salary;

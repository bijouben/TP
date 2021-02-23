const Salary = require("../Models/salaryModel");

exports.getSalaries = async (req, res) => {
  Salary.getSalaries((err, salary) => {
    if (err) {
      res.send(err);
    } else {
      res.send(salary);
    }
  });
};

exports.addSalary = async (req, res) => {
  var { salary } = req.body;
  var newSalary = salary;
  Salary.createSalary(newSalary, (err, newSalary) => {
    if (err) {
      res.send(err);
    } else {
      res.json(newSalary);
    }
  });
};

exports.deleteSalary = async (req, res) => {
  var salary = req.body;
  Salary.remove(req.params.id, (err, salary) => {
    if (err) {
      res.send(err);
    } else {
      res.json({ message: "Salary deleted !" });
    }
  });
};

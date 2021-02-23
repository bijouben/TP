var sql = require("../Config/db");

var Service = (service) => {
  this.services = service.serviceName;
};

Service.createService = (newService, result) => {
  sql.query("INSERT INTO T_Service SET ?", newService, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

Service.getServices = (result) => {
  sql.query("SELECT * FROM T_Service", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

Service.remove = function (id, result) {
  console.log(id);
  sql.query(
    "DELETE FROM T_Service WHERE idservices = ?",
    [id],
    function (err, res) {
      console.log(res);
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = Service;

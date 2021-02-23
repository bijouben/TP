var sql = require("../Config/db");

var Emprunts = (emprunts) => {};

Emprunts.getEmprunt = (result) => {
  sql.query("SELECT * FROM T_Emprunt", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

Emprunts.createEmprunt = (newEmprunt, result) => {
  sql.query("INSERT INTO T_Emprunt SET ?", newEmprunt, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });

  Emprunts.remove = function (id, result) {
    sql.query(
      "DELETE FROM T_Emprunt WHERE idT_Emprunt  = ?",
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
};

module.exports = Emprunts;

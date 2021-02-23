var sql = require("../Config/db");

var Materiel = (materiel) => {};

Materiel.createMateriel = (newMateriel, result) => {
  sql.query("INSERT INTO T_Materiel SET ?", newMateriel, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

Materiel.getMateriels = (result) => {
  sql.query("SELECT * FROM T_Materiel", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

Materiel.remove = function (id, result) {
  sql.query(
    "DELETE FROM T_Materiel WHERE idmaterial  = ?",
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

module.exports = Materiel;

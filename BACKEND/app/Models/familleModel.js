var sql = require("../Config/db");

var Famille = (famille) => {
  this.famille = famille.famille;
};

Famille.createFamille = (newFamille, result) => {
  sql.query("INSERT INTO T_Famille SET ?", newFamille, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

Famille.getFamilles = (result) => {
  sql.query("SELECT * FROM T_Famille", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

Famille.remove = function (id, result) {
  sql.query(
    "DELETE FROM T_Famille WHERE idfamille = ?",
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

module.exports = Famille;

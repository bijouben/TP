const Famille = require("../Models/familleModel");

exports.getFamilles = async (req, res) => {
  Famille.getFamilles((err, famille) => {
    if (err) {
      res.send(err);
    } else {
      res.send(famille);
    }
  });
};

exports.addFamille = async (req, res) => {
  var { fam } = req.body;
  var newFamille = fam;
  console.log(newFamille);
  Famille.createFamille(newFamille, (err, newFamille) => {
    if (err) {
      res.send(err);
    } else {
      res.json(newFamille);
    }
  });
};

exports.deleteFamille = async (req, res) => {
  var famille = req.body;
  Famille.remove(req.params.id, (err, famille) => {
    if (err) {
      res.send(err);
    } else {
      res.json({ message: "Famille deleted !" });
    }
  });
};

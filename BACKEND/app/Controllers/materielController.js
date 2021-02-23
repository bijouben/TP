const Materiel = require("../Models/materielModel");

exports.getMateriels = async (req, res) => {
  Materiel.getMateriels((err, materiel) => {
    if (err) {
      res.send(err);
    } else {
      res.send(materiel);
    }
  });
};

exports.addMateriel = async (req, res) => {
  var { mat } = req.body;
  var newMateriel = mat;
  console.log(req.body);
  Materiel.createMateriel(newMateriel, (err, newMateriel) => {
    if (err) {
      res.send(err);
    } else {
      res.json(newMateriel);
    }
  });
};

exports.deleteMaterial = async (req, res) => {
  var material = req.body;
  Materiel.remove(req.params.id, (err, material) => {
    if (err) {
      res.send(err);
    } else {
      res.json({ message: "Material deleted !" });
    }
  });
};

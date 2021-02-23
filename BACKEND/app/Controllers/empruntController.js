const Emprunts = require("../Models/empruntModel");

exports.addEmprunt = async (req, res) => {
  var { loan } = req.body;
  var newEmprunt = loan;
  console.log(newEmprunt);
  Emprunts.createEmprunt(newEmprunt, (err, newEmprunt) => {
    if (err) {
      res.send(err);
    } else {
      res.json(newEmprunt);
    }
  });
};

exports.getEmprunts = async (req, res) => {
  Emprunts.getEmprunt((err, emprunt) => {
    if (err) {
      res.send(err);
    } else {
      res.send(emprunt);
    }
  });
};

exports.deleteEmprunt = async (req, res) => {
  var emprunt = req.body;
  Emprunts.remove(req.params.id, (err, emprunt) => {
    if (err) {
      res.send(err);
    } else {
      res.json({ message: "Material deleted !" });
    }
  });
};

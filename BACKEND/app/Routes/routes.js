const serviceController = require("../Controllers/serviceController");
const familleController = require("../Controllers/familleController");
const empruntController = require("../Controllers/empruntController");
const materielController = require("../Controllers/materielController");
const salaryController = require("../Controllers/salaryController");
const cors = require("cors");

var whitelist = ["http://localhost:3000"];
var corsOptions = {
  origin: function (origin, callback) {
    console.log(origin);
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.json("Welcome to our app API !");
  });
  //Service routes
  app.get("/services", cors(corsOptions), serviceController.getServices);
  app.post("/services/add", cors(corsOptions), serviceController.addService);
  app.delete(
    "/services/delete/:id",
    cors(corsOptions),
    serviceController.deleteService
  );
  //Famille routes
  app.get("/familles", cors(corsOptions), familleController.getFamilles);
  app.post("/familles/add", cors(corsOptions), familleController.addFamille);
  app.delete(
    "/familles/delete/:id",
    cors(corsOptions),
    familleController.deleteFamille
  );
  //Materiel routes
  app.get("/materiels", cors(corsOptions), materielController.getMateriels);
  app.post("/materiels/add", cors(corsOptions), materielController.addMateriel);
  app.delete(
    "/materiels/delete/:id",
    cors(corsOptions),
    materielController.deleteMaterial
  );
  //Salary routes
  app.get("/salaries", cors(corsOptions), salaryController.getSalaries);
  app.post("/salaries/add", cors(corsOptions), salaryController.addSalary);
  app.delete(
    "/salaries/delete/:id",
    cors(corsOptions),
    salaryController.deleteSalary
  );

  //Emprunt routes
  app.get("/emprunts", cors(corsOptions), empruntController.getEmprunts);
  app.post("/emprunts/add", cors(corsOptions), empruntController.addEmprunt);
  app.delete("/emprunts/delete/:id", empruntController.deleteEmprunt);
};

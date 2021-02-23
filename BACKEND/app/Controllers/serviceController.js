const Service = require("../Models/serviceModel");

exports.getServices = async (req, res) => {
  Service.getServices((err, service) => {
    if (err) {
      res.send(err);
    } else {
      res.send(service);
    }
  });
};

exports.addService = async (req, res) => {
  var { service } = req.body;
  var newService = service;
  console.log(newService);

  if (!newService.serviceName) {
    res
      .status(400)
      .send({ error: true, message: "Please provide a service name" });
  } else {
    Service.createService(newService, (err, newService) => {
      if (err) {
        res.send(err);
      } else {
        res.json(newService);
      }
    });
  }
};

exports.deleteService = async (req, res) => {
  var service = req.body;
  Service.remove(req.params.id, (err, service) => {
    if (err) {
      res.send(err);
    } else {
      res.json({ message: "Service deleted !" });
    }
  });
};

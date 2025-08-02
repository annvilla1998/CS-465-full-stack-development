const Trip = require("../database/models").Trip;
const User = require("../database/models").User;

// GET /trips - lists all the trips
const tripsList = async (req, res) => {
  const q = await Trip.findAll();

  if (!q) {
    return res.status(404).json(err);
  } else {
    return res.status(200).json(q);
  }
};

// GET /trips/:tripCode - lists a single trip
const tripsFindByCode = async (req, res) => {
  const q = await Trip.findOne({ where: { code: req.params.tripCode } });

  if (!q) {
    return res.status(404).json(err);
  } else {
    return res.status(200).json(q);
  }
};

// POST /trips - adds a new trip
const tripsAddTrip = async (req, res) => {
  getUser(req, res, async (req, res) => {
    try {
      const trip = await Trip.create({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        pricePerPerson: req.body.pricePerPerson,
        image: req.body.image,
        description: req.body.description,
      });
      return res.status(201).json(trip);
    } catch (err) {
      return res.status(400).json(err);
    }
  });
};

// PUT: /trips/:tripCode - Adds a new Trip
const tripsUpdateTrip = async (req, res) => {
  getUser(req, res, (req, res) => {
    Trip.update(
      {
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        pricePerPerson: req.body.pricePerPerson,
        image: req.body.image,
        description: req.body.description,
      },
      { where: { code: req.params.tripCode } },
    )
      .then((trip) => {
        if (!trip) {
          return res.status(404).send({
            message: "Trip not found with code" + req.params.tripCode,
          });
        }
        res.send(trip);
      })
      .catch((err) => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: "Trip not found with code" + req.params.tripCode,
          });
        }
        return res
          .status(500) // server error
          .json(err);
      });
  });
};
const getUser = async (req, res, callback) => {
  if (req.payload && req.payload.email) {
    try {
      const user = await User.findOne({ where: { email: req.payload.email } });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      callback(req, res, user.name);
    } catch (err) {
      console.log(err);
      return res.status(404).json(err);
    }
  } else {
    return res.status(404).json({ message: "User not found" });
  }
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip,
};

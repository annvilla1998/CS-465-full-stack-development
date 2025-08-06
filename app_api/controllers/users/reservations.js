const Trip = require("../../database/models").Trip;
const Reservation = require("../../database/models").Reservation;

// GET /users/:id/reservations - Lists all the user's reservations
const reservationList = async (req, res) => {
    const q = await Reservation.findAll({
    where: { userId: req.params.id },
    include: [{
      model: Trip,
      attributes: ['code', 'name', 'resort', 'pricePerPerson', 'image', 'description'],
      as: 'trip'
    }],
    attributes: ['id', 'length', 'start']
  });

  if (!q) {
    return res.status(404).json(err);
  } else {
    return res.status(200).json(q);
  }
};

// POST /users/id/reservations - Books a new reservation for a user
const addReservations = async (req, res) => {
    console.log(req.body);
    try {
      const reservation = await Reservation.create({
        userId: req.params.id,
        tripId: req.body.tripId,
        length: req.body.length,
        start: req.body.start
      });
      return res.status(201).json(reservation);
    } catch (err) {
      return res.status(400).json(err);
    }
};


module.exports = {
  reservationList,
  addReservations
};
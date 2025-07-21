"use strict";

module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define(
    "Trip",
    {
      code: DataTypes.STRING,
      name: DataTypes.STRING,
      resort: DataTypes.STRING,
      pricePerPerson: DataTypes.STRING,
      image: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {}
  );

  // Define associations
  Trip.associate = function (models) {
    Trip.hasMany(models.Reservation, {
      foreignKey: "tripId",
      as: "reservations",
      onDelete: "CASCADE",
    });
  };

  return Trip;
};

"use strict";

module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define(
    "Reservation",
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      tripId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Trips",
          key: "id",
        },
      },
      length: DataTypes.STRING,
      start: DataTypes.DATE,
    },
    {}
  );

  // Define associations
  Reservation.associate = function (models) {
    Reservation.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
      onDelete: "CASCADE",
    });
    Reservation.belongsTo(models.Trip, {
      foreignKey: "tripId",
      as: "trip",
      onDelete: "CASCADE",
    });
  };

  return Reservation;
};

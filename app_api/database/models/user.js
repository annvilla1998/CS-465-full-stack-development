"use strict";
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      hash: DataTypes.STRING,
      salt: DataTypes.STRING,
      admin: DataTypes.BOOLEAN,
    },
    {}
  );

  // Define associations
  User.associate = function (models) {
    User.hasMany(models.Reservation, {
      foreignKey: "userId",
      as: "reservations",
      onDelete: "CASCADE",
    });
  };

  // Instance methods for User model
  User.prototype.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.hash = crypto
      .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
      .toString("hex");
  };

  User.prototype.validPassword = function (password) {
    const hash = crypto
      .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
      .toString("hex");
    return this.hash === hash;
  };

  User.prototype.generateJwt = function () {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign(
      {
        id: this.id,
        email: this.email,
        name: this.name,
        exp: Math.floor(expiry.getTime() / 1000),
      },
      process.env.JWT_SECRET
    );
  };

  return User;
};

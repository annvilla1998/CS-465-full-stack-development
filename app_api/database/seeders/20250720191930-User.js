"use strict";
const crypto = require("crypto");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = crypto.randomBytes(16).toString("hex");

    await queryInterface.bulkInsert("Users", [
      {
        name: "John Doe",
        email: "john.doe@test.com",
        salt: salt,
        hash: crypto
          .pbkdf2Sync("123456", salt, 1000, 64, "sha512")
          .toString("hex"),
        admin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};

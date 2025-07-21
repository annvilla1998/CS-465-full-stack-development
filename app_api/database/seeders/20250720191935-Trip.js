"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Trips", [
      {
        code: "GALR212014",
        name: "Gale Reef",
        resort: "Emerald Bay Resort, 3 stars",
        pricePerPerson: "799.00",
        image: "reef1.jpg",
        description:
          "Gale Reef Sed et augue lorem. In sit amet placerat arcu. Mauris volutpat ipsum ac justo mollis vel vestibulum orci gravida. Vestibulum sit amet porttitor odio. Nulla facilisi. Fusce at pretium felis.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "DAWR210315",
        name: "Dawson's Reef",
        resort: "Blue Lagoon, 4 stars",
        pricePerPerson: "1199.00",
        image: "reef2.jpg",
        description:
        "Dawson's Reef Integer magna leo, posuere et dignissim vitae, porttitor at odio. Pellentesque a metus nec magna placerat volutpat. Nunc nisi mi, elementum sit amet aliquet quis, tristique quis nisl. Curabitur odio lacus, blandit ut hendrerit.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "CLAR210621",
        name: "Claire's Reef",
        resort: "Coral Sands, 5 stars",
        pricePerPerson: "1999.00",
        image: "reef3.jpg",
        description:
        "Clair's Reef Donec sed felis risus. Nulla facilisi. Donec a orci tellus, et auctor odio. Fusce ac orci nibh, quis semper arcu. Cras orci neque, euismod et accumsan ac, sagittis molestie lorem. Proin odio sapien, elementum at tempor non.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Trips", null, {});
  },
};

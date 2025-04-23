const Mongoose = require("./db");
const Trip = require("./travlr");
const fs = require("fs");

// Read seed data from JSON file
const trips = JSON.parse(fs.readFileSync("./data/trips.json", "utf8"));

// Seed database
const seedDB = async () => {
  await Trip.deleteMany({}); // Clear existing records
  console.log("Existing trips deleted.");

  await Trip.insertMany(trips);
  console.log("New trips inserted.");
};

// Run seeding function
seedDB().then(async () => {
    await Mongoose.connection.close();
    process.exit(0);
});

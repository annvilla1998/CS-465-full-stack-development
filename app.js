require("dotenv").config();

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");

// Define routers
const apiRouter = require("./app_api/routes/index");

// Bring in the database
const db = require("./app_api/database/models/index");

// Load passport configuration - This is used for authentication
require("./app_api/config/passport");

// Create the Express application
const app = express();

// Connect to the database
(async () => {
  try {
    await db.sequelize.authenticate();
    console.log(`Database connection established successfully`);
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);  // Exit the process if the database connection fails
  }
})();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Serve Angular admin app in production
if (process.env.NODE_ENV === 'production') {
  console.log('Production mode: Serving Angular admin from /admin');
  app.use('/admin', express.static(path.join(__dirname, 'app_admin/dist/travlr-admin/browser')));
  
  // Handle Angular routing - redirect all non-API routes to index.html
  app.get('/admin/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'app_admin/dist/travlr-admin/browser/index.html'));
  });
} else {
  console.log('Development mode: Angular admin not served from Express');
}

app.use(passport.initialize());

// Enable CORS
app.use("/api", (req, res, next) => {
  // In production, allow same origin; in development, allow localhost:4200
  const allowedOrigin = process.env.NODE_ENV === 'production' 
    ? req.headers.origin || `https://${req.headers.host}`
    : "http://localhost:4200";
    
  res.header("Access-Control-Allow-Origin", allowedOrigin);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.use("/api", apiRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Catch unauthorized error and create 401
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ message: err.name + ": " + err.message });
  }
});

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

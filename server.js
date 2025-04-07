const express = require("express");
const connectDB = require("./config/db");

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const passport = require("passport");
require("./config/passport")(passport); // Path to the above file
require("dotenv").config();

const app = express();
const authRoutes = require("./authentication/authRoutes");
const employeeRoutes = require("./employee/employeeRoutes");
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();
const env = process.env.NODE_ENV;
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
let swaggerDocument;
if (env === 'development') {
  swaggerDocument = require("./swagger.json"); // Full API docs
} else {
  // Empty Swagger spec for production
  swaggerDocument = {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "Swagger UI (No endpoints visible in production)",
    },
    paths: {}, // Empty paths
  };
}


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log(`Swagger API docs available at http://localhost:${PORT}/api-docs`);
  });
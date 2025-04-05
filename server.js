const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require('./authentication/authRoutes');
const employeeRoutes = require('./employee/employeeRoutes');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require("./swagger.json"); // Auto-generated file

require("dotenv").config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/auth", require("./authentication/authRoutes"));
app.use("/api/employees", require("./employee/employeeRoutes"));
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log(`Swagger API docs available at http://localhost:${PORT}/api-docs`);
  });
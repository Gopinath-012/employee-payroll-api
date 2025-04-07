
const swaggerAutogen = require("swagger-autogen")();
require("dotenv").config();
const port = process.env.PORT;
const env=process.env.NODE_ENV;
if(env==="development")
{
  const doc = {
    info: {
      title: "Employee Payroll",
      description: "API for managing employee automatically",
      version: "1.0.0",
    },
    
    host: `localhost:${port}`, // Change this based on your environment
    schemes: ["http"],
 
    securityDefinitions: {
        BearerAuth: {
          type: "apiKey",
          name: "Authorization",
          in: "header",
          description: "Enter your JWT token as: Bearer <token>",
        },
      },
      security: [{ BearerAuth: [] }],
  };

  const outputFile = "../swagger.json"; // Auto-generated file
  //const endpointsFiles = ["../server.js"]; // Main server file
  const endpointsFiles = ["../server.js"];
 swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require("../server.js"); // Start the server after generating docs
  });
}

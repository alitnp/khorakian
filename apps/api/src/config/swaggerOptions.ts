import CONFIG from "@/config";

const swaggerOptions = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:" + CONFIG.APP.PORT,
      },
    ],
  },
  apis: [`./src/routes/*`],
};

export default swaggerOptions;

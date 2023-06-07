const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const booksRouter = require("./routes/books")
const port = process.env.PORT || 4000;
const swaggerUI = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")

const app = express();


app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


const options = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "Library API",
        version: "1.0.0",
        description: "A simple Express Library API"
      },
      servers: [
        {
          url: "http://localhost:4000"
        }
      ]
    },
    apis: ['./routes/*.js']
  };
const specs = swaggerJsDoc(options)
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs ))
app.use("/books",booksRouter)

app.listen(port, () => {
  console.log(`Server is running on localhost:${port}`);
});

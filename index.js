require("dotenv").config();
const { connection } = require("./dataBase/connection");
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");

// Conección DB
connection();

// Crear Servidor de node
const app = express();

// Convierte los cuerpos de las solicitudes en objetos JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Permite solicitudes desde cualquier origen
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true, 
  })
);

// Rutas
const routesArticles = require("./routes/articles");
const colaboradorRouter = require("./routes/auth");
const routesProducts = require("./routes/products");

app.use("/api", routesArticles);
app.use("/api", routesProducts);
app.use("/api/auth", colaboradorRouter);

// Escuchar peticiones http
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Servidor corriendo en el puerto " + port);
});

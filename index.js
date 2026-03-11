const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

const sequelize = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");

const logger = require("./utils/logger");
const errorHandler = require("./utils/errorHandler");

dotenv.config();

const app = express();

app.use(express.json());

app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.info(message.trim())
    }
  })
);

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

sequelize.authenticate()
.then(() => console.log("Database connected"))
.catch(err => console.log(err));

sequelize.sync()
.then(() => console.log("tables created"))
.catch(err => console.log(err));

app.use(errorHandler);

module.exports = app;
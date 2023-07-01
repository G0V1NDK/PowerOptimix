const express = require("express");

const userRoutes = require("./routes/user");

const app = express();

// Parse incoming request bodies
app.use(express.urlencoded({ extended: true }));

app.use(userRoutes);

app.use((error, req, res, next) => {
  // Default error handling function
  // Will become active whenever any route / middleware crashes
  const status = error.status || 500;
  const message = error.message || "Something went wrong.";
  res.status(status).json({ message: message });
});

app.listen(3000);

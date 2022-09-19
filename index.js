const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const playerRoutes = require("./routes/playerRoutes");
const cors = require("cors");

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Home Page");
});

// MiddleWare
app.use(cors());
app.use(express.json());

// Express Server Routing
app.use("/users", userRoutes);
app.use("/players", playerRoutes);

app.listen(PORT, () =>
  console.log(`Listening on port: http://localhost:${PORT}`)
);

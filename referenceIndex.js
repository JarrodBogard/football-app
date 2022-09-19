const { users, players } = require("./data/data");

// Express Server Routing

// Get all users
app.get("/users", (req, res) => {
  res.json(users);
});

// Get all players
app.get("/players", (req, res) => {
  res.json(players);
});

// Get one user
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  console.log({ id });
  const user = users.find((user) => user.id === +id);
  res.json(user);
});

// Get one player

app.get("/players/:id", (req, res) => {
  const { id } = req.params;
  console.log({ id });
  const player = players.find((player) => player.id === +id);
  res.json(player);
});

// Get all players for one user
app.get("/users/:id/players", (req, res) => {
  const { id } = req.params;
  console.log({ id });
  const userPlayers = players.filter((player) => player.user_id == +id);
  res.json(userPlayers);
});

// Get all users for one player
app.get("/players/:last_name/users", (req, res) => {
  const { last_name } = req.params;
  console.log(last_name);
  const playerUserIDs = players
    .filter((player) => player.last_name === last_name)
    .map((player) => player.user_id);
  console.log(playerUserIDs);
  const usersWithSamePlayer = users.filter((user) =>
    playerUserIDs.includes(user.id)
  );
  console.log(usersWithSamePlayer);
  res.json(usersWithSamePlayer);
});

// Creating a new user
app.post("/users", (req, res) => {
  const { body } = req;
  console.log(body);

  let newUser = {
    id: users.length + 1,
    ...body,
  };

  users.push(newUser);
  res.json(users);
});

// Creating a new player
app.post("/players", (req, res) => {
  const { body } = req;
  console.log(body);

  let newPlayer = {
    id: players.length + 1,
    ...body,
  };

  players.push(newPlayer);
  res.json(players);
});

// Update a user
app.put("/users/:id", (req, res) => {
  console.log("fired");
  const { id } = req.params;
  const { body } = req;
  console.log(body);

  const user = users.find((user) => user.id === +id);
  const userIndex = users.findIndex((user) => user.id === +id);

  let updatedUser = {
    ...user,
    ...body,
  };

  users.splice(userIndex, 1, updatedUser);
  res.json(users);
});

// update a player
app.put("/players/:id", (req, res) => {
  console.log("fired");
  const { id } = req.params;
  const { body } = req;
  console.log(body);

  const player = players.find((player) => player.id === +id);
  const playerIndex = players.findIndex((player) => player.id === +id);

  let updatedPlayer = {
    ...player,
    ...body,
  };

  players.splice(playerIndex, 1, updatedPlayer);
  res.json(players);
});

// Delete a user
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  const userIndex = users.findIndex((user) => user.id === +id);

  users.splice(userIndex, 1);
  res.json(users);
});

// Delete a player
app.delete("/players/:id", (req, res) => {
  const { id } = req.params;

  const playerIndex = players.findIndex((player) => player.id === +id);

  players.splice(playerIndex, 1);
  res.json(players);
});

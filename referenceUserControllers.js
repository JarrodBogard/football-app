const { users, players } = require("../data/data");

const list = (req, res) => {
  res.json(users);
};

const show = (req, res) => {
  const { id } = req.params;
  console.log({ id });
  const user = users.find((user) => user.id === +id);
  res.json(user);
};

const showPlayersByUser = (req, res) => {
  const { id } = req.params;
  console.log({ id });
  const userPlayers = players.filter((player) => player.user_id == +id);
  res.json(userPlayers);
};

const create = (req, res) => {
  const { body } = req;
  console.log(body);

  let newUser = {
    id: users.length + 1,
    ...body,
  };

  users.push(newUser);
  res.json(users);
};

const update = (req, res) => {
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
};

const remove = (req, res) => {
  const { id } = req.params;

  const userIndex = users.findIndex((user) => user.id === +id);

  users.splice(userIndex, 1);
  res.json(users);
};

module.exports = {
  list,
  show,
  showPlayersByUser,
  create,
  update,
  remove,
};

// const list = (req, res) => {
//   pool.query(`SELECT * FROM users`, (err, rows) => {
//     if(err) {
//       console.log({message: "Error occurred: " + err})
//       return res.status(500).send("An unexpected error occured")
//     }
//     res.json(rows)
//   })
// };

const { players } = require("../data/data");

const list = (req, res) => {
  res.json(players);
};

const show = (req, res) => {
  const { id } = req.params;
  console.log({ id });
  const player = players.find((player) => player.id === +id);
  res.json(player);
};

const create = (req, res) => {
  const { body } = req;
  console.log(body);

  let newPlayer = {
    id: players.length + 1,
    ...body,
  };

  players.push(newPlayer);
  res.json(players);
};

const update = (req, res) => {
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
};

const remove = (req, res) => {
  const { id } = req.params;

  const playerIndex = players.findIndex((player) => player.id === +id);

  players.splice(playerIndex, 1);
  res.json(players);
};

module.exports = {
  list,
  show,
  create,
  update,
  remove,
};

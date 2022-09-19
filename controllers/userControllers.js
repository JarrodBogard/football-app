const pool = require("../sql/connection");
const mysql = require("mysql");

const list = (req, res) => {
  let sql = `SELECT * FROM ??`;
  sql = mysql.format(sql, ["users"]);
  pool.query(sql, (err, rows) => {
    if (err) {
      console.log({ message: "Error occurred: " + err });
      return res.status(500).send("An unexpected error occurred");
    }
    res.json(rows);
  });
};

const show = (req, res) => {
  let sql = `SELECT * FROM ?? WHERE ?? = ?`;
  sql = mysql.format(sql, ["users", "id", req.params.id]);
  pool.query(sql, (err, row) => {
    if (err) {
      console.log({ message: "Error occurred: " + err });
      return res.status(500).send("An unexpected error occurred");
    }
    res.json(row);
  });
};

const showPlayersByUser = (req, res) => {
  const { id } = req.params;
  let sql = `SELECT * FROM ?? JOIN ?? WHERE ?? = ? AND ?? = ?`;
  sql = mysql.format(sql, [
    "players",
    "users",
    "players.user_id",
    id,
    "users.id",
    id,
  ]);
  pool.query(sql, (err, rows) => {
    if (err) {
      console.log({ message: "Error occurred: " + err });
      return res.status(500).send("An unexpected error occurred");
    }
    res.json(rows);
  });
};

const create = (req, res) => {
  const { username, password, email } = req.body;
  let sql = `INSERT INTO ?? (??, ??, ??) VALUES ("?", "?", "?")`;
  sql = mysql.format(sql, [
    "users",
    "username",
    "password",
    "email",
    username,
    password,
    email,
  ]);
  pool.query(sql, (err, row) => {
    if (err) {
      console.log({ message: "Error occurred: " + err });
      return res.status(500).send("An unexpected error occurred");
    }
    res.json(row);
  });
};

const update = (req, res) => {
  let sql = `UPDATE ?? SET ? WHERE ?? = ?`;
  sql = mysql.format(sql, ["users", req.body, "id", req.params.id]);
  pool.query(sql, (err, row) => {
    if (err) {
      console.log({ message: "Error occurred: " + err });
      return res.status(500).send("An unexpected error occurred");
    }
    res.json(row);
  });
};

const remove = (req, res) => {
  let sql = `DELETE FROM ?? WHERE ?? = ?`;
  sql = mysql.format(sql, ["users", "id", req.params.id]);
  pool.query(sql, (err, row) => {
    if (err) {
      console.log({ message: "Error occurred: " + err });
      return res.status(500).send("An unexpected error occurred");
    }
    res.json(row);
  });
};

module.exports = {
  list,
  show,
  showPlayersByUser,
  create,
  update,
  remove,
};

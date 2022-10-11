const pool = require("../sql/connection");
const mysql = require("mysql");

const list = (req, res) => {
  let sql = `SELECT * FROM ??`;
  sql = mysql.format(sql, ["players"]);
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
  sql = mysql.format(sql, ["players", "id", req.params.id]);
  pool.query(sql, (err, row) => {
    if (err) {
      console.log({ message: "Error occurred: " + err });
      return res.status(500).send("An unexpected error occurred");
    }
    res.json(row);
  });
};

const showPlayersByUserId = (req, res) => {
  const { id } = req.params;
  let sql = `SELECT * FROM ?? WHERE ?? = ?`;
  sql = mysql.format(sql, ["players", "players.user_id", id]);
  pool.query(sql, (err, rows) => {
    if (err) {
      console.log({ message: "Error occurred: " + err });
      return res.status(500).send("An unexpected error occurred");
    }
    res.json(rows);
  });
};

const create = (req, res) => {
  const { user_id, first_name, last_name } = req.body;
  let sql = `INSERT INTO ?? (??, ??, ??) VALUES ("${user_id}","${first_name}","${last_name}")`;
  sql = mysql.format(sql, [
    "players",
    "user_id",
    "first_name",
    "last_name",
    user_id,
    first_name,
    last_name,
  ]);
  pool.query(sql, (err, row) => {
    if (err) {
      console.log({ message: "Error occurred: " + err });
      return res.status(500).send("An unexpected error occurred");
    }
    res.json(req.body);
  });
};

const update = (req, res) => {
  let sql = `UPDATE ?? SET ? WHERE ?? = ?`;
  sql = mysql.format(sql, ["players", req.body, "id", req.params.id]);
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
  sql = mysql.format(sql, ["players", "id", req.params.id]);
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
  showPlayersByUserId,
  create,
  update,
  remove,
};

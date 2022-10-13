const pool = require("../sql/connection");
const mysql = require("mysql");
const bcrpyt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: "3d" });
};

const login = async (req, res) => {
  const { username, password } = req.body;

  let sql = `SELECT * FROM ?? WHERE ?? = ?`;

  sql = mysql.format(sql, ["users", "username", username]);

  pool.query(sql, (err, rows) => {
    if (err) {
      console.log({ message: "Error occurred: " + err });
      return res.status(500).send("An unexpected error occurred");
    }

    if (!rows.length) return res.status(404).send("No matching users");

    const hash = rows[0].password;
    const match = bcrpyt.compare(password, hash);

    if (!match) throw Error("Invalid Password");

    if (match) {
      const token = createToken(rows.id);
      // const {id, username, password} = rows[0]
      // res.json({id, username, password, token})
      res.json({ rows, token });
    }
  });
};

const signup = async (req, res) => {
  const { username, password } = req.body;

  const hash = await bcrpyt.hash(password, saltRounds);

  let sql = `INSERT INTO ?? (??, ??) VALUES ("${username}", "${hash}")`;

  sql = mysql.format(sql, ["users", "username", "password"]);
  pool.query(sql, (err, row) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY")
        return res.status(409).send("Username is taken");
      console.log({ message: "Error occurred: " + err });
      return res.status(500).send("An unexpected error occurred");
    }
    const token = createToken(row.insertId);

    console.log(token);
    res.json({ username, password, token, id: row.insertId });
  });
};

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

  pool.query(
    `SELECT * FROM players JOIN users WHERE players.user_id = ${id} AND users.id = ${id}`,
    (err, rows) => {
      if (err) {
        console.log({ message: "Error occurred: " + err });
        return res.status(500).send("An unexpected error occurred");
      }
      res.json(rows);
    }
  );
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
  login,
  signup,
  list,
  show,
  showPlayersByUser,
  create,
  update,
  remove,
};

// const showPlayersByUser = (req, res) => {
// let sql = `SELECT * FROM ?? JOIN ?? WHERE ?? = ? AND ?? = ?`;
// sql = mysql.format(sql, [
//   "players",
//   "users",
//   "players.user_id",
//   id,
//   "users.id",
//   id,
// ]);
// }

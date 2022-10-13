const express = require("express");
const router = express.Router();
const {
  login,
  signup,
  list,
  show,
  showPlayersByUser,
  create,
  update,
  remove,
} = require("../controllers/userControllers");
const cors = require("cors");

router.use(cors);

router.get("/", list);
router.get("/:id", show);
router.get("/:id/players", showPlayersByUser);
router.post("/login", login);
router.post("/signup", signup);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);

module.exports = router;

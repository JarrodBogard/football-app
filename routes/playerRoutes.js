const express = require("express");
const router = express.Router();
const {
  list,
  show,
  showPlayersByUserId,
  create,
  update,
  remove,
} = require("../controllers/playerControllers");

const requireAuth = require("../middleware/requireAuth");

// router.use(requireAuth);

router.get("/", list);
router.get("/:id", show);
router.get("/:id/users", showPlayersByUserId);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);

module.exports = router;

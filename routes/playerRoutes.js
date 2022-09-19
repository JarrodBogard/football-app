const express = require("express");
const router = express.Router();
const {
  list,
  show,
  create,
  update,
  remove,
} = require("../controllers/playerControllers");

router.get("/", list);
router.get("/:id", show);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);

module.exports = router;

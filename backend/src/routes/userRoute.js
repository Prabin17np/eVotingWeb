const express = require("express");
const userController = require("../controller/userController");
const router = express.Router();

router.post("/", userController.create);
router.delete("/:id", userController.deleteUser);
router.get("/", userController.getAllUsers);

module.exports = router;

const express = require("express");
const trekController = require("../controller/trekController");
const trekGetRouter = express.Router();

trekGetRouter.get("/", trekController.getAllTrek);
trekGetRouter.get("/:id", trekController.getTrekById);

module.exports = trekGetRouter;

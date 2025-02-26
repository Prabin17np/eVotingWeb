const express = require("express");
const requestController = require("../controller/requestController");
const requestRouter = express.Router();

requestRouter.post("/", requestController.create);
requestRouter.get("/:id", requestController.getRequestById);
requestRouter.get("/", requestController.getAllRequests);
requestRouter.patch("/:id", requestController.updateRequestStatus);

module.exports = requestRouter;
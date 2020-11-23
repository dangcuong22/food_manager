const express = require("express");
const orderRouter = express.Router();
const orderController = require("../Controllers/order");

//CREATE METHoD
orderRouter.post("/", orderController.postOrder);

//READ METHOD
orderRouter.get("/", orderController.getAllOrder);
orderRouter.get("/:id", orderController.getOrderCustomer);
//export
module.exports = orderRouter;

const express = require("express");
const router = express.Router();

const orderController = require("../controllers/order");

// Get all orders
router.get("/", orderController.getAllOrders);

// Create a order
router.post("/", orderController.createOrder);

// Get a single order
router.get("/:orderId", orderController.getSingleOrder);

// Delete a order
router.delete("/:orderId", orderController.deleteOrder);

module.exports = router;

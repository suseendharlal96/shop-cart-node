const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");
const checkAuth = require("../middleware/auth");

// signup
router.post("/signup", userController.signup);

// signin
router.post("/signin", userController.signin);

// get user cart
router.get("/getCart/:userId", checkAuth, userController.getCart);

// add products to user cart
router.post("/cart", checkAuth, userController.postCart);

// remove product from user cart
router.post("/removeCartItem", checkAuth, userController.removeCartItem);

// pay the amount
router.post("/pay", checkAuth, userController.pay);

// get the orders
router.get("/orders", checkAuth, userController.getOrders);

module.exports = router;

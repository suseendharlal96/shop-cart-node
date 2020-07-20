const Orders = require("../models/order");

exports.getAllOrders = (req, res, next) => {
  res.status(200).json({
    msg: "Orders",
  });
};

exports.createOrder = (req, res, next) => {
  const order = {
    prodId: req.body.prodId,
    quantity: req.body.quantity,
  };
  res.status(200).json({
    msg: "Order",
    order,
  });
};

exports.getSingleOrder = (req, res, next) => {
  const orderId = req.params.orderId;
  res.status(200).json({
    msg: "Order",
    id: orderId,
  });
};

exports.deleteOrder = (req, res, next) => {
  const orderId = req.params.orderId;
  res.status(200).json({
    msg: "Order",
    id: orderId,
  });
};

const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();
const PaymentDetails = require("../models/PaymentDetails");

const createOrders = async (req, res) => {
  const { amt } = req.body;
  console.log(typeof amt);
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    const order = await instance.orders.create({
      // smallest currency unit - 50000 means Rs 500
      // amount: 50000,
      amount: amt * 100,
      currency: "INR",
      receipt: "receipt_order_74394",
    });
    if (!order) throw new Error("Some error occured");
    res.json(order);
  } catch (err) {
    res.status(500);
    res.json({ error: err.message });
  }
};

const saveSuccessOrder = async (req, res) => {
  console.log(req.body);
  try {
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
      user_id,
      cartItems,
      total,
    } = req.body;
    const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
    const digest = shasum.digest("hex");

    if (digest !== razorpaySignature)
      return res.status(400).json({ msg: "Transaction not legit!" });

    const newPayment = await PaymentDetails.create({
      razorpayDetails: {
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
        signature: razorpaySignature,
      },
      user_id,
      cartItems,
      total,
      status: "Order Placed",
      success: true,
    });
    res.status(200).json({
      msg: "success!",
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const myOrders = async (req, res) => {
  console.log(req.query);
  try {
    const { user_id } = req.query;
    const orders = await PaymentDetails.find({ user_id: user_id });
    if (orders) {
      console.log(orders);
      res.status(201).json(orders);
    } else throw new Error("Internal Server error!");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await PaymentDetails.find();
    if (orders) {
      console.log(orders);
      res.status(201).json(orders);
    } else throw new Error("Internal Server Error!");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    console.log(req.body.params);
    const { payment_id, update_val } = req.body.params;
    const order = await PaymentDetails.updateOne(
      { _id: payment_id },
      { status: update_val }
    );
    if (order) res.status(200).json({ success: "Status Updated!" });
    else throw new Error("Something went wrong!");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const adminPageData = async (req, res) => {
  try {
    const orders = await PaymentDetails.find();
    var earning = 0;
    orders.forEach((item) => {
      earning += item.total;
    });
    res.status(201).json({
      orders: orders,
      earning: earning,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createOrders,
  saveSuccessOrder,
  myOrders,
  getAllOrders,
  updateOrderStatus,
  adminPageData,
};

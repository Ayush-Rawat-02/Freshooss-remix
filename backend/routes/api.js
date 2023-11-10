const express = require("express");
const router = express.Router();
const {
  authenticate,
  registerUser,
  updateUser,
} = require("../controllers/authController.js");

const {
  getFruits,
  addVegetable,
  addProduct,
  addProduct2,
} = require("../controllers/dataController.js");
const {
  createOrders,
  saveSuccessOrder,
  myOrders,
  getAllOrders,
  updateOrderStatus,
  adminPageData,
} = require("../controllers/paymentController.js");

router.post("/authenticate", authenticate);
router.post("/register", registerUser);
router.get("/fruits", getFruits);
router.post("/add", addVegetable);
router.post("/payment/orders", createOrders);
router.post("/payment/success", saveSuccessOrder);
router.get("/orders", myOrders);
router.post("/user/update", updateUser);
router.post("/product/add", addProduct);
// router.post("/product/add", addProduct2);
router.get("/admin/orders/all", getAllOrders);
router.put("/admin/orders/update", updateOrderStatus);
router.get("/admin/dashboard", adminPageData);

module.exports = router;

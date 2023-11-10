const mongoose = require("mongoose");
const paymentDetailsSchema = mongoose.Schema(
  {
    razorpayDetails: {
      orderId: String,
      paymentId: String,
      signature: String,
    },
    user_id: String,
    cartItems: [
      {
        name: String,
        img: String,
        price: Number,
        qty: Number,
      },
    ],
    total: Number,
    status: String,
    success: Boolean,
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("PaymentDetails", paymentDetailsSchema);

const mongoose = require("mongoose");
const veggieSchema = mongoose.Schema(
  {
    name: String,
    price: Number,
    img: String,
    description: String,
    discount: Number,
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Vegetable", veggieSchema);

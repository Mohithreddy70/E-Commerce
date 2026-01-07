const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      qty: {
        type: Number,
        required: true
      }
    }
  ]
});

module.exports = mongoose.model("Cart", cartSchema);

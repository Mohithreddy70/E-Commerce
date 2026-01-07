const express = require("express");
const Cart = require("../models/Cart");

const router = express.Router();

// GET CART
router.get("/", async (req, res) => {
  const cart = await Cart.findOne().populate("items.productId");
  res.json(cart);
});

// SAVE / UPDATE CART
router.post("/", async (req, res) => {
  const { items } = req.body;

  let cart = await Cart.findOne();

  if (cart) {
    cart.items = items;
  } else {
    cart = new Cart({ items });
  }

  await cart.save();
  res.json(cart);
});

module.exports = router;

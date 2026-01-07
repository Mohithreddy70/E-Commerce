function Cart({
  cart,
  addToCart,
  decreaseQty,
  removeFromCart,
  totalPrice
}) {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Cart 🛒</h2>

      {cart.length === 0 && <p>Cart is empty</p>}

      {cart.map(item => (
        <div
          key={item.product._id}
          style={{
            border: "1px solid #ccc",
            marginBottom: "10px",
            padding: "10px"
          }}
        >
          <h4>{item.product.name}</h4>
          <p>Price: ₹{item.product.price}</p>

          <button onClick={() => decreaseQty(item.product._id)}>-</button>
          <span style={{ margin: "0 10px" }}>
            Qty: {item.qty}
          </span>
          <button onClick={() => addToCart(item.product)}>+</button>

          <br /><br />

          <button onClick={() => removeFromCart(item.product._id)}>
            Remove
          </button>
        </div>
      ))}

      <hr />
      <h3>Total Amount: ₹{totalPrice}</h3>
    </div>
  );
}

export default Cart;

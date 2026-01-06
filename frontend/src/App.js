import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  // ➕ ADD TO CART (with quantity)
  const addToCart = (product) => {
    const existItem = cart.find(item => item.product._id === product._id);

    if (existItem) {
      setCart(
        cart.map(item =>
          item.product._id === product._id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { product, qty: 1 }]);
    }
  };

  // ➖ DECREASE QTY
  const decreaseQty = (productId) => {
    setCart(
      cart.map(item =>
        item.product._id === productId
          ? { ...item, qty: item.qty - 1 }
          : item
      ).filter(item => item.qty > 0)
    );
  };

  // ❌ REMOVE ITEM COMPLETELY
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.product._id !== productId));
  };

  // 💰 TOTAL PRICE
  const totalPrice = cart.reduce(
    (total, item) => total + item.product.price * item.qty,
    0
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>E-Commerce Store</h1>

      <h2>Products</h2>
      {products.map(p => (
        <div key={p._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h3>{p.name}</h3>
          <p>₹{p.price}</p>
          <button onClick={() => addToCart(p)}>Add to Cart</button>
        </div>
      ))}

      <hr />

      <h2>Cart 🛒</h2>
      {cart.length === 0 && <p>Cart is empty</p>}

      {cart.map(item => (
        <div key={item.product._id} style={{ marginBottom: "10px" }}>
          <strong>{item.product.name}</strong> – ₹{item.product.price}
          <br />

          <button onClick={() => decreaseQty(item.product._id)}>-</button>
          <span style={{ margin: "0 10px" }}>Qty: {item.qty}</span>
          <button onClick={() => addToCart(item.product)}>+</button>

          <button
            onClick={() => removeFromCart(item.product._id)}
            style={{ marginLeft: "10px" }}
          >
            Remove
          </button>
        </div>
      ))}

      <hr />
      <h3>Total: ₹{totalPrice}</h3>
    </div>
  );
}

export default App;

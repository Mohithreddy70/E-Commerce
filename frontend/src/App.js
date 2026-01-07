import { useEffect, useState, useRef } from "react";

import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


import Home from "./pages/Home";
import Cart from "./pages/Cart";
function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const isFirstLoad = useRef(true);


  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);
useEffect(() => {
  axios.get("http://localhost:5000/api/cart")
    .then(res => {
      if (res.data && res.data.items) {
        setCart(
          res.data.items.map(item => ({
            product: item.productId,
            qty: item.qty
          }))
        );
      }
      isFirstLoad.current = false; // ✅ mark load complete
    })
    .catch(() => {
      isFirstLoad.current = false;
    });
}, []);
useEffect(() => {
  if (isFirstLoad.current) return; // 🚫 skip first render

  axios.post("http://localhost:5000/api/cart", {
    items: cart.map(item => ({
      productId: item.product._id,
      qty: item.qty
    }))
  });
}, [cart]);


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
  <Router>
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link to="/" style={{ marginRight: "15px" }}>
        Home
      </Link>

      <Link to="/cart">
        Cart ({cart.length})
      </Link>
    </nav>

    <Routes>
      <Route
        path="/"
        element={
          <Home
            products={products}
            addToCart={addToCart}
          />
        }
      />

      <Route
        path="/cart"
        element={
          <Cart
            cart={cart}
            addToCart={addToCart}
            decreaseQty={decreaseQty}
            removeFromCart={removeFromCart}
            totalPrice={totalPrice}
          />
        }
      />
    </Routes>
  </Router>
);

}

export default App;

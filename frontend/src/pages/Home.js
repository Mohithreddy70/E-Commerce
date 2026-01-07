function Home({ products, addToCart }) {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Products</h2>

      {products.map(p => (
        <div
          key={p._id}
          style={{
            border: "1px solid #ccc",
            marginBottom: "10px",
            padding: "10px"
          }}
        >
          <h3>{p.name}</h3>
          <p>₹{p.price}</p>
          <button onClick={() => addToCart(p)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;

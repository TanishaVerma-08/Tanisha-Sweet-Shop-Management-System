export default function Cart({ cart, goBack, removeItem }) {
  const items = Object.values(cart);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );

  return (
    <div className="container">
      <button className="back-btn" onClick={goBack}>⬅ Back</button>

      <h2>Cart</h2>

      {items.length === 0 && <p>No items in cart</p>}

      {items.map(item => (
        <div key={item.id} className="cart-item-row">
          <span>
            {item.name} × {item.count} — ₹{item.price * item.count}
          </span>
          <button
            className="remove-btn"
            onClick={() => removeItem(item.id)}
          >
            ✕ Remove
          </button>
        </div>
      ))}

      <hr />
      <h3>Total: ₹{total}</h3>
    </div>
  );
}

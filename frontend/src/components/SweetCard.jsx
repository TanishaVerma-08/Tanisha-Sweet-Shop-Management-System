import { useState } from "react";
import api from "../api";

export default function SweetCard({ sweet, isAdmin, refresh, addToCart }) {
  const [updating, setUpdating] = useState(false);
  const [form, setForm] = useState({
    name: sweet.name,
    category: sweet.category,
    price: sweet.price,
    quantity: sweet.quantity
  });

  const buy = async () => {
    await api.post(`/api/sweets/${sweet.id}/purchase`);
    addToCart(sweet);
    refresh();
  };

  const del = async () => {
    await api.delete(`/api/sweets/${sweet.id}`);
    refresh();
  };

  const updateSweet = async () => {
    await api.put(`/api/sweets/${sweet.id}`, {
      name: form.name,
      category: form.category,
      price: Number(form.price),
      quantity: Number(form.quantity)
    });
    setUpdating(false);
    refresh();
  };

  return (
    <div className="product-card">
      {!updating ? (
        <>
          <h3>{sweet.name}</h3>
          <p>{sweet.category}</p>
          <p className="price">₹{sweet.price}</p>
          <p className="stock">Stock: {sweet.quantity}</p>

          <button
            className="buy-btn"
            disabled={sweet.quantity === 0}
            onClick={buy}
          >
            🛒 {sweet.quantity === 0 ? "Out of Stock" : "Purchase"}
          </button>

          {isAdmin && (
            <div className="admin-actions">
              <button className="update-btn" onClick={() => setUpdating(true)}>
                ✏️ Update
              </button>

              <button className="delete-btn" onClick={del}>
                🗑 Delete
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          <input
            placeholder="Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
          <input
            placeholder="Category"
            value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
          />
          <input
            placeholder="Price"
            value={form.price}
            onChange={e => setForm({ ...form, price: e.target.value })}
          />
          <input
            placeholder="Quantity"
            value={form.quantity}
            onChange={e => setForm({ ...form, quantity: e.target.value })}
          />

          <button className="update-btn" onClick={updateSweet}>
            ✔ Save Update
          </button>
        </>
      )}
    </div>
  );
}

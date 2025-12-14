import { useState } from "react";
import api from "../api";

export default function AdminModal({ close, refresh, sweet, mode }) {
  const [form, setForm] = useState({
    name: sweet?.name || "",
    category: sweet?.category || "",
    price: sweet?.price || "",
    quantity: sweet?.quantity || ""
  });

  const submit = async () => {
    if (mode !== "edit") {
      const res = await api.get("/api/sweets");
      const exists = res.data.some(
        s => s.name.toLowerCase() === form.name.trim().toLowerCase()
      );

      if (exists) {
        alert("This item already exists");
        return;
      }
    }

    if (mode === "edit") {
      await api.put(`/api/sweets/${sweet.id}`, {
        name: form.name,
        category: form.category,
        price: Number(form.price),
        quantity: Number(form.quantity)
      });
    } else {
      await api.post("/api/sweets", {
        name: form.name,
        category: form.category,
        price: Number(form.price),
        quantity: Number(form.quantity)
      });
    }

    refresh();
    close();
  };

  return (
    <div className="overlay" onClick={close}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h3>{mode === "edit" ? "Update Sweet" : "Add Sweet"}</h3>

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

        <button onClick={submit}>
          {mode === "edit" ? "Update Sweet" : "Add Sweet"}
        </button>
      </div>
    </div>
  );
}

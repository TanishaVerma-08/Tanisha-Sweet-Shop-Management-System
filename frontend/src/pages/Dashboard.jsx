import { useEffect, useState } from "react";
import api from "../api";
import SweetCard from "../components/SweetCard";
import AdminModal from "../components/AdminModal";
import Cart from "./Cart";

export default function Dashboard({ user }) {
  const [sweets, setSweets] = useState([]);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState({});
  const [search, setSearch] = useState("");

  const loadSweets = async () => {
    const res = await api.get("/api/sweets");
    setSweets(res.data);
  };

  useEffect(() => {
    loadSweets();
  }, []);

  const addToCart = (sweet) => {
    setCart(prev => {
      const existing = prev[sweet.id];
      return {
        ...prev,
        [sweet.id]: {
          ...sweet,
          count: existing ? existing.count + 1 : 1
        }
      };
    });

    setSweets(prev =>
      prev.map(s =>
        s.id === sweet.id ? { ...s, quantity: s.quantity - 1 } : s
      )
    );
  };

  const removeFromCart = (id) => {
    setCart(prev => {
      const item = prev[id];
      if (!item) return prev;

      const updated = { ...prev };
      delete updated[id];

      setSweets(sweets =>
        sweets.map(s =>
          s.id === id ? { ...s, quantity: s.quantity + item.count } : s
        )
      );

      return updated;
    });
  };

  const filtered = sweets.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  if (showCart) {
    return (
      <Cart
        cart={cart}
        removeItem={removeFromCart}
        goBack={() => setShowCart(false)}
      />
    );
  }

  return (
    <div className="container">
      <div className="header-row">
        <h2>Available Sweets</h2>

        <div className="header-actions">
          <div className="search-box">
            <input
              className="search"
              placeholder="Search sweets..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && filtered.length > 0 && (
              <div className="search-dropdown">
                {filtered.map(s => (
                  <div
                    key={s.id}
                    className="search-item"
                    onClick={() => setSearch(s.name)}
                  >
                    {s.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button className="cart-btn" onClick={() => setShowCart(true)}>
            🛒 Cart ({Object.values(cart).reduce((a, b) => a + b.count, 0)})
          </button>

          {user?.is_admin && (
            <button className="admin-btn" onClick={() => setShowAdmin(true)}>
              ➕ Add Sweet
            </button>
          )}
        </div>
      </div>

      <div className="grid">
        {(search ? filtered : sweets).map(s => (
          <SweetCard
            key={s.id}
            sweet={s}
            isAdmin={user?.is_admin}
            addToCart={addToCart}
            refresh={loadSweets}
          />
        ))}
      </div>

      {user?.is_admin && showAdmin && (
        <AdminModal close={() => setShowAdmin(false)} refresh={loadSweets} />
      )}
    </div>
  );
}

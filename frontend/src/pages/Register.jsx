import { useState } from "react";
import api from "../api";

export default function Register({ switchView }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
    is_admin: false
  });

  const register = async () => {
    await api.post("/api/auth/register", form);
    switchView();
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card enhanced">
        <h1 className="brand-title">🍬 Sweet Shop</h1>
        <h2>Create Account</h2>
        <p className="auth-subtitle">Join us and enjoy delicious sweets</p>

        <input
          placeholder="Username"
          onChange={e => setForm({ ...form, username: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        <div className="admin-row">
          <label>
            <input
              type="checkbox"
              onChange={e =>
                setForm({ ...form, is_admin: e.target.checked })
              }
            />
            Register as admin
          </label>
        </div>

        <button onClick={register}>Create Account</button>

        <p className="switch-text">
          Already have an account?
          <span onClick={switchView}> Login</span>
        </p>
      </div>
    </div>
  );
}

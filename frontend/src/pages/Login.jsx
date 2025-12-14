import { useState } from "react";
import api from "../api";

export default function Login({ switchView }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const login = async () => {
    try {
      setError(false);
      setMessage("");

      const res = await api.post("/api/auth/login", form);
      localStorage.setItem("token", res.data.access_token);
      window.location.reload();
    } catch (err) {
      setError(true);
      setMessage("Wrong credentials entered");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card enhanced">
        <h1 className="brand-title">🍬 Sweet Shop</h1>
        <h2>Welcome Back</h2>

        {message && <div className="error-msg">{message}</div>}

        <input
          className={error ? "input-error" : ""}
          placeholder="Username"
          value={form.username}
          onChange={e =>
            setForm({ ...form, username: e.target.value })
          }
        />

        <input
          type="password"
          className={error ? "input-error" : ""}
          placeholder="Password"
          value={form.password}
          onChange={e =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button onClick={login}>Login</button>

        <p className="switch-text">
          Don’t have an account?
          <span onClick={switchView}> Create one</span>
        </p>
      </div>
    </div>
  );
}

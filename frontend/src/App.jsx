import { useState } from "react";
import { getUserFromToken } from "./utils/auth";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";

export default function App() {
  const user = getUserFromToken();
  const [view, setView] = useState("login");

  if (!user) {
    return view === "login"
      ? <Login switchView={() => setView("register")} />
      : <Register switchView={() => setView("login")} />;
  }

  return (
    <>
      <Navbar user={user} />
      <Dashboard user={user} />
    </>
  );
}

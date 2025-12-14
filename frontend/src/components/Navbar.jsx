export default function Navbar({ user }) {
  return (
    <div className="navbar">
      <h1>🍬Tanisha's Sweet Shop</h1>

      <div className="nav-user">
        <div className="user-info">
          <span className="welcome-text">
            Welcome <strong>{user.username}</strong>
          </span>

          <span className={`role-badge ${user.is_admin ? "admin" : "user"}`}>
            {user.is_admin ? "Admin" : "User"}
          </span>
        </div>

        <button
          className="logout-btn"
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

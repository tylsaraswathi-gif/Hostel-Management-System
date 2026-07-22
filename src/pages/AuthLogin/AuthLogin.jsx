import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";
import "./AuthLogin.css";

function AuthLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      alert(response.data.message);

      // Save logged-in user
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      navigate("/");
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Unable to connect to server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-login-container">
      <form className="auth-login-form" onSubmit={handleSubmit}>
        <h2>User Login</h2>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="register-link">
          Don't have an account?{" "}
          <Link to="/auth-register">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default AuthLogin;
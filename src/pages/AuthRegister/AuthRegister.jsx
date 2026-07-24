import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";
import "./AuthRegister.css";

function AuthRegister() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
        role,
      });

      alert(response.data.message || "Registration Successful!");

      // Clear form
      setName("");
      setEmail("");
      setPassword("");
      setRole("student");

      // Redirect to Login page
      navigate("/auth-login");

    } catch (error) {
      console.error("Registration Error:", error);

      const message =
        error.response?.data?.message ||
        "Registration Failed. Please try again.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-register-container">
      <form className="auth-register-form" onSubmit={handleSubmit}>
        <h2>User Registration</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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
          minLength={6}
          required
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>

        {error && (
          <p
            style={{
              color: "red",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            {error}
          </p>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="login-link">
          Already have an account?{" "}
          <Link to="/auth-login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default AuthRegister;
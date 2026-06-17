import { useState } from "react";
import LoginForm from "./components/LoginForm";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (!username.trim() || !password.trim()) {
      setError("Username and password are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      // backend rejected login
      if (!res.ok) {
        setError(data.message || "Invalid username or password");
        setLoading(false);
        return;
      }

      // success
      setError("");
      console.log("Login successful:", data);

    } catch (err) {
      setError("Cannot connect to server");
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>Login Page</h1>

      <LoginForm
        username={username}
        password={password}
        onUsernameChange={(e) => setUsername(e.target.value)}
        onPasswordChange={(e) => setPassword(e.target.value)}
        onSubmit={handleLogin}
        error={error}
      />

      {loading && <p>Logging in...</p>}
    </div>
  );
}

export default App;
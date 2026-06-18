import { useState } from "react";
import LoginForm from "./components/LoginForm";
import ChuckNorris from "./components/ChuckNorris";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError("Username and password are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3333/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok && data.uuid) {
        console.log("Login response:", data);
        setToken(data.uuid);
        setError("");
      } else {
        setError(data.message || "Invalid username or password.");
      }
    } catch (error) {
      setError("Could not connect to the server.");
    }
  };

  if (token) {
    return <ChuckNorris token={token} />;
  }

  return (
    <div>

      <LoginForm
        username={username}
        password={password}
        onUsernameChange={(event) => setUsername(event.target.value)}
        onPasswordChange={(event) => setPassword(event.target.value)}
        onSubmit={handleLogin}
        error={error}
      />
    </div>
  );
}

export default App;
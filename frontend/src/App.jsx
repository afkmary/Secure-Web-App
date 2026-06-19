import { useState } from "react";
import LoginForm from "./components/LoginForm";
import ChuckNorris from "./components/ChuckNorris";
import { validateLoginForm } from "./utils/validation";
import { login } from "./services/authService";
import './App.css';

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    const validationError = validateLoginForm(username, password);
    if (validationError) {
      setError(validationError);
      return;
    }

    const result = await login(username, password);

    if (result.token) {
      setToken(result.token);
      setError("");
    } else {
      setError(result.error);
    }
  };

  if (token) {
    return <ChuckNorris token={token} setToken={setToken} />;
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
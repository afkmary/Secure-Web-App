import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./LoginForm.css";

function LoginForm({
  username,
  password,
  onUsernameChange,
  onPasswordChange,
  onSubmit,
  error
}) {

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-container">
      <form
        className="login-form"
        onSubmit={onSubmit}
        autoComplete="off"
      >
        <h1 className="app-title">Chuck Norris Facts</h1>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            value={username}
            onChange={onUsernameChange}
            placeholder="Enter username"
            autoComplete="off"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={onPasswordChange}
              placeholder="Enter password"
              autoComplete="new-password"
              required
            />

            <button
              type="button"
              className="eye-button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        <button type="submit" disabled={false}>
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
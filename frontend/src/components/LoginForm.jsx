import "./LoginForm.css";

function LoginForm({
  username,
  password,
  onUsernameChange,
  onPasswordChange,
  onSubmit,
  error
}) {
  return (
    <div className="login-container">
      <form
        className="login-form"
        onSubmit={onSubmit}
        autoComplete="off"
      >
        <h2>Login</h2>

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
          <input
            type="password"
            value={password}
            onChange={onPasswordChange}
            placeholder="Enter password"
            autoComplete="new-password"
            required
          />
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
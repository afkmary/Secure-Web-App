function LoginForm({ setToken }) {
  return (
    <div>
      <h2>Login Form Component</h2>

      <button onClick={() => setToken("test-token")}>
        Fake Login
      </button>
    </div>
  );
}

export default LoginForm;
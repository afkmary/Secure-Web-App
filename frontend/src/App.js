import { useState } from "react";
import "./App.css";

import LoginForm from "./components/LoginForm";
import ChuckNorris from "./components/ChuckNorris";

function App() {
  const [token, setToken] = useState("");

  return (
    <div className="app">
      <h1>Chuck Norris Facts</h1>

      {!token ? (
        <LoginForm setToken={setToken} />
      ) : (
        <ChuckNorris token={token} />
      )}
    </div>
  );
}

export default App;
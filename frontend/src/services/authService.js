const BACKEND_URL = "http://localhost:3333";

export async function login(username, password) {
  try {
    const response = await fetch(`${BACKEND_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok && data.uuid) {
      return { token: data.uuid };
    }

    return { error: data.message || "Invalid username or password." };
  } catch (err) {
    return { error: "Could not connect to the server." };
  }
}
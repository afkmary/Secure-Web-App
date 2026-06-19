const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateUsername(username) {
  const value = (username || "").trim();
  if (!value) {
    return "Username is required.";
  }

  if (!EMAIL_PATTERN.test(value)) {
    return "Invalid username.";
  }
  return "";
}

export function validatePassword(password) {
  const value = password || "";
  if (!value) {
    return "Password is required.";
  }
  return "";
}

export function validateLoginForm(username, password) {
  return validateUsername(username) || validatePassword(password) || "";
}
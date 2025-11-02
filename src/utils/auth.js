// src/utils/auth.js

const USERS_KEY = 'fake_users';
const AUTH_KEY = 'current_user';

// Get all registered users
export const getUsers = () => {
  const users = localStorage.getItem(USERS_KEY); //returns a JSON string or null if no one exists
  return users ? JSON.parse(users) : {}; //if data exists parse it to an js object else return empty object
};

// Save a new user (signup)
export const signup = (username, password) => {
  const users = getUsers();
  if (users[username]) {
    throw new Error('Username already exists');
  }
  users[username] = password; //adding username and password to users object
  localStorage.setItem(USERS_KEY, JSON.stringify(users)); //saving the objectback to LS
  //Point to be noted here that we are not hashing the password before storing it in localStorage.
  // In a real-world application, passwords should always be hashed and salted before storage to enhance security.
};

// Login: check credentials
export const login = (username, password) => {
  const users = getUsers();
  if (users[username] && users[username] === password) {
    localStorage.setItem(AUTH_KEY, JSON.stringify({ username }));
    return { username };
  }
  throw new Error('Invalid username or password');
};

// Get current logged-in user
export const getCurrentUser = () => {
  const user = localStorage.getItem(AUTH_KEY);
  return user ? JSON.parse(user) : null;
};

// Logout
export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
};

// localStorage only stores strings — not objects, numbers, booleans, or arrays.

// So when we save structured data like a user object, we must:

// Convert it to a string using JSON.stringify() → before saving.
// Convert it back to an object using JSON.parse() → after reading.

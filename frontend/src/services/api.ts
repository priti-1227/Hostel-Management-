// API services for authentication

const API_BASE_URL = "http://localhost:5000/api/auth"; 

export type UserData = {
  name: string;
  email: string;
  password: string;
};
export type credentials = {
  email: string;
  password: string;
  type: string;
};

export const registerUser = async (userData: UserData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData || "Signup failed";
    }

    return await response.json();
  } catch (error) {
    throw error || "Signup failed";
  }
};
export const loginUser = async (credentials: credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData || "Login failed";
    }

    return await response.json();
  } catch (error) {
    throw error || "Login failed";
  }
};

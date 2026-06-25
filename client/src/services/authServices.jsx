const API_URL = import.meta.env.VITE_API_URL;

const getToken = () => {
  return localStorage.getItem("token");
};

export const registerUser = async (
  userData
) => {
  const response = await fetch(
    `${API_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(userData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Registration failed"
    );
  }

  return data;
};

export const loginUser = async (
  userData
) => {
  const response = await fetch(
    `${API_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(userData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Login failed"
    );
  }

  return data;
};

export const getProfile =
  async () => {
    const response =
      await fetch(
        `${API_URL}/auth/profile`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Failed to fetch profile"
      );
    }

    return data;
  };

export const logoutUser = () => {
  localStorage.removeItem(
    "token"
  );

  localStorage.removeItem(
    "user"
  );

};
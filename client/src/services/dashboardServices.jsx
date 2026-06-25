const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

const apiRequest = async (endpoint) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: getAuthHeaders(),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.message || `Request failed with status ${response.status}`
    );
  }

  return data;
};

export const getDashboardOverview = () => {
  return apiRequest("/dashboard/overview");
};

export const getDashboardDevices = () => {
  return apiRequest("/dashboard/devices");
};

export const getDashboardEvents = () => {
  return apiRequest("/dashboard/events");
};
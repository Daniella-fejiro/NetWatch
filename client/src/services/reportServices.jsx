

const BASE_URL = "http://localhost:5000/api";

export const getSystemAnalytics = async (range = 24) => {
  const token = localStorage.getItem("token");

  const { data } = await fetch(
    `${BASE_URL}/report/system?range=${range}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};
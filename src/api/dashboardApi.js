export const getDashboardData = async () => {
    const token = localStorage.getItem("token");
  
    const res = await fetch("http://localhost:5000/api/dashboard-stats", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch dashboard data");
    }
  
    return res.json();
  };
  
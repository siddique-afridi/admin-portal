

export const fetchResultsData = async (token) => {
    const res = await fetch("http://localhost:5000/api/result-data",{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    });
    if (!res.ok) throw new Error("Failed to fetch results data");
    return res.json();
  };
  

const API_URL = "http://localhost:5000/api/results";



export const createResult = async(resultData, token)=> {
    const res = await fetch(API_URL,{
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(resultData)
    })
    return res.json()
}

export const getResultData = async(token)=>{
    const res = await fetch(API_URL, {
        method: "GET",
        headers: {
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`
        },

    })
    return res.json();
}

export const deleteResult = async(token,id)=>{
    const res = await fetch(`${API_URL}/${id}`,{
        method: "DELETE",
        headers: {
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`
        },

    })
    return res.json();
}



export const loadData = async(token)=> {
    const res = await fetch("http://localhost:5000/api/results/load-data", {
        method: "GET",
        headers: {
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`
        },
    })

    return res.json()
}
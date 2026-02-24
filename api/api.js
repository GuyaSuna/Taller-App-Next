const BASE_URL = "https://api-react-taller-production.up.railway.app";

const register = async (username , name , password  ) =>{

    const response = await fetch(`${BASE_URL}/api/auth/register` , {
        method: "POST",
        headers:{"Content-Type": "application/json",},
        body: JSON.stringify({username, name, password})
    });

    const data = await response.json();

    console.log("Informacion de Registro" , data);
}



const login = async (username , password) =>{
    const response = await fetch(`${BASE_URL}/api/auth/login`,{
        method: "POST",
        headers:{"Content-Type" : "application/json"},
        body: JSON.stringify({username , password})
    });

    const data = await response.json();

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    return data;
    
}


const getLocals = async (q = "" , type = "" , priceRange = "" , rating = "" , city = "" , zone = "") =>{
    const data = await fetch(`${BASE_URL}/api/locals?q=${q}&type=${type}&priceRange=${priceRange}&rating=${rating}&city=${city}&zone=${zone}`).then(res => res.json());

    return data;

}


const postLocal = async (name, type, priceRange , city, zone, address , hours , photos) =>{
    const response = await fetch(`${BASE_URL}/api/locals`,{
        method: "POST",
        headers:{"Content-Type" : "application/json",
            "Authorization" : `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({name, type, priceRange , city, zone, address , hours , photos})
    });

    const data = await response.json();

    console.log("Informacion del Local Creado", data);

}

export{
    register,
    login,
    getLocals,
    postLocal,
}



// GET - No precisa cuerpo


// POST
// DELETE
// PUT
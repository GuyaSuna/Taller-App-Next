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



export{
    register
}




// GET - No precisa cuerpo


// POST
// DELETE
// PUT
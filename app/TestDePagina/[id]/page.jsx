'use client';
import { useEffect , useState } from "react";
import { useParams } from "next/navigation";

const testPage = async () => {

    const [user , setUser] = useState(null);
    const [token , setToken] = useState("");
    const params = useParams();
    const {id} = params;

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        setUser(user);
         const token = localStorage.getItem("token");
         setToken(token);
    }, [])


    return(<><h1>Test Page {id}</h1>
            <h2>User: {user?.name || "Not logged in"}</h2>
            <h2>Token: {token}</h2></>
    )
}



export default testPage;
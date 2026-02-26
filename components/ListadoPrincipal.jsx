'use client';

import { useState , useEffect} from "react";
import { getLocals } from "../api/api";
import Busqueda from "./Busqueda";
import Link from "next/link";

const ListadoPrincipal = () => {
    const [user , setUser] = useState(null);
    const [token , setToken] = useState("");
    const [locals , setLocals] = useState([]);

    const [query , setQuery] = useState("");
    const [type , setType] = useState("");
    const [priceRange , setPriceRange] = useState("");
    const [rating , setRating] = useState("");
    const [city , setCity] = useState("");
    const [zone , setZone] = useState("");
    
    useEffect(() => {
        const u = JSON.parse(localStorage.getItem("user"));
        setUser(u);
        const t = localStorage.getItem("token")
        setToken(t);
    },[])

    
    useEffect(() => {
        const fetchLocals = async () =>{
         const data = await getLocals(query, type , priceRange , rating , city , zone);
         console.log("Locales" , data.items);
         setLocals(data.items);
        }
        fetchLocals();
    },[query, type, priceRange, rating, city, zone]);


    return( <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Listado de Locales</h2>
        <Busqueda setQuery={setQuery} setType={setType} setPriceRange={setPriceRange} setRating={setRating} setCity={setCity} setZone={setZone} />
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {locals.map((local) => (
            <div key={local.id} className="group relative">
              <img
                alt={local.name}
                src={local.photos ? local.photos[0] : "https://img.freepik.com/vector-gratis/apoye-concepto-negocio-local_23-2148592675.jpg?semt=ais_user_personalization&w=740&q=80"}
                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
              />
              <div className="mt-4 flex justify-between">
                <div>
                  
                    <Link href={`VerLocal/${local.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {local.name}
                    </Link>
               
                  <p className="mt-1 text-sm text-gray-500">{local.type}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{local.city}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>);

}


export default ListadoPrincipal;
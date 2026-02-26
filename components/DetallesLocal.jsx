
import { useEffect , useState } from "react";
import { useParams } from "next/navigation";
import { getLocal } from "../api/api";
import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import { Rating } from "@material-tailwind/react";
import RestaurantRating from "../components/RestaurantRating";
import Link from "next/link";


const DetallesLocal = () => {
    const [local , setLocal] = useState({});
    const [refresh , setRefresh] = useState(false);
    const params = useParams();


    const features = [
  {
    name: 'Ciudad.',
    description: local.city,
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Zona.',
    description: local.zone,
    icon: LockClosedIcon,
  },
  {
    name: 'Direccion.',
    description: local.address,
    icon: ServerIcon,
  },
]

    useEffect(() => {
        const fetchLocal = async () =>{
           const data = await getLocal(params.id);
           console.log(data)
           setLocal(data.item);
        }

        fetchLocal()
    },[refresh])


   return (
    <>
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pt-4 lg:pr-8">
            <div className="lg:max-w-lg">
            
              <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                {local.name}
              </p>
              <p className="mt-6 text-lg/8 text-gray-700">
                {local.description}
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon aria-hidden="true" className="absolute top-1 left-1 size-5 text-indigo-600" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
               <Link href={`/Perfil/${local.creatorId}`}>{local.creator?.name}</Link>
              </dl>
            </div>
          </div>
          <img
            alt="Product screenshot"
            src={local.photos? local.photos[0] : "https://tailwindcss.com/plus-assets/img/component-images/project-app-screenshot.png" } 
            width={2432}
            height={1442}
            className="w-3xl  rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-228 md:-ml-4 lg:-ml-0"
          />
        </div>
      </div>
    </div>

       <RestaurantRating id={local.id} name={local.name} setRefresh={setRefresh} />
       
        <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
          {local.reviews?.map((review) => (
            <li key={review.id}>
              <div className="flex items-center gap-x-6">
                <img
                  alt="imagen de usuario"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFv_rUJ2Ru3GR0Jxy2YTNH_jrVzX3_HY-THQ&s"
                  className="size-16 rounded-full outline-1 -outline-offset-1 outline-black/5"
                />
                <div>
                  {/* <h3 className="text-base/7 font-semibold tracking-tight text-gray-900">{review.rating}</h3> */}
                  <Rating value={review.rating} readonly />
                  <p className="text-sm/6 font-semibold text-indigo-600">{review.comment}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
       </>
  )
}

export default DetallesLocal;
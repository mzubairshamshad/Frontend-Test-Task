'use client'

import {useEffect, useState} from "react";
import Image from "next/image";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useFormValidation} from "@/Validations/useFormValidation";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import {useRouter} from "next/navigation";



export default function Home() {
    const [loadingData, setLoadingData] = useState(false);
    const [filmsData,setFilmsData] = useState([]);
    const [user, setUser] = useState({})
    const {formValidationSchema} = useFormValidation();

    const router = useRouter();

    useEffect(()=>{
        get_all_films()
    },[])

    // form hook function
    const {register, setError, control, watch, handleSubmit, getValues, formState: {errors, isValid}} = useForm({
        defaultValues: {
            first_name: '',
            last_name: '',
        },
        mode: "onSubmit",
        resolver: yupResolver(formValidationSchema),
    });

    const query = gql`
   query allFilms($after: String $before: String $first: Int $last: Int){
    allFilms(after:$after before:$before first:$first last:$last){
      films {
      title
      director
      releaseDate
      speciesConnection {
        species {
          name
          classification
          homeworld {
            name
          }
        }
      }
    }
  }
  }
`;

    const [allFilms, { loading, error, data }] = useLazyQuery(query, {
        fetchPolicy: "no-cache",
        context: {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        },
    });


    const get_all_films= async (

    ) => {
        setLoadingData(true);
        const { loading, error, data } = await allFilms('','',0,0);
        setLoadingData(false);
        if (error) {
            console.log(error);
            // Handle error state
        }
        setFilmsData(data?.allFilms?.films)
        console.log("data", data?.allFilms?.films)
    };

    // Function to submit form api
    const onSubmit = async data => {
        try {
            setLoadingData(true);
            if (!data.first_name || !data.last_name) {
                throw new Error("First name and last name are required.");
            }
            router.push('/success');
        } catch (e) {
            console.log("Error", e)
            setLoadingData(false);
        }
    }


    return (
        <main className="h-screen flex flex-col items-center justify-center">
            <form className="w-full max-w-[1000px]" onSubmit={handleSubmit(onSubmit)}>
                <div className="rounded-md px-7 py-4 bg-white ">
                    <div className="">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">My form</h2>

                        <div className="mt-4">
                            {errors.first_name && <p className="text-red-500">{errors.first_name.message}</p>}
                            {errors.last_name && <p className="text-red-500">{errors.last_name.message}</p>}
                        </div>

                        <div className="mt-5 grid gap-4 grid-cols-1 lg:grid-cols-2 mb-60">
                            <div className="">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                    First name<span className="text-red-500">*</span>
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                                        <input
                                            type="text"
                                            name="first_name"
                                            id="first_name"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder=""
                                            {...register("first_name")}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                    Last name<span className="text-red-500">*</span>
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="text"
                                            name="last_name"
                                            id="last_name"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder=""
                                            {...register("last_name")}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                    Favorite star wars movie<span className="text-red-500">*</span>
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <select className="block flex-1 border-0 bg-transparent py-2 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6">
                                            {filmsData?.length > 0 && filmsData?.map((film)=>(
                                                <option>{film?.title}</option>
                                            ))}

                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button type="submit" style={{ background: '#00B3FF'}}
                                className="rounded-md bg-indigo-600 px-4 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit
                        </button>
                    </div>
                </div>
            </form>
        </main>
    );
}

'use client'

import { useEffect } from "react"
// import { useActivationMutation } from "@/redux/features/authApiSlice"
// // import {t}
import { useActivation } from "@/hooks/use-verify";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";

interface Props{
    params:{
        uid: string;
        token: string;
    }
}



export default function  Page({params}:Props){
    const router = useRouter()
    const {activation} = useActivation();

    useEffect(() =>{

        const { uid , token } = params;
        console.log(params);
        

        activation({uid,token})
            .then(()=>{
                toast.success('account activate')
            })
            .catch((error)=>{
                console.log(error.data.detail);
                console.log(error.status);
                console.log(error);
                
                toast.error(error.data.detail)
            })
            .finally(()=>{
                router.push('/auth/login')
            })

        // activation()
    }, [activation, params, router])

    return (
        <div  className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auth sm:w-full sm:max-w-sm">
                <div className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                <h1>activate</h1>
                </div>
            </div>
        </div>
    )
}
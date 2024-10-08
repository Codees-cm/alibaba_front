"use client"
import { useMutation } from '@tanstack/react-query';
import { createJWT } from '@/utils/apis/auth';
import Cookies from 'js-cookie'; // Import Cookies library
import  { useState } from 'react';
// import { useToast } from "@/components/ui/use-toast"


export const useLogin = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg,setErrorMsg] = useState("");
  // const { toast } = useToast()
  
  const { mutate: loginUserMutation, isPending: isLoginingUser } = useMutation({
    mutationFn: createJWT,
    onSuccess: (data) => {
      Cookies.set('access', data.data.access); // Set access token in cookies
      Cookies.set('refresh', data.data.refresh); // Set refresh token in cookies
      setIsSuccess(true);
      // toast({
      //   title: "logged in successfull",
      //   description: "...........",
      // })
    },
    onError: (error) => {
      setErrorMsg(error.message);
      // toast({
      //   title: "Uh oh! Something went wrong.",
      //   description: "There was a problem with your request.",
      // })
      // console.error("Error occurred during login:", error);
    },
  });

  const login = async (user_info: any) => {
    try {
      await loginUserMutation(user_info);
    } catch (error) {
      console.log({ERROR: error})
      setErrorMsg((error as Error).message || "An error occurred during login.");
    }
  };

  return {
    isSuccess,
    login,
    isLoginingUser,
    errorMsg
  };
};



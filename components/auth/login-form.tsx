"use client";
import CardWrapper from "./card-wrapper";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoginSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { useLogin } from "@/hooks/use-login";
import { useRouter } from "next/navigation";
import instance from "@/utils/api";
import { auth, googleProvider, signInWithPopup } from "@/utils/firebase";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const { login, isSuccess, errorMsg } = useLogin();
  const router = useRouter();


  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();
     
      const res = await instance.post("/google-auth/",{ id_token: idToken ,login: true })

      console.log(res.status)

      if (res.status == 201) {
        // toast.success("Google sign-in successful");
        router.push('/home');
      }else if(res.status == 404) {
        // toast.success("your account does not exit , please register");
      }else {
        const errorData = await res.json();
        // toast.error(errorData.error);
      }
    } catch (error) {
      // toast.error("Google sign-in failed. Please try again.");
    }
  };

  const onSubmit = async (data:any) => {
    setLoading(true);
    await login(data);
  
    if (isSuccess) {
      // toast({ title: "Login successful!", description: "Redirecting to dashboard..." });
      // setTimeout(() => {
        router.push("/dashboard");
      // }, 1000); // Delay routing by 1 second to allow toast to show
    } else {
      
    }
  
    setLoading(false);
  };
  

  return (
    <CardWrapper
      label="Login to your account"
      title="Login"
      backButtonHref="/en/auth/login"
      backButtonLabel="forgot password"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="johndoe@gmail.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="******" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;

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
import { z } from "zod";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useLogin } from "@/hooks/use-login";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const { login, isLoginingUser, isSuccess, errorMsg } = useLogin();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    setLoading(true);
   
    await login(data);
  
    (errorMsg) ?  toast({ title: "Uh oh! Something went wrong.", description: errorMsg || "Please try again"}) : toast({ title: "Success",description :"please wait some seconds"})
 
    setLoading(false);
  };

  useEffect(() => {
    if (isSuccess) {
      router.push("/en/dashboard");
    } else if(errorMsg){
      toast({ title: "Uh oh! Something went wrong.", description: errorMsg || "Please try again"})
    }
  }, [isSuccess, router,errorMsg]);

  return (
    <CardWrapper
      label="Login to your account"
      title="Login"
      backButtonHref="/auth/register"
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
          <Button type="submit" className="w-full" disabled={isLoginingUser}>
            {loading ? "Loading..." : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;

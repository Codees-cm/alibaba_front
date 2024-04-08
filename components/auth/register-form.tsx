"use client"
import CardWrapper from "./card-wrapper";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RegisterSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { useState , useEffect } from "react";
import { useRegister } from "@/hooks/use-register";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const {register, isRegisteringUser , isSuccess} = useRegister();
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: ""
    },
  });

  const onSubmit = async (data :z.infer<typeof RegisterSchema>) => {
    // event.preventDefault();
    setLoading(true);
    console.log(data);
    // Simulate API call delay
    try {
      await register(data);
      // if (isSuccess) 
    } catch (error) {
      console.error("Error occurred during form submission:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (isSuccess) {
      router.push('/dashboard')
    }
  }, [isSuccess,router ]);


  return (
    <CardWrapper
      label="Create an account"
      title="Register"
      backButtonHref="/auth/login"
      backButtonLabel="Already have an account? Login here."
    >
      <Form {...form}>
      <form method="POST" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name:</FormLabel>
                <Input {...field} type="text" placeholder="Your name" />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            // control={control}
            control={form.control}
           
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email:</FormLabel>
                <Input {...field} type="email" placeholder="johndoe@gmail.com" />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            // control={control}
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password:</FormLabel>
                <Input {...field} type="password" placeholder="******" />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            // control={control}
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password:</FormLabel>
                <Input {...field} type="password" placeholder="******" />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isRegisteringUser}>
            {loading ? "Loading..." : "Register"}
          </Button>
        </div>
      </form>
      </Form>
      
    </CardWrapper>
  );
};

export default LoginForm;

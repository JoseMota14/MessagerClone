"use client";

import Button from "@/app/Components/Button/Button";
import Input from "@/app/Components/Input/Input";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

type Variant = "LOGIN" | "REGISTER";

export default function AuthForm() {
  const session = useSession();
  const router = useRouter();

  const [type, setType] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoging] = useState<boolean>(false);

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/users");
    }
  }, [session.status, router]);

  const changeType = useCallback(() => {
    if (type === "LOGIN") {
      setType("REGISTER");
    } else {
      setType("LOGIN");
    }
  }, [type]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: "", email: "", password: "" },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoging(true);
    if (type === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() => signIn("credentials", data))
        .catch(() => toast.error("Error in register"))
        .finally(() => setIsLoging(false));
    }
    if (type === "LOGIN") {
      signIn("credentials", { ...data, redirect: false })
        .then((callback) => {
          if (callback?.error) {
            toast.error(callback.error);
          }
          if (callback?.ok && !callback.error) {
            toast.success("Sucess");
            router.push("/users");
          }
        })
        .finally(() => setIsLoging(false));
    }
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md md:w-full">
      <div className="bg-white px-4 py-8 shadow sm:round-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {type === "REGISTER" && (
            <Input
              id="name"
              label="Name"
              disable={isLoading}
              errors={errors}
              register={register}
            ></Input>
          )}
          <Input
            id="email"
            label="Email"
            type="Email"
            disable={isLoading}
            errors={errors}
            register={register}
          ></Input>
          <Input
            id="password"
            label="Password"
            type="Password"
            disable={isLoading}
            errors={errors}
            register={register}
          ></Input>
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {type === "LOGIN" ? "Sign in" : "Register"}
            </Button>
          </div>
        </form>
        <div
          className="
            flex 
            gap-2 
            justify-center 
            text-sm 
            mt-6 
            px-2 
            text-gray-500
          "
        >
          <div>
            {type === "LOGIN"
              ? "New to Messenger?"
              : "Already have an account?"}
          </div>
          <div onClick={changeType} className="underline cursor-pointer">
            {type === "LOGIN" ? "Create an account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
}

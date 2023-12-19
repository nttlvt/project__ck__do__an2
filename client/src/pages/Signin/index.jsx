import { useCallback, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { setAccessTokenToLocalStorage, setUserProfileToLocalStorage } from "../../utils/auth";
import { Context } from "../../context";
import axiosClient from "../../utils/axiosClient";

export const Signin = () => {
  const context = useContext(Context);
  const navigate = useNavigate();
  const [variant, setVariant] = useState("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    setIsLoading(true);
    context.setLoading(true);
    if (variant === "REGISTER") {
      axiosClient
        .post(`/api/auth/signup`, data)
        .then((callback) => {
          const response = callback.data.data;
          setUserProfileToLocalStorage(response.user);
          setAccessTokenToLocalStorage(response.token);
          context.setProfile(response.user)
          toast.success("Signup Successfully!");
          navigate("/");
        })
        .catch(() => toast.error("Something went wrong!"))
        .finally(() => {
          context.setLoading(false);
          setIsLoading(false);
        });
    }

    if (variant === "LOGIN") {
      axiosClient
        .post(`/api/auth/login`, data)
        .then((callback) => {
          const response = callback.data.data;
          setUserProfileToLocalStorage(response.user);
          setAccessTokenToLocalStorage(response.token);
          context.setProfile(response.user)
          toast.success("Login Successfully!");
          navigate("/");
        })
        .catch(() => toast.error("Something went wrong!"))
        .finally(() => {
          context.setLoading(false);
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="flex justify-center my-10">
        <h1 className="text-gray-900 uppercase font-bold">Admin Management</h1>
      </div>
      <div
        className="
        bg-white
          px-4
          py-8
          shadow
          sm:rounded-lg
          sm:px-10
        "
      >
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id="name"
              label="Name"
            />
          )}
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="email"
            label="Email address"
            type="email"
          />
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="password"
            label="Password"
            type="password"
          />
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {variant === "LOGIN" ? "Sign in" : "Register"}
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
            {variant === "LOGIN" ? "New User?" : "Already have an account?"}
          </div>
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {variant === "LOGIN" ? "Create an account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
};

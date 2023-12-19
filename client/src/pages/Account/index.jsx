import { useForm } from "react-hook-form";
import { Layout } from "../../components";
import * as yup from "yup";
import Input from "../../components/Input";
import { useContext, useState } from "react";
import { Context } from "../../context";
import Button from "../../components/Button";
import { toast } from "react-hot-toast";
import axiosClient from "../../utils/axiosClient";
import { setUserProfileToLocalStorage } from "../../utils/auth";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});
export const Account = () => {
  const context = useContext(Context);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    values: {
      name: context.profile.name,
      email: context.profile.email,
      password: "",
    },
  });
  const onSubmit = async (data) => {
    try {
      context.setLoading(true);
      await schema.validate(data);
      const response = await axiosClient.put("api/auth/update-me", data);
      setUserProfileToLocalStorage(response.data.data.user);
      context.setProfile(response.data.data.user);
      toast.success("Update Successfully");
      context.setLoading(false);
      reset();
    } catch (error) {
      context.setLoading(false);
      toast.error(error.message);
    }
  };
  return (
    <Layout>
      <h1>My Account</h1>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Input
          disabled={context.loading}
          register={register}
          errors={errors}
          required
          id="name"
          label="Name"
        />
        <Input
          disabled={true}
          register={register}
          errors={errors}
          required
          id="email"
          label="Email address"
          type="email"
        />
        <Input
          disabled={context.loading}
          register={register}
          errors={errors}
          required
          id="password"
          label="Password"
          type="password"
        />
        <div>
          <Button disabled={context.loading} fullWidth type="submit">
            Save
          </Button>
        </div>
      </form>
    </Layout>
  );
};

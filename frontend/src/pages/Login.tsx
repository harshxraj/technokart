import React, { useContext, useState } from "react";
import { Field, Input, Label, Button } from "@headlessui/react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const Login: React.FC = () => {
  const { setAuth } = useContext(AuthContext);
  const [email, setEmail] = useState<string>("test@gmail.com");
  const [password, setPassword] = useState<string>("123456");
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://1ovnb6t2z5.execute-api.ap-south-1.amazonaws.com/dev/auth/login",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        toast.success("Login successful!");
        const { token, user } = response.data;
        const userFullname = user?.fullname;
        localStorage.setItem("token", token);
        localStorage.setItem("user", userFullname);
        setAuth({ user: userFullname, token });
        navigate("/");
      } else {
        console.log("Login failed:", response.data.error);
      }
    } catch (error: any) {
      console.log("An error occurred during login:", error.response.data.error);
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="flex justify-center h-screen text-left items-center">
      <Toaster />
      <form className="w-full max-w-sm px-4 flex flex-col gap-2" onSubmit={handleLogin}>
        <Field>
          <Label className="text-sm/6 font-medium text-white">Email</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={clsx(
              "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            )}
          />
        </Field>

        <Field>
          <Label className="text-sm/6 font-medium text-white">Password</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={clsx(
              "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            )}
          />
        </Field>

        <div className="flex justify-center">
          <Button
            type="submit"
            className="inline-flex items-center mt-3 gap-2 rounded-md bg-gray-900 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;

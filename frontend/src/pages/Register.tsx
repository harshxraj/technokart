import React, { useState } from "react";
import { Field, Input, Label, Button } from "@headlessui/react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const Register: React.FC = () => {
  const [fullname, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://1ovnb6t2z5.execute-api.ap-south-1.amazonaws.com/dev/auth/register",
        {
          fullname,
          email,
          password,
        }
      );

      if (response.status === 201) {
        // Registration successful, navigate to login page or show success message
        navigate("/login");
      } else {
        // Handle unsuccessful registration (e.g., show an error message)
        console.log("Registration failed:", response.data.error);
      }
    } catch (error: any) {
      console.log("An error occurred during registration:", error.response.data.error);
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="flex justify-center h-screen text-left items-center">
      <Toaster />
      <form className="w-full max-w-sm px-4 flex flex-col gap-2" onSubmit={handleRegister}>
        <Field>
          <Label className="text-sm/6 font-medium text-white">Fullname</Label>
          <Input
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className={clsx(
              "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            )}
          />
        </Field>

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
            Register
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Register;

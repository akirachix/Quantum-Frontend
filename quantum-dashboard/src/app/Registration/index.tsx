"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { userRegister } from "../utils/registerFarmer";
import Image from "next/image";

interface FormData {
  farmers_name: string;
  farmer_location: string;
  phone_number: string;
  farmer_id: number;
  sensor_id: number;
}

interface UserData {
  farmers_name: string;
  farmer_location: string;
  phone_number: string;
  farmer_id: number;
  sensor_id: number;
}

// Update the validation schema for the new fields
const schema = yup.object().shape({
  farmers_name: yup.string().required("Farmer's name is required"),
  farmer_location: yup.string().required("Location is required"),
  phone_number: yup.string().required("Phone number is required"),
  farmer_id: yup.number().required("Farmer ID is required"),
  sensor_id: yup.number().required("Sensor ID is required"),
});

const RegisterForm = () => {
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const formattedData: UserData = {
        farmers_name: data.farmers_name,
        farmer_location: data.farmer_location,
        phone_number: data.phone_number,
        farmer_id: data.farmer_id,
        sensor_id: data.sensor_id,
      };

      const response = await userRegister(formattedData);
      if (response.error) {
        setApiError(response.error);
      } else {
        setSuccessMessage("Registration successful!");
        setTimeout(() => {
          router.push("/successfullyRegistration");
        }, 1500);
        reset();
      }
    } catch (error) {
      if (error instanceof Error) {
        setApiError(error.message);
      } else {
        setApiError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div>
      <div className="flex h-screen">
        <div className="w-1/2 bg-[#FDCD75] flex items-center justify-center">
          <div className="text-center">
            <Image
              src="/images/rutubalogo.png"
              alt="logo"
              width={350}
              height={400}
            />
          </div>
        </div>
        <div className="w-1/2 bg-[#F5F5F5] p-8 flex items-center justify-center">
          <form onSubmit={handleSubmit(onSubmit)} className="w-[640px]">
            <h2 className="text-4xl ml-36 font-bold mb-16 text-[#006400]">
              Register a Sensor
            </h2>

            <div className="mb-4">
              <label
                htmlFor="farmers_name"
                className="block mb-2 text-sm font-medium"
              >
                Farmer's Name
              </label>
              <input
                type="text"
                id="farmers_name"
                {...register("farmers_name")}
                placeholder="Enter farmer's name"
                className={`w-full h-16 p-3 border border-black rounded-md text-black ${
                  errors.farmers_name && "border-red-500"
                }`}
              />
              {errors.farmers_name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.farmers_name.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="farmer_location"
                className="block mb-2 text-sm font-medium"
              >
                Farmer Location
              </label>
              <input
                type="text"
                id="farmer_location"
                {...register("farmer_location")}
                placeholder="Enter farmer location"
                className={`w-full h-16 p-3 border border-black rounded-md text-black ${
                  errors.farmer_location && "border-red-500"
                }`}
              />
              {errors.farmer_location && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.farmer_location.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="phone_number"
                className="block mb-2 text-sm font-medium"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phone_number"
                {...register("phone_number")}
                placeholder="Enter phone number"
                className={`w-full h-16 p-3 border border-black rounded-md text-black ${
                  errors.phone_number && "border-red-500"
                }`}
              />
              {errors.phone_number && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phone_number.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="farmer_id"
                className="block mb-2 text-sm font-medium"
              >
                Farmer ID
              </label>
              <input
                type="text"
                id="farmer_id"
                {...register("farmer_id")}
                placeholder="Enter farmer ID"
                className={`w-full h-16 p-3 border border-black rounded-md text-black ${
                  errors.farmer_id && "border-red-500"
                }`}
              />
              {errors.farmer_id && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.farmer_id.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="sensor_id"
                className="block mb-2 text-sm font-medium"
              >
                Sensor ID
              </label>
              <input
                type="text"
                id="sensor_id"
                {...register("sensor_id")}
                placeholder="Enter sensor ID"
                className={`w-full h-16 p-3 border border-black rounded-md text-black ${
                  errors.sensor_id && "border-red-500"
                }`}
              />
              {errors.sensor_id && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.sensor_id.message}
                </p>
              )}
            </div>

            {apiError && (
              <p className="text-red-500 text-xs mt-1">{apiError}</p>
            )}
            {successMessage && (
              <p className="text-green-500 text-xs mt-1">{successMessage}</p>
            )}

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[#E7BB6C] text-[#FFFFFF] mt-16 rounded-md hover:bg-[#A0522D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B4513] w-48 h-[48px] text-[24px]"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;

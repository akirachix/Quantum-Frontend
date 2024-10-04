"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from 'next/navigation'; // Updated import
import Image from "next/image";
interface FormData {
  farmers_name: string;
  farmer_location: string;
  phone_number: string;
  sensor_id: number;
}
const schema = yup.object().shape({
  farmers_name: yup.string().required("Farmers name is required"),
  farmer_location: yup.string().required("Farmer location is required"),
  phone_number: yup.string().required("Phone number is required"),
  sensor_id: yup.number().required("Sensor ID is required"),
});
const RegisterForm = () => {
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setApiError(null);
    setSuccessMessage(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccessMessage("Registered successfully");
      router.push("/successfullyRegistration");
    } catch (error) {
      setApiError("An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="w-full lg:w-1/2 bg-[#FDCD75] flex items-center justify-center p-4">
        <div className="text-center">
          <Image
            src="/images/rutubalogo.png"
            alt="logo"
            width={350}
            height={400}
            className="max-w-full h-auto"
          />
        </div>
      </div>
      <div className="w-full lg:w-1/2 bg-[#F5F5F5] p-4 lg:p-8 flex items-center justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[640px] lg:max-w-[500px]">
          <h2 className="text-3xl font-bold mb-8 text-[#006400] text-center lg:text-left">
            Register a Farmer
          </h2>
          <div className="mb-4">
            <label htmlFor="farmers_name" className="block mb-2 text-sm font-medium">
              Farmers Name
            </label>
            <input
              type="text"
              id="farmers_name"
              {...register("farmers_name")}
              placeholder="Enter farmer's name"
              className={`w-full h-12 p-3 border border-black rounded-md text-black ${
                errors.farmers_name ? "border-red-500" : ""
              }`}
            />
            {errors.farmers_name && (
              <p className="text-red-500 text-xs mt-1">{errors.farmers_name.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="farmer_location" className="block mb-2 text-sm font-medium">
              Farmer Location
            </label>
            <input
              type="text"
              id="farmer_location"
              {...register("farmer_location")}
              placeholder="Enter farmer location"
              className={`w-full h-12 p-3 border border-black rounded-md text-black ${
                errors.farmer_location ? "border-red-500" : ""
              }`}
            />
            {errors.farmer_location && (
              <p className="text-red-500 text-xs mt-1">{errors.farmer_location.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="phone_number" className="block mb-2 text-sm font-medium">
              Phone Number
            </label>
            <input
              type="text"
              id="phone_number"
              {...register("phone_number")}
              placeholder="Enter phone number"
              className={`w-full h-12 p-3 border border-black rounded-md text-black ${
                errors.phone_number ? "border-red-500" : ""
              }`}
            />
            {errors.phone_number && (
              <p className="text-red-500 text-xs mt-1">{errors.phone_number.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="sensor_id" className="block mb-2 text-sm font-medium">
              Sensor ID
            </label>
            <input
              type="text"
              id="sensor_id"
              {...register("sensor_id")}
              placeholder="Enter sensor ID"
              className={`w-full h-12 p-3 border border-black rounded-md text-black ${
                errors.sensor_id ? "border-red-500" : ""
              }`}
            />
            {errors.sensor_id && (
              <p className="text-red-500 text-xs mt-1">{errors.sensor_id.message}</p>
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
              disabled={isLoading}
              className={`bg-[#E7BB6C] text-[#FFFFFF] mt-8 rounded-md hover:bg-[#A0522D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B4513] w-full lg:w-48 h-12 text-lg ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Loading....' : 'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default RegisterForm;
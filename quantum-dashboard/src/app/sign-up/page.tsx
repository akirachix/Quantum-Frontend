"use client"

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Link from 'next/link';
import Head from 'next/head';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { userSignup } from '../utils/usersign-up';

const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  role: yup.string().required('Role is required')
});

type FormData = yup.InferType<typeof schema>;

const SignUpPage = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  });
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {

     await userSignup({
        firstname: data.firstName,
        lastname: data.lastName,
        email: data.email,
        password: data.password,

      });
      
  

      setSuccessMessage("Account created successfully!");
      setTimeout(() => router.push("/login"), 2000);
    } 
    
    catch (error) {
      if (error instanceof Error) {
        setApiError(error.message);
      } else {
        setApiError('An unexpected error occurred');
      }
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <>
      <Head>
        <title>Sign Up - RutubaFarm</title>
        <meta name="description" content="Sign up for RutubaFarm" />
      </Head>
      <div className="flex flex-col md:flex-row min-h-screen">
        <div className="w-1/2 bg-[#f4c378] flex flex-col items-center justify-center ">
          <div className=" mb-7">
            <img
              src="images/rutubalogo.png"
              alt="Rutuba Logo"
              width={300}
              height={300}
            />
          </div>
          <h1 className="text-7xl font-bold text-[#016a2f] mb-40 ">Welcome</h1>
        </div>
        <div className="w-1/2 flex flex-col p-12 bg-white gap-19 ">
          <h2 className="text-4xl font-bold mb-8 text-[#016a2f] font-nunito justify-center ml-64">Sign Up</h2>
          
          {apiError && <p className="text-red-500 mb-4">{apiError}</p>}
          {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
          
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-full space-y-3">
            <input
              {...register('firstName')}
              placeholder="First Name"
              className="w-full h-20 p-3 mb-4 border border-gray-300 rounded-lg"
            />
            {errors.firstName && <p className="text-red-500 mb-2">{errors.firstName.message}</p>}
            
            <input
              {...register('lastName')}
              placeholder="Last Name"
              className="w-full h-20 p-3 mb-4 border border-gray-300 rounded-lg"
            />
            {errors.lastName && <p className="text-red-500 mb-2">{errors.lastName.message}</p>}
            
            <input
              {...register('email')}
              placeholder="Email"
              className="w-full h-20 p-3 mb-4 border border-gray-300 rounded-lg"
            />
            {errors.email && <p className="text-red-500 mb-2">{errors.email.message}</p>}
            
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                {...register('password')}
                placeholder="Password"
                className="w-full h-20  p-3 mb-4 border border-gray-300 rounded-lg"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? <EyeOff className="h-5 w-5 text-red-500 mb-2" /> : <Eye className="h-5 w-5 text-gray-500" />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 mb-2">{errors.password.message}</p>}
            
            <div className="relative mb-6">
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register('confirmPassword')}
                placeholder="Confirm Password"
                className="w-full h-20  p-3 mb-4 border border-gray-300 rounded-lg"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5 text-black-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-500 mb-2">{errors.confirmPassword.message}</p>}
            <div className="">
              <select
                id="role"
                {...register('role')}
                className={`mt-1 block w-full h-20 px-3 py-2 bg-white border ${
                  errors.role ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-brown-500 focus:border-brown-500`}
              >
                <option value="">Select a role</option>
                <option value="ADMIN">ADMIN</option>
                <option value="Agricultural Officer">Agricultural Officer</option>
              </select>
              {errors.role && <p className=" text-red-500 text-xs mt-1">{errors.role.message}</p>}
            </div>
            
            <button
              type="submit"
              className="w-60 h-17 p-3 bg-[#f4c378] text-white font-semibold rounded-lg hover:bg-[#e0b16c] transition-colors justify-center ml-64"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-6 text-black-800 font-nunito justify-center ml-64">
            Already have an account?{' '}
            <Link href="/login" className="text-[#016a2f] font-semibold font-nunito">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
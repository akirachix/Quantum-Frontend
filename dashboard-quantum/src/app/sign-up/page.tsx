"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Link from 'next/link';
import Head from 'next/head';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { userSignup } from '../components/utils/usersign-up';
import { setCookie } from 'cookies-next';
import Image from 'next/image';


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
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
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
        role: data.role,
      });
      setCookie('role', data.role, { maxAge: 60 * 60 * 24 * 7, path:'/' }); 
    
    


      setSuccessMessage("Account created successfully!");
      setTimeout(() => router.push("/login"), 2000);

    } catch (error) {
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="flex flex-col md:flex-row min-h-screen">
        <div className="w-full md:w-1/2 bg-[#f4c378] flex flex-col items-center justify-center p-4">
          <div className="mb-4 md:mb-7">
          <Image
  src="/images/rutubalogo.png" 
  alt="Rutuba Logo"
  width={256} 
  height={256} 
  className="mr-2" 
/>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-[#016a2f] mb-8 md:mb-16 lg:mb-40">Welcome</h1>
        </div>
        <div className="w-full md:w-1/2 flex flex-col p-4 md:p-8 2xl:p-12 lg:p-0 bg-white">
          <h2 className="text-3xl md:text-4xl font-bold 2xl:mb-6 lg:mb-4 mb-6 md:mb-8 text-[#016a2f] font-nunito items-center mt-6 text-center ">Sign Up</h2>

          <div className="text-center mb-4">
            {apiError && <p className="text-red-500">{apiError}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg mx-auto space-y-4 p-6 lg:p-8 xl:p-4">
            <input
              {...register('firstName')}
              placeholder="First Name"
              className="w-full h-12 md:h-16 2xl:h-16 xl:h-16 lg:h-12 p-3 border border-gray-300 rounded-lg"
            />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
            
            <input
              {...register('lastName')}
              placeholder="Last Name"
              className="w-full h-12 md:h-16 2xl:h-16 xl:h-16 lg:h-12 p-3 border border-gray-300 rounded-lg"
            />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
            
            <input
              {...register('email')}
              placeholder="Email"
              className="w-full h-12 2xl:h-16 lg:h-12 xl:h-16 md:h-16 p-3 border border-gray-300 rounded-lg"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register('password')}
                placeholder="Password"
                className="w-full h-12 md:h-16 2xl:h-16 xl:h-16 lg:h-12 p-3 border border-gray-300 rounded-lg"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? <EyeOff className="h-5 w-5 text-red-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register('confirmPassword')}
                placeholder="Confirm Password"
                className="w-full h-12 2xl:h-16 lg:h-12 xl:h-16 md:h-16 p-3 border border-gray-300 rounded-lg"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5 text-black-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
            
            <select
              id="role"
              {...register('role')}
              className={`w-full h-12 md:h-16 px-3 py-2 bg-white border ${
                errors.role ? 'border-red-500' : 'border-gray-300'
              } rounded-lg shadow-sm focus:outline-none focus:ring-brown-500 focus:border-brown-500`}
            >
              <option value="">Select a role</option>
              <option value="ADMIN">ADMIN</option>
              <option value="Agricultural Officer">Agricultural Officer</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}

            <div>
              <button
                type="submit"
                className={`w-full sm:w-60 h-12 p-3 bg-[#f4c378] text-white font-semibold rounded-lg hover:bg-[#e0b16c] transition-colors 2xl:ml-32 lg:ml-20 xl:ml-32 ${
                  isSubmitting ? "opacity-40 cursor-not-allowed" : ""
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating account..." : "Signup"}
              </button>
            </div>
          </form> 

          <p className="mt-6 text-center text-black-800 font-nunito">
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

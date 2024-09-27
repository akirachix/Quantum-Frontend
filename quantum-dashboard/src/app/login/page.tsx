

'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { userlogin } from '../utils/userlogin';
import { setCookie } from 'cookies-next'; 
import { FiEye, FiEyeOff } from 'react-icons/fi';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

type FormData = yup.InferType<typeof schema>;

const Login = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const onSubmit = async (data: FormData) => {
    const response = await userlogin(data);

    if (response.error) {
      setErrorMessage(response.error);
      setSuccessMessage(null);
    } else {
      
      setCookie('authToken', response.token, { maxAge: 60 * 60 * 24 * 7, path: '/' }); 
      setCookie('isLoggedIn', true, { maxAge: 60 * 60 * 24 * 7, path: '/' }); 
      
      setSuccessMessage('Logged in successfully!');
      setErrorMessage(null);
      setTimeout(() => router.push("/home"), 1000);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="flex h-screen bg-[#E0B16C]">
      <div className="w-1/2 flex flex-col justify-center items-center p-12">
        <Image src="/images/rutubalogo.png" alt="Rutuba Logo" width={180} height={180} />
        <h1 className="text-6xl font-bold text-green-800 mb-4">Welcome Back</h1>
      </div>
      <div className="w-1/2 flex flex-col justify-center items-center p-12 bg-white">
        <h2 className="text-4xl font-semibold mb-12 text-green-800">Log In</h2>
        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
        {successMessage && <p className="text-green-600">{successMessage}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="email" className="block mb-2 text-lg font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className="w-full py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 pl-5" 
            />
            {errors.email && <p className="text-red-600">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-lg font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                id="password"
                type={passwordVisible ? 'text' : 'password'}
                {...register('password')}
                className="w-96 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 pl-5" 
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-600"
              >
                {passwordVisible ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.password && <p className="text-red-600">{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            className={`w-48 h-14 bg-[#E0B16C] text-white rounded-md hover:bg-[#E0B16C] ml-28 ${isSubmitting ? "opacity-40 cursor-not-allowed" : ""}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging you In...." : "Login"}
          </button>
          <button
            type="button"
            className="w-full py-2 mt-4 border border-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-100 flex items-center justify-center ml-8" 
          >
         <Image
  src="/images/google.png"
  alt="Google Logo"
  width={20} 
  height={20} 
  className="mr-2" 
/>
         
            Continue with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

'use client';
import React from 'react';

const SuccessMessage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="bg-white p-12 rounded-lg shadow-lg text-center">
        <img
          src="/images/checkbox.svg"
          alt="Success"
          className="mx-auto mb-8"
          width={100}
          height={100}
        />
        <p className="text-3xl font-bold text-green-600 mb-4">Successfully Registered</p>
        <p className="text-lg text-gray-600">Thank you for registering.</p>
      </div>
    </div>
  );
};

export default SuccessMessage;

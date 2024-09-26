import { useState } from 'react';
import { userRegister as registerAPI } from '@/app/utils/registerFarmer';
import { FarmerDetails } from '../utils/types';
const useRegister = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const userLogin = async (registerData: FarmerDetails) => {
    
    try {
      setIsSubmitting(true);
      const { data, error } = await registerAPI(registerData);
      if (error) {
        setErrorMessage(error);
        setSuccessMessage('');
      } else {
        setSuccessMessage('User Registered successful!');
        setErrorMessage('');
        return data;
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return {
    isSubmitting,
    errorMessage,
    successMessage,
  };
};
export default useRegister;
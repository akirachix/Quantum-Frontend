
import { FarmerDetails } from '../utils/types';
import { useState } from 'react';
import { userRegister as registerAPI } from '../utils/registerFarmer';

export const useRegisterFarmer = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const submitFarmer = async (details: FarmerDetails) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const result = await registerAPI(details);
      console.log('Submission successful:', result);
      return true;
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error('An unknown error occurred'));
      }
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };
  return { submitFarmer, isSubmitting, error };
};

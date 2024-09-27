'use client'; 

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Signup = () => {
  const router = useRouter();

  useEffect(() => {

    const timer = setTimeout(() => {
      router.push('/sign-up'); 
    }, 2000);

    
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <img 
        src="/images/rutubalogo.png" 
        className="m-4" 
        width={300} 
        alt="Rutuba Logo" 
      />
    </div>
  );
};

export default Signup;

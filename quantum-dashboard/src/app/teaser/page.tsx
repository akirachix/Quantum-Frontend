'use client'; 

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';


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
<Image
  src="/images/rutubalogo.png" 
  alt="Rutuba Logo" 
  width={300}
  height={150} 
  className="m-4" 
/>
    </div>
  );
};

export default Signup;


'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';

const Page = () => {
  const router = useRouter();
  useEffect(() => {
    const token = getCookie('authToken');
  
      if (token) {
        const role = getCookie("userRole");
        if (role === "admin") {
          router.push("/admin")
        }else{
          router.push("/dashboard")
        }
      router.push('/dashboard');
      }
  }, [router]);

  return null
};

export default Page



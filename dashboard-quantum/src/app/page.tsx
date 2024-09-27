

'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const token = getCookie('authToken');
    if (token) {
      const role = getCookie("userRole");

      if (role === "admin") {

        router.push("/admin");
      } else if (role === "agricultural_officer") {
        router.push("/registration");
      } 
    }else {
      alert("Login successful");
      router.push("/login");
    }
  }, [router]);

  return null;
};

export default Home;

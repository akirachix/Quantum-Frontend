'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const role = getCookie("role");

    if (role === "ADMIN") {

      router.push("/dashboard");
    } else if (role === "Agricultural Officer") {
      router.push("/registration");
    }
    else {

      router.push("/teaser");
    }
  }, [router]);

  return null;
};

export default Home;

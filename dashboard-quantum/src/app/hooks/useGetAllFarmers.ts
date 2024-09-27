import { useState, useEffect } from 'react';
import { fetchFarmers } from '../utils/fetchFarmers';


export interface Farmer {
  farmer_id: number;
  farmers_name: string;
  farmer_location: string;
  phone_number: string;
  sensor_id: number;
  created_at: string;
  isActive: boolean;
}

export const useFarmers = () => {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getFarmers = async () => {
      try {
        const data = await fetchFarmers();
        setFarmers(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    };

    getFarmers();
  }, []);

  return { farmers, loading, error };
};
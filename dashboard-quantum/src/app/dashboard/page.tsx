'use client';
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { ChartOptions } from 'chart.js';
import { useFarmers } from '../components/hooks/useGetAllFarmers';
import Layout from '../components/Layout';





interface Farmer {
  farmer_id: number;
  farmers_name: string;
  farmer_location: string;
  phone_number: string;
  sensor_id: number;
  created_at: string;
  isActive: boolean;
}

const Dashboard = () => {
  const { farmers, loading, error } = useFarmers();
  const totalFarmers: number = farmers.length;
  const activeFarmers: number = farmers.filter((farmer: Farmer) => farmer.isActive).length;
  const inactiveFarmers: number = farmers.length - activeFarmers;

  const [monthlyFarmers, setMonthlyFarmers] = useState(new Array(12).fill(0));

  useEffect(() => {
    const monthCount = new Array(12).fill(0);
    farmers.forEach((farmer: Farmer) => {
      const createdAt = new Date(farmer.created_at);
      const month = createdAt.getMonth();
      monthCount[month] += 1;
    });
    setMonthlyFarmers(monthCount);
  }, [farmers]);


  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Number of Farmers Registered Each Month',
        data: monthlyFarmers,
        backgroundColor: [
          '#E69090', '#38A743', '#C25EBE', '#AF7D31', '#362424', '#DDC91C',
          '#FDCD75', '#DA802A', '#4EF454', '#801A11', '#75A383', '#4946BC',
        ],
      },
    ],
  };

  
  const options: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Months',
          font: {
            size: 20,
            weight: 'bold',
          },
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      y: {
        type: 'linear',
        title: {
          display: true,
          text: 'Number of Farmers',
          font: {
            size: 20,
            weight: 'bold',
          },
        },
        ticks: {
          font: {
            size: 12,
          },
        },
        beginAtZero: true,
      },
    },
  };

  const statsSections = [
    {
      id: 'totalFarmers',
      title: 'Users',
      value: loading ? 'Loading...' : totalFarmers,
      bgColor: '#89C945',
      textColor: 'text-white',
      titleSize: 'text-2xl',
      valueSize: 'text-6xl sm:text-5xl'
    },
    {
      id: 'activeFarmers',
      title: 'Active Users',
      value: loading ? 'Loading...' : activeFarmers,
      bgColor: '#89C945',
      textColor: 'text-white',
      titleSize: 'text-xl',
      valueSize: 'text-4xl sm:text-5xl'
    },
    {
      id: 'inactiveFarmers',
      title: 'Inactive Users',
      value: loading ? 'Loading...' : inactiveFarmers,
      bgColor: '#89C945',
      textColor: 'text-white',
      titleSize: 'text-xl',
      valueSize: 'text-7xl sm:text-5xl'
    },
  ];

  return (
     <Layout>
      
    <div>
      <div className="bg-white ml-48 2xl:ml-48 xl:ml-4 lg:ml-4 w-[1300px] 2xl:w-[1300px] xl:w-[1000px] lg:w-[670px] xl:h-[600px] flex h-screen">
        <main className="flex-1 sm:p-12 mx-auto w-full 2xl:w-full xl:w-full">
          <header className="mb-12 sm:mb-16 text-center">
            <h2 className="text-3xl sm:text-5xl 2xl:text-5xl xl:text-4xl lg:text-3xl lg:-mt-8 font-bold">Dashboard</h2>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 2xl:gap-6 xl:gap-6 lg:gap-20 -mt-8 ml-16 lg:ml-0">
            {statsSections.map(({ id, title, value, bgColor, textColor, titleSize, valueSize }) => (
              <div key={id} className={`bg-[${bgColor}] p-6 2xl:p-4 text-center w-72 h-32 2xl:w-72 2xl:h-32 xl:w-52 lg:w-44 lg:h-24 rounded-lg shadow-md bg-[#89C945]`}>
                <h3 className={`${textColor} ${titleSize} font-bold 2xl:text-2xl lg:text-lg`}>{title}</h3>
                <p className={`${textColor} ${valueSize} font-bold 2xl:text-6xl lg:text-2xl`}>{value}</p>
              </div>
            ))}
          </div>
          <div className="bg-white h-full p-2 rounded-lg shadow-lg 2xl:h-[670px] lg:-ml-0 mb-8 2xl:mt-8 xl:h-full lg:h-[350px]">
            <h3 className="text-center mt- font-bold 2xl:text-3xl lg:mt-12 lg:text-2xl text-4xl xl:text-3xl xl:mt-8">Number of Farmers Registered Each Month</h3>
            <div className="w-full mt-4 2xl:h-[560px] lg:h-[300px] xl:h-[450px]">
              <Bar data={data} options={options} />
            </div>
          </div>
          {error && <p className="text-red-500 text-center">Error: {error}</p>}
        </main>
      </div>
    </div>
    </Layout>
  );
};

export default Dashboard;

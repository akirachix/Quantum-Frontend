'use client';
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useFarmers } from '@/app/hooks/usefarmersDetails';

const FarmersDetails = () => {
  const { farmers, loading, error } = useFarmers();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const farmersPerPage = 6;

  if (loading) {
    return <div className="p-40 text-center">Loading...</div>;
  }
  
  if (error) {
    return <div className="p-40 text-center text-red-500">Error: { error}</div>;
  }


  const filteredFarmers = farmers.filter(farmer => 
    farmer.farmers_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    farmer.phone_number.includes(searchTerm) ||
    (farmer.sensor_id && String(farmer.sensor_id).includes(searchTerm)) ||
    farmer.farmer_location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredFarmers.length / farmersPerPage);
  
  const indexOfLastFarmer = currentPage * farmersPerPage;
  const indexOfFirstFarmer = indexOfLastFarmer - farmersPerPage;
  
 
  const currentFarmers = filteredFarmers.slice(indexOfFirstFarmer, indexOfLastFarmer);

  return (
    <div className="p-6 bg-gray-100 font-sans">
      <h1 className="text-3xl font-bold text-center mb-6">Farmers Details</h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="relative w-full text-center ">
            <div className="flex items-center p-2 sm:p-4 border ml-[35%]  border-black rounded-xl mb-4 w-full sm:w-1/4">
              <Search className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search..."
                className="flex-grow outline-none"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); 
                }}
              />
            </div>
          </div>
        </div>
        <table className="w-full divide-y font-bold border border-black">
          <thead className="bg-gray-50 border-b border-black ">
            <tr>
              <th className="px-7 py-3 text-left text-xs font-bold uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Phone number</th>
              <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider">Sensor Id</th>
              <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="text-black divide-y  ">
            {currentFarmers.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center">Search Not Found</td>
              </tr>
            ) : (
              currentFarmers.map((farmer, index) => (
                <tr key={index} className='border-b border-black'>
                  <td className="px-6 py-4 whitespace-nowrap ">{farmer.farmers_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{farmer.phone_number}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{farmer.sensor_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{farmer.farmer_location}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button 
                      aria-label={`Toggle status for ${farmer.farmers_name}`}
                      className={`px-4 py-2 rounded-lg border ${
                        farmer.status === 'Active' 
                          ? 'border-green-500 text-green-500 hover:bg-green-50' 
                          : 'border-green-300 text-red-400 hover:bg-gray-50'
                      }`}
                      onClick={() => {
                        console.log(`Toggled active status for ${farmer.farmers_name}`);
                      }}
                    >
                      {farmer.status === 'Active' ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

     
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6">
          <button
            aria-label="Previous page"
            className="mx-1 w-8 h-8 flex items-center justify-center rounded-full border border-gray-300"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              aria-label={`Go to page ${index + 1}`}
              className={`mx-1 w-8 h-8 flex items-center justify-center rounded-full ${currentPage === index + 1 ? 'bg-orange-300 text-white' : 'border border-gray-300 font-bold'}`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            aria-label="Next page"
            className="mx-1 w-8 h-8 flex items-center justify-center rounded-full border border-gray-300"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default FarmersDetails;

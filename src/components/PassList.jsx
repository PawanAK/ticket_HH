import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PassList = () => {
  const [passes, setPasses] = useState([]);

  useEffect(() => {
    fetchPasses();
  }, []);

  const fetchPasses = async () => {
    try {
      const username = localStorage.getItem('username');
      const response = await fetch(`http://localhost:3000/passes?username=${username}`);
      if (response.ok) {
        const data = await response.json();
        setPasses(data);
      } else {
        console.error('Failed to fetch passes');
      }
    } catch (error) {
      console.error('Error fetching passes:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {passes.map((pass) => (
        <Link to={`/pass/${pass.passId}`} key={pass.passId} className="block">
          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300">
            <h3 className="text-lg font-semibold mb-2">Daily Pass</h3>
            <p className="text-gray-600">Valid until: {new Date(pass.validUntil).toLocaleDateString()}</p>
            <p className="text-gray-600">Price: ${pass.price}</p>
            <p className="text-gray-600">Status: {pass.validationStatus ? 'Validated' : 'Not Validated'}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PassList;
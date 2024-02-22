import React, { useState, useEffect } from 'react';

function Test() {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/auth/tables');
        const data = await response.json();
        if (data.Status) {
          setTables(data.Result);
        } else {
          console.error('Error fetching tables data:', data.Error);
        }
      } catch (error) {
        console.error('Error fetching tables data:', error);
      }
    };
  
    fetchData();
  }, []);

  const handleButtonClick = async (tableIndex) => {
    try {
      const response = await fetch(`http://localhost:3000/auth/updateTableStatus/${tables[tableIndex].tb_number}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: tables[tableIndex].tb_status === 1 ? 0 : 1 })
      });
  
      if (response.ok) {
        const updatedTables = [...tables];
        updatedTables[tableIndex].tb_status = updatedTables[tableIndex].tb_status === 1 ? 0 : 1;
        setTables(updatedTables);
  

        const updatedResponse = await fetch('http://localhost:3000/auth/tables');
        const updatedData = await updatedResponse.json();
        if (updatedData.Status) {
          setTables(updatedData.Result);
        } else {
          console.error('Error fetching updated tables data:', updatedData.Error);
        }
      } else {
        console.error('Error updating table status:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating table status:', error);
    }
  };
  
  return (
    <>
    <h4 className='flex justify-center text-3xl font-bold text-center text-white p-10'>จัดการโต๊ะ</h4>
      <ul>
        {tables.map((table, index) => (
        //   <button
        //   key={index}
        //   className={`focus:outline-none text-white ${table.tb_status === 1 ? 'bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300' : 'bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300'} font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:0 dark:hover: dark:focus:ring-blue-800`}
        //   onClick={() => handleButtonClick(index)}
        // >
        //   {table.tb_number}
        // </button>

        <li>
          {table.tb_number}
          
        </li>
        ))}
      </ul>
    </>
  );
}

export default Test;

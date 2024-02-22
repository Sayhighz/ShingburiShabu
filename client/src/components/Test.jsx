import React, { useState, useEffect } from 'react';

function Test() {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null); // State สำหรับเก็บข้อมูลโต๊ะที่ถูกเลือก

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
      // รับข้อมูลโต๊ะที่ถูกคลิกและเก็บไว้ใน state
      setSelectedTable(tables[tableIndex]);
    } catch (error) {
      console.error('Error selecting table:', error);
    }
  };

  const handleCloseDialog = () => {
    // ปิด dialog โดยการเคลียร์ state ของโต๊ะที่ถูกเลือก
    setSelectedTable(null);
  };

  const handleConfirmStatusChange = async () => {
    try {
      const response = await fetch(`http://localhost:3000/auth/updateTableStatus/${selectedTable.tb_number}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: selectedTable.tb_status === 1 ? 0 : 1 })
      });
  
      if (response.ok) {
        // อัปเดตข้อมูลโต๊ะหลังจากเปลี่ยนสถานะ
        const updatedTables = tables.map(table => {
          if (table.tb_number === selectedTable.tb_number) {
            return { ...table, tb_status: selectedTable.tb_status === 1 ? 0 : 1 };
          }
          return table;
        });
        setTables(updatedTables);
        // ปิด dialog
        handleCloseDialog();
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
          <button
            key={index}
            className={`focus:outline-none text-white ${table.tb_status === 1 ? 'bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300' : 'bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300'} font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:0 dark:hover: dark:focus:ring-blue-800`}
            onClick={() => handleButtonClick(index)}
          >
            {table.tb_number}
          </button>
        ))}
      </ul>
      {selectedTable && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">สั่งอาหารโต๊ะที่ {selectedTable.tb_number}</h2>
            <p className="mb-4">คุณต้องการสั่งอาหารของโต๊ะนี้ใช่หรือไม่?</p>
            <div className="flex justify-center">
              <button className="bg-green-500 text-white rounded-lg px-4 py-2 mr-4" onClick={handleConfirmStatusChange}>ยืนยัน</button>
              <button className="bg-gray-500 text-white rounded-lg px-4 py-2" onClick={handleCloseDialog}>ยกเลิก</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Test;

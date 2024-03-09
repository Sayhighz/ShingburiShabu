import { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

// AnnualSales chart
function AnnualSales() {
  
  const [annualSales, setUserData] = useState({
    labels: [],
    datasets: [
      {
        label: "ยอดขายรายปี",
        data: [],
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/annualsales")
      .then((result) => {
        if (result.data.Status) {
          const salesData = result.data.Result;
          const labels = salesData.map((data) => data.year);
          const data = salesData.map((data) => data.total_sales);
          setUserData((prevUserData) => ({
            ...prevUserData,
            labels: labels,
            datasets: [{ ...prevUserData.datasets[0], data: data }],
          }));
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return <Bar data={annualSales} />;
}

export default AnnualSales;

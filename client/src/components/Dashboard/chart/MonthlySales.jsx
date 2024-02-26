import { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function MonthlySales(props) {
  const [years] = useState(props.years);
  const getMonthName = (monthNumber) => {
    const monthNames = [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
    ];
    return monthNames[monthNumber - 1];
  };
  const [monthlysales, setUserData] = useState({
    labels: [],
    datasets: [
      {
        label: `ยอดขายของปี ${years}`,
        data: [],
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3000/auth/monthlysales?year=${years}`)
      .then((result) => {
        if (result.data.Status) {
          const salesData = result.data.Result;
          const labels = salesData.map((data) => getMonthName(data.month));
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
  return <Line data={monthlysales} />;
}

export default MonthlySales;
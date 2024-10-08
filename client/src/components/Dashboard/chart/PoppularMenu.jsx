import { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

// PoppularMenu
function PoppularMenu() {
  const [poppularMenu, setUserData] = useState({
    labels: [],
    datasets: [
      {
        label: "จำนวน",
        data: [],
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 0.5,
      },
    ],
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/popular")
      .then((result) => {
        if (result.data.Status) {
          const salesData = result.data.Result;
          const labels = salesData.map((data) => data.name);
          const data = salesData.map((data) => data.order_count);
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
  return <Pie data={poppularMenu} />;
}

export default PoppularMenu;
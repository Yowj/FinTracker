import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const AccountDonutChart = ({ accounts }) => {
  // accounts: [{ name: 'BPI', balance: 1000 }, ...]
  const data = {
    labels: accounts.map((acc) => acc.name),
    datasets: [
      {
        label: "Balance",
        data: accounts.map((acc) => acc.balance),
        backgroundColor: [
          // Navy Blue
          "#347433", // Forest Green
          "#FFCE56", // Soft Yellow
          "#4BC0C0", // Teal
          "#9966FF", // Lavender
          "#FF9F40", // Orange
          "#D7263D", // Crimson Red
          "#3BCEAC", // Mint Green
          "#845EC2", // Indigo Violet
          "#FFC75F",
          "#1B3C53", // Warm Yellow
        ],
        borderWidth: 1,
        borderColor: [
          // Navy Blue

          "#00000", // Warm Yellow
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ₱${context.parsed}`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Account Balances</h2>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default AccountDonutChart;

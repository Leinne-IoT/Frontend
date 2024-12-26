import React, {useState} from "react";
import {Line, Bar} from "react-chartjs-2";

import {JSONData} from "../../utils/utils.ts";
import ChartBase from "./Chart/ChartBase.tsx";

const TemperatureChart: React.FC = () => {
    const hourlyData = {
        labels: ['00:00', '00:05', '00:10', '00:15', '00:20', '00:25', '00:30', '00:35', '00:40', '00:45', '00:50', '00:55'], // X축 라벨
        datasets: [
            {
                label: "온도",
                data: [24.1, 24.6, 24.4, 24.1, 24.5, 24.44, 24.2, 24.6, 24.5, 24.3, 24, 24.8], // Y축 데이터
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                tension: 0.35,
                fill: true,
            },
        ],
    };

    const dailyData = {
        labels: ["00:00", "01:00", "02:00", "03:00"], // X축 라벨
        datasets: [
            {
                label: "온도",
                data: [23.5, 24.0, 24.8, 25.1],
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                tension: 0,
                fill: true,
            },
        ],
    };

    const weeklyData = {
        labels: ["월", "화", "수", "목", "금", "토", "일"], // X축 라벨
        datasets: [
            {
                label: "최저",
                data: [20.5, 21.0, 20.8, 21.5, 22.0, 21.8, 22.2],
                backgroundColor: "rgba(75, 192, 192, 0.7)",
            },
            {
                label: "최고",
                data: [27.5, 28.0, 27.8, 28.5, 29.0, 28.8, 40],
                backgroundColor: "rgba(255, 99, 132, 0.7)",
            },
            {
                label: "평균",
                data: [23.5, 24.0, 23.8, 24.5, 24.9, 24.8, 30],
                backgroundColor: "rgba(53, 162, 235, 0.7)",
            },
        ],
    };

    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context: any) => {
                        return `${context.dataset.label}: ${context.raw} °C`
                    }
                }
            }
        },
        responsive: true,
        maintainAspectRatio: false,
    }

    const chartMap = [
        <Line data={hourlyData} options={options}/>,
        <Line data={dailyData} options={options}/>,
        <Bar data={weeklyData} options={options}/>,
    ];
    return (
        <ChartBase title="온도" chartList={chartMap} saveKey="temperatureView"/>
    );
};

export default TemperatureChart;

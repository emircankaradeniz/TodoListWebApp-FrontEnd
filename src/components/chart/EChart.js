import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import axios from "axios";

const EChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    values: [],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/ana-gorevler/tamamlanan-gorevler-aylik");
      const data = response.data;

      // Verileri sıralayıp formatla
      const sortedKeys = Object.keys(data).sort(); // Tarihe göre sıralama
      const values = sortedKeys.map((key) => data[key]);

      setChartData({
        labels: sortedKeys,
        values,
      });
    } catch (error) {
      console.error("Grafik verisi alınırken hata oluştu:", error);
    }
  };

  const options = {
    title: {
      text: "Aylık Tamamlanan Görevler",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: chartData.labels,
      name: "Aylar",
    },
    yAxis: {
      type: "value",
      name: "Tamamlanan Görevler",
    },
    series: [
      {
        data: chartData.values,
        type: "bar",
        barWidth: "50%",
        itemStyle: {
          color: "#3b82f6",
        },
      },
    ],
  };

  return <ReactECharts option={options} style={{ height: "400px", width: "100%" }} />;
};

export default EChart;

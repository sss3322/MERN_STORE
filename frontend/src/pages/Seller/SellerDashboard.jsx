import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import {
  useGetShopQuery,
  useGetShopTotalOrdersQuery,
  useGetShopTotalSalesByDateQuery,
  useGetShopTotalSalesQuery,
} from "../../redux/api/shopApiSlice";
import SellerOrderList from "./SellerOrderList";
import Loader from "../../components/Loader";

const SellerDashboard = () => {
  const { data: sales, isLoading } = useGetShopTotalSalesQuery();
  const { data: customers, isLoading: loading } = useGetShopQuery();
  const { data: orders, isLoading: loadingTwo } = useGetShopTotalOrdersQuery();
  const { data: salesDetail } = useGetShopTotalSalesByDateQuery();

  const [chartData, setChartData] = useState({
    options: {
      chart: {
        type: "line",
        toolbar: {
          show: false,
        },
      },
      tooltip: {
        theme: "dark",
      },
      colors: ["#00E396"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Sales Trend",
        align: "left",
      },
      grid: {
        borderColor: "#ccc",
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: [],
        title: {
          text: "Date",
        },
      },
      yaxis: {
        title: {
          text: "Sales",
        },
        min: 0,
      },
      legend: {
        show: false,
      },
    },
    series: [{ name: "Sales", data: [] }],
  });

  useEffect(() => {
    if (salesDetail) {
      const formattedSalesDate = salesDetail.map((item) => ({
        x: item._id,
        y: item.totalSales,
      }));

      setChartData((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            categories: formattedSalesDate.map((item) => item.x),
          },
        },
        series: [
          { name: "Sales", data: formattedSalesDate.map((item) => item.y) },
        ],
      }));
    }
  }, [salesDetail]);

  return (
    <div className="container mx-auto px-4 py-8 lg:px-64">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg bg-white p-5 shadow-md">
          <div className="rounded-full w-12 h-12 flex items-center justify-center bg-pink-500 text-white text-xl font-bold">
            $
          </div>
          <p className="mt-4 text-gray-600">Sales</p>
          <h1 className="text-xl font-bold text-gray-800">
            $ {isLoading ? <Loader /> : sales.totalSales.toFixed(2)}
          </h1>
        </div>
        <div className="rounded-lg bg-white p-5 shadow-md">
          <div className="rounded-full w-12 h-12 flex items-center justify-center bg-pink-500 text-white text-xl font-bold">
            $
          </div>
          <p className="mt-4 text-gray-600">Customers</p>
          <h1 className="text-xl font-bold text-gray-800">
            {isLoading ? <Loader /> : customers?.length}
          </h1>
        </div>
        <div className="rounded-lg bg-white p-5 shadow-md">
          <div className="rounded-full w-12 h-12 flex items-center justify-center bg-pink-500 text-white text-xl font-bold">
            $
          </div>
          <p className="mt-4 text-gray-600">All Orders</p>
          <h1 className="text-xl font-bold text-gray-800">
            {isLoading ? <Loader /> : orders?.totalOrders}
          </h1>
        </div>
      </section>

      <div className="mt-8">
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="line"
          height="400"
          className="w-full"
        />
      </div>

      <div className="mt-8">
        <SellerOrderList />
      </div>
    </div>
  );
};

export default SellerDashboard;

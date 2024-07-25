import React from 'react'
import { Header } from 'components/Header'
import { useFetch } from 'hooks/useFetch'
import { ChartData, ChartOptions, Plugin} from 'chart.js/auto'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import {Bar} from 'react-chartjs-2'
import ChartDataLabels from "chartjs-plugin-datalabels";

import LoadingSpinner from 'components/LoadingSpinner'

import { TData } from './products/Products'
import { IMAGES } from 'constans/constans'

import salesData from 'data/sales.json'

import 'styles/globalStyle.scss'
import './HomePage.scss'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HomePage = () => {
  const {data, error, isLoading} = useFetch<TData>('https://dummyjson.com/products?limit=0',)

  if (isLoading) {
    return <LoadingSpinner />
  }
  if (error) {
    return <div>Error: {error?.message}</div>
  }

  const getFormatNumberWithDot = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  const totalSalesQuantity = salesData.sales.map(item => item.quantitySold).reduce((a, b) => a + b, 0);
  const totalSalesRevenue = salesData.sales.map(item => item.unitPrice * item.quantitySold).reduce((a, b) => a + b, 0);
  const averageRevenuePerUnit = (totalSalesRevenue / totalSalesQuantity) * 100;

  const colorPalette = [
    "#80b1cc", "#d8f6e1", "#325da9",
    "#addcda", "#4e78b5", "#c0eade",
    "#6694c1", "#00429d", "#73a2c6",
    "#8ebfd1", "#9dced6", "#406aaf",
    "#ffffe0", "#5a86bb", "#204fa3",
  ];

  //https://www.vis4.net/palettes/#/15|s|00429d,96ffea,ffffe0|ffffe0,ff005e,93003a|1|1

  const lowStockProducts = data?.products.filter(product => product.availabilityStatus === 'Low Stock');
  const uniqueProductTitles = lowStockProducts?.map(product => product.title) || [];
  const uniqueProductStocks = lowStockProducts?.map(product => product.stock) || [];
  //const uniqueProductTitles = Array.from(new Set(lowStockProducts?.map(product => product.title) || [])); //pre odstránenie duplikátov

  const chartData: ChartData<'bar'> = {
    labels: uniqueProductTitles || [],
    datasets: [
      {
        label: 'Quantity',
        data: uniqueProductStocks || [],
        backgroundColor: colorPalette,
      },
    ],
    
  };

  const chartOption: ChartOptions<'bar'> = {
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: "Quantity in stock",
      },
      // datalabels: {
      //   display: true,
      //   formatter: (value: any, context: any) => {
      //     return context.chart.data.labels[context.dataIndex];
      //     return context.dataset.data[context.dataIndex].label
      //   },
      //   labels: {
      //     value: {
      //         color: 'white'
      //     }
      // },
      //},
    },
  };

  return (
    <div className="page-container">
      <Header title="Dashboard" userName="AV"></Header>
      <div className="box-container">
        <div className="box">
          <div className="box-text">
            <span>New sales</span>
            <span>
              {getFormatNumberWithDot(Math.floor(totalSalesQuantity))}
            </span>
          </div>
          <div className="box-icon">
            <IMAGES.ChartBar />
          </div>
        </div>
        <div className="box">
          <div className="box-text">
            <span>New sales revenue</span>
            <span>
              €{getFormatNumberWithDot(Math.floor(totalSalesRevenue))}
            </span>
          </div>
          <div className="box-icon">
            <IMAGES.Money />
          </div>
        </div>
        <div className="box">
          <div className="box-text">
            <span>Revenue per unit</span>
            <span>
              {getFormatNumberWithDot(Math.floor(averageRevenuePerUnit))}%
            </span>
          </div>
          <div className="box-icon">
            <IMAGES.ChartLine />
          </div>
        </div>
        <div className="box">
          <div className="box-text">
            <span>New leads</span>
            <span>2.830</span>
          </div>
          <div className="box-icon">
            <IMAGES.UserPlus />
          </div>
        </div>
      </div>
      <div className="chart-box">
        <div className="title">Low stock products</div>
          <div className="chart">
            {/* <Bar data={chartData} options={chartOption} plugins={[ChartDataLabels as Plugin<'bar'>]} /> */}
            <Bar data={chartData} options={chartOption} />
          </div>
      </div>
    </div>
  );
}

export default HomePage
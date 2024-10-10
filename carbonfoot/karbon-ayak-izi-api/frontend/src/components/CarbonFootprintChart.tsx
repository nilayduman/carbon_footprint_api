import React from 'react';
import { Bar } from 'react-chartjs-2';

type RecyclingData = {
  plastic: number;
  metal: number;
};

type CarbonFootprintData = {
  electricity_consumption: number;
  car_travel: number;
  public_transport: number;
  air_travel: number;
  water_consumption: number;
  waste_production: number;
  recycling: RecyclingData;
};

interface CarbonFootprintChartProps {
  data: CarbonFootprintData;
}

const CarbonFootprintChart: React.FC<CarbonFootprintChartProps> = ({ data }) => {
  const chartData = {
    labels: ['Electricity', 'Car Travel', 'Public Transport', 'Air Travel', 'Water', 'Waste', 'Recycling'],
    datasets: [
      {
        label: 'CO2 Emissions (kg)',
        data: [
          data.electricity_consumption,
          data.car_travel,
          data.public_transport,
          data.air_travel,
          data.water_consumption,
          data.waste_production,
          data.recycling.plastic + data.recycling.metal,
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Karbon Ayak İzi Verileri</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default CarbonFootprintChart;

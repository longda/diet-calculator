"use client";

import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { MacroCalculation } from '@/lib/macros';

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface MacroChartProps {
  macros: MacroCalculation;
}

export function MacroChart({ macros }: MacroChartProps) {
  // Prepare data for the chart
  const data: ChartData<'pie'> = {
    labels: ['Protein', 'Fat', 'Carbs'],
    datasets: [
      {
        data: [
          macros.proteinCalories, 
          macros.fatCalories, 
          macros.carbCalories
        ],
        backgroundColor: [
          'rgba(54, 162, 235, 0.7)',  // Blue for protein
          'rgba(255, 206, 86, 0.7)',  // Yellow for fat
          'rgba(75, 192, 192, 0.7)',  // Green for carbs
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const value = context.raw as number;
            const total = context.dataset.data.reduce((sum, val) => sum + (val as number), 0);
            const percentage = Math.round((value / total) * 100);
            return `${context.label}: ${value} cal (${percentage}%)`;
          }
        }
      }
    },
  };

  return (
    <div className="max-w-xs mx-auto mt-4">
      <h3 className="text-center font-medium mb-4">Macro Distribution</h3>
      <Pie data={data} options={options} />
    </div>
  );
} 
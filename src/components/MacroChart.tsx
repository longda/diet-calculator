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
          'rgba(59, 130, 246, 0.8)',   // blue-500 protein
          'rgba(234, 179, 8, 0.8)',    // yellow-500 fat
          'rgba(34, 197, 94, 0.8)',   // green-500 carbs
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(234, 179, 8, 1)',
          'rgba(34, 197, 94, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 12,
          padding: 10,
          font: {
            size: 11
          }
        }
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
    <div className="max-w-full mx-auto text-foreground">
      <Pie data={data} options={options} height={140} />
    </div>
  );
} 
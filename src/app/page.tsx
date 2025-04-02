"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { calculateMacros, type MacroCalculation } from "@/lib/macros";
import { MacroChart } from "@/components/MacroChart";

export default function Home() {
  const [weight, setWeight] = useState<string>("220");
  const [error, setError] = useState<string>("");
  const [macros, setMacros] = useState<MacroCalculation>(calculateMacros(220));

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);
    // Clear error when user starts typing
    if (error) {
      setError("");
    }
  };

  const handleCalculate = () => {
    const weightValue = parseFloat(weight);
    
    // Validate input
    if (!weight.trim()) {
      setError("Please enter your weight");
      return;
    }
    
    if (isNaN(weightValue)) {
      setError("Please enter a valid number");
      return;
    }
    
    if (weightValue <= 0) {
      setError("Weight must be greater than 0");
      return;
    }
    
    if (weightValue > 1000) {
      setError("Please enter a realistic weight");
      return;
    }
    
    // Clear error and calculate
    setError("");
    setMacros(calculateMacros(weightValue));
  };

  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCalculate();
    }
  };

  // Calculate percentages
  const totalCalories = macros.totalCalories || 1; // Avoid division by zero
  const proteinPercentage = Math.round((macros.proteinCalories / totalCalories) * 100);
  const fatPercentage = Math.round((macros.fatCalories / totalCalories) * 100);
  const carbPercentage = Math.round((macros.carbCalories / totalCalories) * 100);

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">
        Diet, Calories, and Macro Calculator
      </h1>

      <div className="grid gap-8">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle>Input Your Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div>
                <label htmlFor="weight" className="block mb-2 text-sm font-medium">
                  Weight (lbs)
                </label>
                <div className="flex gap-2">
                  <div className="flex flex-col w-full max-w-xs">
                    <Input
                      id="weight"
                      type="number"
                      placeholder="220"
                      value={weight}
                      onChange={handleWeightChange}
                      onKeyDown={handleKeyDown}
                      aria-invalid={!!error}
                      aria-describedby={error ? "weight-error" : undefined}
                    />
                    {error && (
                      <p id="weight-error" className="text-sm text-red-500 mt-1">
                        {error}
                      </p>
                    )}
                  </div>
                  <Button onClick={handleCalculate}>Calculate Macros</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card>
          <CardHeader>
            <CardTitle>Your Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 rounded-lg bg-slate-100 dark:bg-slate-800">
                <h3 className="font-medium mb-2">Total Daily Calories</h3>
                <p className="text-2xl font-bold">{macros.totalCalories}</p>
              </div>
              
              <div className="p-4 rounded-lg bg-blue-100 dark:bg-blue-900/50">
                <h3 className="font-medium mb-2">Protein</h3>
                <p className="text-2xl font-bold">
                  {macros.proteinGrams}g ({macros.proteinCalories} calories)
                </p>
                <p className="text-sm text-blue-700 dark:text-blue-300">{proteinPercentage}% of total calories</p>
              </div>
              
              <div className="p-4 rounded-lg bg-yellow-100 dark:bg-yellow-900/50">
                <h3 className="font-medium mb-2">Fat</h3>
                <p className="text-2xl font-bold">
                  {macros.fatGrams}g ({macros.fatCalories} calories)
                </p>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">{fatPercentage}% of total calories</p>
              </div>
              
              <div className="p-4 rounded-lg bg-green-100 dark:bg-green-900/50">
                <h3 className="font-medium mb-2">Carbs</h3>
                <p className="text-2xl font-bold">
                  {macros.carbGrams}g ({macros.carbCalories} calories)
                </p>
                <p className="text-sm text-green-700 dark:text-green-300">{carbPercentage}% of total calories</p>
              </div>
            </div>
            
            {/* Add the chart */}
            <div className="mt-6">
              <MacroChart macros={macros} />
            </div>
          </CardContent>
        </Card>

        {/* Adjustment Section - Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Adjust Your Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Adjustment controls will be added in the next phase.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

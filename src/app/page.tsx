"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { calculateMacros, type MacroCalculation } from "@/lib/macros";
import { MacroChart } from "@/components/MacroChart";
import { MacroAdjuster } from "@/components/MacroAdjuster";

export default function Home() {
  const [weight, setWeight] = useState<string>("220");
  const [error, setError] = useState<string>("");
  const [baseMacros, setBaseMacros] = useState<MacroCalculation>(calculateMacros(220));
  const [adjustedMacros, setAdjustedMacros] = useState<MacroCalculation>(baseMacros);
  const [isAdjusted, setIsAdjusted] = useState(false);

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
    const newBaseMacros = calculateMacros(weightValue);
    setBaseMacros(newBaseMacros);
    setAdjustedMacros(newBaseMacros);
    setIsAdjusted(false);
  };

  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCalculate();
    }
  };

  // Handle macro adjustments
  const handleMacroAdjustment = (adjustedMacros: MacroCalculation) => {
    const hasChanged = JSON.stringify(adjustedMacros) !== JSON.stringify(baseMacros);
    setIsAdjusted(hasChanged);
    setAdjustedMacros(adjustedMacros);
  };

  // Calculate percentages
  const totalCalories = adjustedMacros.totalCalories || 1; // Avoid division by zero
  const proteinPercentage = Math.round((adjustedMacros.proteinCalories / totalCalories) * 100);
  const fatPercentage = Math.round((adjustedMacros.fatCalories / totalCalories) * 100);
  const carbPercentage = Math.round((adjustedMacros.carbCalories / totalCalories) * 100);

  // Calculate differences
  const calorieDiff = adjustedMacros.totalCalories - baseMacros.totalCalories;
  const proteinDiff = adjustedMacros.proteinGrams - baseMacros.proteinGrams;
  const fatDiff = adjustedMacros.fatGrams - baseMacros.fatGrams;
  const carbDiff = adjustedMacros.carbGrams - baseMacros.carbGrams;

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
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Your Results</CardTitle>
            {isAdjusted && (
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 rounded-full">
                Adjusted
              </span>
            )}
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 rounded-lg bg-slate-100 dark:bg-slate-800">
                <h3 className="font-medium mb-2">Total Daily Calories</h3>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">{adjustedMacros.totalCalories}</p>
                  {calorieDiff !== 0 && (
                    <span className={`text-sm font-medium ${calorieDiff > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {calorieDiff > 0 ? '+' : ''}{calorieDiff}
                    </span>
                  )}
                </div>
                {isAdjusted && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Base: {baseMacros.totalCalories} calories
                  </p>
                )}
              </div>
              
              <div className="p-4 rounded-lg bg-blue-100 dark:bg-blue-900/50">
                <h3 className="font-medium mb-2">Protein</h3>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">
                    {adjustedMacros.proteinGrams}g ({adjustedMacros.proteinCalories} calories)
                  </p>
                  {proteinDiff !== 0 && (
                    <span className={`text-sm font-medium ${proteinDiff > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {proteinDiff > 0 ? '+' : ''}{proteinDiff}g
                    </span>
                  )}
                </div>
                <p className="text-sm text-blue-700 dark:text-blue-300">{proteinPercentage}% of total calories</p>
                {isAdjusted && proteinDiff !== 0 && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Base: {baseMacros.proteinGrams}g
                  </p>
                )}
              </div>
              
              <div className="p-4 rounded-lg bg-yellow-100 dark:bg-yellow-900/50">
                <h3 className="font-medium mb-2">Fat</h3>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">
                    {adjustedMacros.fatGrams}g ({adjustedMacros.fatCalories} calories)
                  </p>
                  {fatDiff !== 0 && (
                    <span className={`text-sm font-medium ${fatDiff > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {fatDiff > 0 ? '+' : ''}{fatDiff}g
                    </span>
                  )}
                </div>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">{fatPercentage}% of total calories</p>
                {isAdjusted && fatDiff !== 0 && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Base: {baseMacros.fatGrams}g
                  </p>
                )}
              </div>
              
              <div className="p-4 rounded-lg bg-green-100 dark:bg-green-900/50">
                <h3 className="font-medium mb-2">Carbs</h3>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">
                    {adjustedMacros.carbGrams}g ({adjustedMacros.carbCalories} calories)
                  </p>
                  {carbDiff !== 0 && (
                    <span className={`text-sm font-medium ${carbDiff > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {carbDiff > 0 ? '+' : ''}{carbDiff}g
                    </span>
                  )}
                </div>
                <p className="text-sm text-green-700 dark:text-green-300">{carbPercentage}% of total calories</p>
                {isAdjusted && carbDiff !== 0 && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Base: {baseMacros.carbGrams}g
                  </p>
                )}
              </div>
            </div>
            
            {/* Add the chart */}
            <div className="mt-6">
              <MacroChart macros={adjustedMacros} />
            </div>
          </CardContent>
        </Card>

        {/* Adjustment Section */}
        <Card>
          <CardHeader>
            <CardTitle>Adjust Your Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <MacroAdjuster 
              baseMacros={baseMacros} 
              onMacrosChange={handleMacroAdjustment} 
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { MacroCalculation, adjustMacros } from "@/lib/macros";

interface MacroAdjusterProps {
  baseMacros: MacroCalculation;
  onMacrosChange: (macros: MacroCalculation) => void;
}

export function MacroAdjuster({ baseMacros, onMacrosChange }: MacroAdjusterProps) {
  const [calorieAdjustment, setCalorieAdjustment] = useState(0);
  const [proteinAdjustment, setProteinAdjustment] = useState(0);
  const [fatAdjustment, setFatAdjustment] = useState(0);
  const [carbAdjustment, setCarbAdjustment] = useState(0);
  
  // Handle adjustments
  const handleCalorieChange = (value: number) => {
    // When calories are adjusted, reset macro adjustments
    if (proteinAdjustment !== 0 || fatAdjustment !== 0 || carbAdjustment !== 0) {
      setProteinAdjustment(0);
      setFatAdjustment(0);
      setCarbAdjustment(0);
    }
    
    setCalorieAdjustment(value);
    updateMacros(value, 0, 0, 0);
  };

  const handleProteinChange = (value: number) => {
    setProteinAdjustment(value);
    updateMacros(calorieAdjustment, value, fatAdjustment, carbAdjustment);
  };

  const handleFatChange = (value: number) => {
    setFatAdjustment(value);
    updateMacros(calorieAdjustment, proteinAdjustment, value, carbAdjustment);
  };
  
  const handleCarbChange = (value: number) => {
    setCarbAdjustment(value);
    updateMacros(calorieAdjustment, proteinAdjustment, fatAdjustment, value);
  };
  
  const updateMacros = (calories: number, protein: number, fat: number, carbs: number) => {
    const updatedMacros = adjustMacros(
      baseMacros,
      calories,
      protein,
      fat,
      carbs
    );
    onMacrosChange(updatedMacros);
  };

  const handleReset = () => {
    setCalorieAdjustment(0);
    setProteinAdjustment(0);
    setFatAdjustment(0);
    setCarbAdjustment(0);
    onMacrosChange(baseMacros);
  };

  // Reset adjustments when base macros change (i.e., when weight changes)
  useEffect(() => {
    setCalorieAdjustment(0);
    setProteinAdjustment(0);
    setFatAdjustment(0);
    setCarbAdjustment(0);
  }, [baseMacros]);

  // Calculate exact macro calorie impacts
  const proteinCalorieChange = proteinAdjustment * 4;
  const fatCalorieChange = fatAdjustment * 9;
  const carbCalorieChange = carbAdjustment * 4;
  
  // Total calorie impact from macros adjustments (exact calculation)
  const macroCaloriesImpact = proteinCalorieChange + fatCalorieChange + carbCalorieChange;

  // Display the message with exactly calculated values
  const hasAdjustments = calorieAdjustment !== 0 || proteinAdjustment !== 0 || fatAdjustment !== 0 || carbAdjustment !== 0;

  return (
    <div className="space-y-4">
      {/* Calories Adjustment */}
      <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
        <div className="flex justify-between items-center mb-1">
          <label htmlFor="calorie-adjustment" className="text-sm font-medium">
            Calorie Adjustment
          </label>
          <div className="flex items-center gap-1">
            <span className={calorieAdjustment > 0 ? "text-green-600 text-xs" : calorieAdjustment < 0 ? "text-red-600 text-xs" : "text-xs"}>
              {calorieAdjustment > 0 ? "+" : ""}{calorieAdjustment}
            </span>
            <Input
              id="calorie-adjustment"
              type="number"
              value={calorieAdjustment}
              onChange={(e) => handleCalorieChange(Number(e.target.value))}
              className="w-20 h-7 text-right text-sm"
            />
            <span className="text-xs ml-1">cal</span>
          </div>
        </div>
        <Slider
          defaultValue={[0]}
          min={-500}
          max={500}
          step={10}
          value={[calorieAdjustment]}
          onValueChange={(values) => handleCalorieChange(values[0])}
          aria-label="Calorie adjustment"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>-500</span>
          <span>0</span>
          <span>+500</span>
        </div>
      </div>

      {/* Macronutrient Adjustments */}
      <div className="grid grid-cols-3 gap-2">
        {/* Protein */}
        <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="protein-adjustment" className="text-xs font-medium text-blue-600 dark:text-blue-400">
              Protein
            </label>
            <div className="flex items-center gap-1">
              <span className={proteinAdjustment > 0 ? "text-green-600 text-xs" : proteinAdjustment < 0 ? "text-red-600 text-xs" : "text-xs"}>
                {proteinAdjustment > 0 ? "+" : ""}{proteinAdjustment}
              </span>
              <Input
                id="protein-adjustment"
                type="number"
                value={proteinAdjustment}
                onChange={(e) => handleProteinChange(Number(e.target.value))}
                className="w-16 h-7 text-right text-sm"
              />
              <span className="text-xs ml-1">g</span>
            </div>
          </div>
          <Slider
            defaultValue={[0]}
            min={-50}
            max={50}
            step={1}
            value={[proteinAdjustment]}
            onValueChange={(values) => handleProteinChange(values[0])}
            className="bg-blue-100 dark:bg-blue-900/30"
            aria-label="Protein adjustment"
          />
          {proteinAdjustment !== 0 && (
            <div className="text-xs text-blue-700 mt-1 text-right">
              {proteinCalorieChange > 0 ? "+" : ""}{proteinCalorieChange} cal
            </div>
          )}
        </div>

        {/* Fat */}
        <div className="p-3 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg">
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="fat-adjustment" className="text-xs font-medium text-yellow-600 dark:text-yellow-400">
              Fat
            </label>
            <div className="flex items-center gap-1">
              <span className={fatAdjustment > 0 ? "text-green-600 text-xs" : fatAdjustment < 0 ? "text-red-600 text-xs" : "text-xs"}>
                {fatAdjustment > 0 ? "+" : ""}{fatAdjustment}
              </span>
              <Input
                id="fat-adjustment"
                type="number"
                value={fatAdjustment}
                onChange={(e) => handleFatChange(Number(e.target.value))}
                className="w-16 h-7 text-right text-sm"
              />
              <span className="text-xs ml-1">g</span>
            </div>
          </div>
          <Slider
            defaultValue={[0]}
            min={-30}
            max={30}
            step={1}
            value={[fatAdjustment]}
            onValueChange={(values) => handleFatChange(values[0])}
            className="bg-yellow-100 dark:bg-yellow-900/30"
            aria-label="Fat adjustment"
          />
          {fatAdjustment !== 0 && (
            <div className="text-xs text-yellow-700 mt-1 text-right">
              {fatCalorieChange > 0 ? "+" : ""}{fatCalorieChange} cal
            </div>
          )}
        </div>

        {/* Carbs */}
        <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="carb-adjustment" className="text-xs font-medium text-green-600 dark:text-green-400">
              Carbs
            </label>
            <div className="flex items-center gap-1">
              <span className={carbAdjustment > 0 ? "text-green-600 text-xs" : carbAdjustment < 0 ? "text-red-600 text-xs" : "text-xs"}>
                {carbAdjustment > 0 ? "+" : ""}{carbAdjustment}
              </span>
              <Input
                id="carb-adjustment"
                type="number"
                value={carbAdjustment}
                onChange={(e) => handleCarbChange(Number(e.target.value))}
                className="w-16 h-7 text-right text-sm"
              />
              <span className="text-xs ml-1">g</span>
            </div>
          </div>
          <Slider
            defaultValue={[0]}
            min={-50}
            max={50}
            step={1}
            value={[carbAdjustment]}
            onValueChange={(values) => handleCarbChange(values[0])}
            className="bg-green-100 dark:bg-green-900/30"
            aria-label="Carb adjustment"
          />
          {carbAdjustment !== 0 && (
            <div className="text-xs text-green-700 mt-1 text-right">
              {carbCalorieChange > 0 ? "+" : ""}{carbCalorieChange} cal
            </div>
          )}
        </div>
      </div>

      {/* Total impact message */}
      {hasAdjustments && (
        <div className="text-xs text-center text-muted-foreground">
          {calorieAdjustment !== 0 && (
            <span className={calorieAdjustment > 0 ? "text-green-600" : "text-red-600"}>
              {calorieAdjustment > 0 ? "+" : ""}{calorieAdjustment} calories directly
            </span>
          )}
          {macroCaloriesImpact !== 0 && (
            <>
              {calorieAdjustment !== 0 && " and "}
              <span className={macroCaloriesImpact > 0 ? "text-green-600" : "text-red-600"}>
                {macroCaloriesImpact > 0 ? "+" : ""}{macroCaloriesImpact} calories from macro adjustments
              </span>
            </>
          )}
        </div>
      )}

      <div className="flex justify-end">
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleReset} 
          disabled={!hasAdjustments}
        >
          Reset Adjustments
        </Button>
      </div>
    </div>
  );
} 
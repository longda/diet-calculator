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
  
  // Reset adjustments when base macros change (i.e., when weight changes)
  useEffect(() => {
    handleReset();
  }, [baseMacros]);

  // Handle adjustments
  const handleCalorieChange = (value: number) => {
    setCalorieAdjustment(value);
    updateMacros(value, proteinAdjustment, fatAdjustment);
  };

  const handleProteinChange = (value: number) => {
    setProteinAdjustment(value);
    updateMacros(calorieAdjustment, value, fatAdjustment);
  };

  const handleFatChange = (value: number) => {
    setFatAdjustment(value);
    updateMacros(calorieAdjustment, proteinAdjustment, value);
  };
  
  const updateMacros = (calories: number, protein: number, fat: number) => {
    const updatedMacros = adjustMacros(
      baseMacros,
      calories,
      protein,
      fat
    );
    onMacrosChange(updatedMacros);
  };

  const handleReset = () => {
    setCalorieAdjustment(0);
    setProteinAdjustment(0);
    setFatAdjustment(0);
    onMacrosChange(baseMacros);
  };

  // Calculate carb adjustment (derived from other adjustments)
  const adjustedMacros = adjustMacros(baseMacros, calorieAdjustment, proteinAdjustment, fatAdjustment);
  const carbAdjustment = adjustedMacros.carbGrams - baseMacros.carbGrams;

  return (
    <div className="space-y-6">
      <div className="grid gap-2 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="calorie-adjustment" className="text-sm font-medium">
            Calorie Adjustment
          </label>
          <div className="flex items-center gap-2">
            <span className={calorieAdjustment > 0 ? "text-green-600" : calorieAdjustment < 0 ? "text-red-600" : ""}>
              {calorieAdjustment > 0 ? "+" : ""}{calorieAdjustment}
            </span>
            <Input
              id="calorie-adjustment"
              type="number"
              value={calorieAdjustment}
              onChange={(e) => handleCalorieChange(Number(e.target.value))}
              className="w-20 h-8 text-right"
            />
            <span className="text-sm">cal</span>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="protein-adjustment" className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Protein
            </label>
            <div className="flex items-center gap-2">
              <span className={proteinAdjustment > 0 ? "text-green-600" : proteinAdjustment < 0 ? "text-red-600" : ""}>
                {proteinAdjustment > 0 ? "+" : ""}{proteinAdjustment}
              </span>
              <Input
                id="protein-adjustment"
                type="number"
                value={proteinAdjustment}
                onChange={(e) => handleProteinChange(Number(e.target.value))}
                className="w-16 h-8 text-right"
              />
              <span className="text-sm">g</span>
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
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>-50g</span>
            <span>0g</span>
            <span>+50g</span>
          </div>
        </div>

        <div className="p-4 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="fat-adjustment" className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
              Fat
            </label>
            <div className="flex items-center gap-2">
              <span className={fatAdjustment > 0 ? "text-green-600" : fatAdjustment < 0 ? "text-red-600" : ""}>
                {fatAdjustment > 0 ? "+" : ""}{fatAdjustment}
              </span>
              <Input
                id="fat-adjustment"
                type="number"
                value={fatAdjustment}
                onChange={(e) => handleFatChange(Number(e.target.value))}
                className="w-16 h-8 text-right"
              />
              <span className="text-sm">g</span>
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
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>-30g</span>
            <span>0g</span>
            <span>+30g</span>
          </div>
        </div>

        <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-green-600 dark:text-green-400">
              Carbs
            </label>
            <div className="flex items-center gap-2">
              <span className={carbAdjustment > 0 ? "text-green-600" : carbAdjustment < 0 ? "text-red-600" : ""}>
                {carbAdjustment > 0 ? "+" : ""}{carbAdjustment}
              </span>
              <span className="text-sm font-medium">
                {adjustedMacros.carbGrams}g
              </span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground mt-4 text-center">
            Carbs adjust automatically based on your protein, fat, and calorie adjustments.
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <Button variant="outline" onClick={handleReset} disabled={calorieAdjustment === 0 && proteinAdjustment === 0 && fatAdjustment === 0}>
          Reset Adjustments
        </Button>
      </div>
    </div>
  );
} 
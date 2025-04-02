export interface MacroCalculation {
  totalCalories: number;
  proteinGrams: number;
  proteinCalories: number;
  fatGrams: number;
  fatCalories: number;
  carbGrams: number;
  carbCalories: number;
}

/**
 * Calculate macronutrients based on body weight in pounds
 * 
 * @param weight Weight in pounds
 * @returns Object containing calculated macros
 */
export function calculateMacros(weight: number): MacroCalculation {
  // Default to 0 if weight is invalid
  if (!weight || weight <= 0 || isNaN(weight)) {
    return {
      totalCalories: 0,
      proteinGrams: 0,
      proteinCalories: 0,
      fatGrams: 0,
      fatCalories: 0,
      carbGrams: 0,
      carbCalories: 0,
    };
  }

  // Calculate base values
  const totalCalories = Math.round(weight * 12);
  const proteinGrams = Math.round(weight); // 1g per lb
  const proteinCalories = Math.round(proteinGrams * 4);
  const fatGrams = Math.round(weight * 0.5); // 0.5g per lb
  const fatCalories = Math.round(fatGrams * 9);
  
  // Calculate carbs from remaining calories
  const carbCalories = Math.max(0, totalCalories - proteinCalories - fatCalories);
  const carbGrams = Math.round(carbCalories / 4);

  return {
    totalCalories,
    proteinGrams,
    proteinCalories,
    fatGrams,
    fatCalories,
    carbGrams,
    carbCalories,
  };
}

/**
 * Adjust macro calculation based on calorie and macronutrient adjustments
 * 
 * @param baseMacros The base macronutrient calculation
 * @param calorieAdjustment Adjustment to total calories (positive or negative)
 * @param proteinAdjustment Adjustment to protein grams (positive or negative)
 * @param fatAdjustment Adjustment to fat grams (positive or negative)
 * @returns Adjusted MacroCalculation object
 */
export function adjustMacros(
  baseMacros: MacroCalculation,
  calorieAdjustment: number = 0,
  proteinAdjustment: number = 0,
  fatAdjustment: number = 0
): MacroCalculation {
  // Adjust protein
  const adjustedProteinGrams = Math.max(0, baseMacros.proteinGrams + proteinAdjustment);
  const adjustedProteinCalories = Math.round(adjustedProteinGrams * 4);
  
  // Adjust fat
  const adjustedFatGrams = Math.max(0, baseMacros.fatGrams + fatAdjustment);
  const adjustedFatCalories = Math.round(adjustedFatGrams * 9);
  
  // Adjust total calories, ensuring it's not less than protein+fat calories
  const minCalories = adjustedProteinCalories + adjustedFatCalories;
  const adjustedTotalCalories = Math.max(
    minCalories,
    baseMacros.totalCalories + calorieAdjustment
  );
  
  // Calculate remaining calories for carbs
  const remainingForCarbs = Math.max(0, adjustedTotalCalories - adjustedProteinCalories - adjustedFatCalories);
  const adjustedCarbGrams = Math.round(remainingForCarbs / 4);
  const adjustedCarbCalories = remainingForCarbs;
  
  return {
    totalCalories: adjustedTotalCalories,
    proteinGrams: adjustedProteinGrams,
    proteinCalories: adjustedProteinCalories,
    fatGrams: adjustedFatGrams,
    fatCalories: adjustedFatCalories,
    carbGrams: adjustedCarbGrams,
    carbCalories: adjustedCarbCalories,
  };
} 
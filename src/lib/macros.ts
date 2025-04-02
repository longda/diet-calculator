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
export interface MacroCalculation {
  totalCalories: number;
  proteinGrams: number;
  proteinCalories: number;
  fatGrams: number;
  fatCalories: number;
  carbGrams: number;
  carbCalories: number;
  calorieAdjustment?: number; // Raw calorie adjustment
  proteinAdjustment?: number; // Raw protein adjustment
  fatAdjustment?: number; // Raw fat adjustment
  carbAdjustment?: number; // Raw carb adjustment
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
      calorieAdjustment: 0,
      proteinAdjustment: 0,
      fatAdjustment: 0,
      carbAdjustment: 0
    };
  }

  // Calculate base values
  const totalCalories = Math.round(weight * 12);
  const proteinGrams = Math.round(weight); // 1g per lb
  const proteinCalories = proteinGrams * 4; // Exact calculation
  const fatGrams = Math.round(weight * 0.5); // 0.5g per lb
  const fatCalories = fatGrams * 9; // Exact calculation
  
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
    calorieAdjustment: 0,
    proteinAdjustment: 0,
    fatAdjustment: 0,
    carbAdjustment: 0
  };
}

/**
 * Adjust macro calculation based on calorie and macronutrient adjustments
 * Following the PRD requirements:
 * 1. If calories are adjusted, use that as the new baseline and recalculate macros
 * 2. If individual macros are adjusted, update those values and calculate the new calorie total
 * 
 * @param baseMacros The base macronutrient calculation
 * @param calorieAdjustment Adjustment to total calories (positive or negative)
 * @param proteinAdjustment Adjustment to protein grams (positive or negative)
 * @param fatAdjustment Adjustment to fat grams (positive or negative)
 * @param carbAdjustment Adjustment to carb grams (positive or negative)
 * @returns Adjusted MacroCalculation object
 */
export function adjustMacros(
  baseMacros: MacroCalculation,
  calorieAdjustment: number = 0,
  proteinAdjustment: number = 0,
  fatAdjustment: number = 0,
  carbAdjustment: number = 0
): MacroCalculation {
  // First, determine if we're adjusting calories or macros directly
  if (calorieAdjustment !== 0 && proteinAdjustment === 0 && fatAdjustment === 0 && carbAdjustment === 0) {
    // Case 1: When only calories are adjusted, use the adjusted calories as new baseline
    // and maintain the same macro ratios from the base calculation
    const newTotalCalories = Math.max(0, baseMacros.totalCalories + calorieAdjustment);
    
    // Calculate new macros based on the original ratios
    const baseTotal = baseMacros.totalCalories || 1; // Avoid division by zero
    
    // Calculate protein (keeping the same ratio as the base)
    const proteinRatio = baseMacros.proteinCalories / baseTotal;
    const newProteinCalories = Math.round(newTotalCalories * proteinRatio);
    const newProteinGrams = Math.round(newProteinCalories / 4);
    
    // Calculate fat (keeping the same ratio as the base)
    const fatRatio = baseMacros.fatCalories / baseTotal;
    const newFatCalories = Math.round(newTotalCalories * fatRatio);
    const newFatGrams = Math.round(newFatCalories / 9);
    
    // Calculate carbs from remaining calories
    const newCarbCalories = Math.max(0, newTotalCalories - newProteinCalories - newFatCalories);
    const newCarbGrams = Math.round(newCarbCalories / 4);
    
    return {
      totalCalories: newTotalCalories,
      proteinGrams: newProteinGrams,
      proteinCalories: newProteinCalories,
      fatGrams: newFatGrams,
      fatCalories: newFatCalories,
      carbGrams: newCarbGrams,
      carbCalories: newCarbCalories,
      calorieAdjustment,
      proteinAdjustment: 0,
      fatAdjustment: 0,
      carbAdjustment: 0
    };
  } else {
    // Case 2: When individual macros are adjusted directly
    // Apply direct protein, fat, and carb gram adjustments
    const adjustedProteinGrams = Math.max(0, baseMacros.proteinGrams + proteinAdjustment);
    const adjustedProteinCalories = adjustedProteinGrams * 4;
    
    const adjustedFatGrams = Math.max(0, baseMacros.fatGrams + fatAdjustment);
    const adjustedFatCalories = adjustedFatGrams * 9;
    
    const adjustedCarbGrams = Math.max(0, baseMacros.carbGrams + carbAdjustment);
    const adjustedCarbCalories = adjustedCarbGrams * 4;
    
    // Recalculate the total calories based on the adjusted macros
    const newTotalCalories = adjustedProteinCalories + adjustedFatCalories + adjustedCarbCalories;
    
    return {
      totalCalories: Math.round(newTotalCalories),
      proteinGrams: adjustedProteinGrams,
      proteinCalories: adjustedProteinCalories,
      fatGrams: adjustedFatGrams,
      fatCalories: adjustedFatCalories,
      carbGrams: adjustedCarbGrams,
      carbCalories: adjustedCarbCalories,
      calorieAdjustment,
      proteinAdjustment,
      fatAdjustment,
      carbAdjustment
    };
  }
} 
# PRD: Diet, Calories, and Macro Calculator/Planner

## **Project Overview**
A simple web app that calculates daily caloric needs and macronutrient distribution based on user inputs. The app will also allow users to tweak their macros and caloric intake based on weight loss or fitness goals. This app will be self-contained with no backend dependencies and will be designed for public use.

---

## **Goals**
1. Provide an intuitive interface to calculate daily caloric needs and macronutrient breakdown based on user body weight.
2. Allow users to adjust their macros/calories dynamically to suit their fitness goals.
3. Ensure the app is lightweight, responsive, and mobile-friendly.
4. Use modern web technologies (Next.js, React, Tailwind CSS, ShadCN) for a clean and maintainable codebase.

---

## **Features**

### **Core Features**
1. **Baseline Macro Calculation**
   - Input: User's weight in pounds (default: 220 lbs).
   - Output:
     - Total daily calories = `bodyweight * 12`
     - Protein = `1 gram per pound of bodyweight` (calories from protein = `protein grams * 4`)
     - Fat = `0.5 grams per pound of bodyweight` (calories from fat = `fat grams * 9`)
     - Carbs = Remaining calories divided by 4 (calories from carbs = `remaining calories / 4`).

2. **Dynamic Updates**
   - Allow users to input their weight in pounds to recalculate baseline macros.
   - Display updated values for:
     - Total daily calories
     - Protein (grams + calories)
     - Fat (grams + calories)
     - Carbs (grams + calories)

3. **Goal-Based Adjustments**
   - Users can:
     - Adjust total daily calories manually (e.g., reduce by 240 calories).
     - Adjust individual macronutrient values (e.g., reduce carbs by 40 grams).
   - Recalculate other macro values dynamically based on user adjustments.

4. **Responsive Design**
   - Mobile-first design with responsive layouts for desktop users.

---

### **UI/UX Requirements**
1. **Input Section**
   - Default input field with the user's weight in pounds (pre-filled with `220 lbs`).
   - A button to "Recalculate Macros" after updating the input.

2. **Results Section**
   - Display calculated values for:
     - Total daily calories
     - Protein (grams + calories)
     - Fat (grams + calories)
     - Carbs (grams + calories)
   - Use a card-based layout for clarity.

3. **Adjustment Section**
   - Input fields/sliders for:
     - Adjusting total daily calories.
     - Adjusting individual macro values (protein, fat, carbs).
   - Dynamically update results when adjustments are made.

4. **Styling**
   - Use Tailwind CSS for styling.
   - ShadCN components for UI elements like input fields, sliders, and buttons.
   - Minimalistic design with clear typography and color-coded macro sections:
     - Protein: Blue
     - Fat: Yellow
     - Carbs: Green

5. **Accessibility**
   - Ensure proper ARIA labels for all interactive elements.
   - Test keyboard navigation and screen reader compatibility.

---

## **Technical Requirements**

### **Technology Stack**
- **Frontend Framework**: Next.js
- **UI Library**: React
- **Styling**: Tailwind CSS
- **UI Components**: ShadCN
- **Hosting**: Vercel

### **Core Logic**
1. Baseline Calculations:
    ```javascript
    const calculateMacros = (weight) => {
      const totalCalories = weight * 12;
      const proteinGrams = weight; // 1g per lb
      const proteinCalories = proteinGrams * 4;
      const fatGrams = weight * 0.5; // 0.5g per lb
      const fatCalories = fatGrams * 9;
      const carbCalories = totalCalories - proteinCalories - fatCalories;
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
    };
    ```

2. Goal-Based Adjustments:
    ```javascript
    const adjustMacros = (weight, calorieAdjustment, carbAdjustment) => {
      let { totalCalories, proteinGrams, proteinCalories, fatGrams, fatCalories } =
        calculateMacros(weight);

      totalCalories += calorieAdjustment;
      const carbCalories = totalCalories - proteinCalories - fatCalories;
      const carbGrams = Math.round(carbCalories / 4) + carbAdjustment;

      return {
        totalCalories,
        proteinGrams,
        proteinCalories,
        fatGrams,
        fatCalories,
        carbGrams,
        carbCalories,
      };
    };
    ```

---

## **Pages**

### `/`
- Main page with the calculator UI.
- Sections:
  1. Input Section: Weight input field and "Recalculate Macros" button.
  2. Results Section: Display calculated macros.
  3. Adjustment Section: Inputs/sliders for goal-based adjustments.

---

## **Non-Functional Requirements**
1. No backend or external API dependencies.
2. Fully static build compatible with deployment on Vercel or as a subdirectory of your personal website.
3. Lightweight and fast-loading (<200ms TTFB).
4. Mobile-first responsive design.

---

## **Deliverables**
1. A fully functional web app hosted on Vercel or a personal website directory.
2. Public GitHub repository with:
   - Clear README.md explaining the project.
   - Instructions for local setup and deployment.

---

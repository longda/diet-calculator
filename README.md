# Diet, Calories, and Macro Calculator

A simple web application that calculates daily caloric needs and macronutrient distribution based on user inputs. The app allows users to tweak their macros and caloric intake based on weight loss or fitness goals.

## Features

- Calculate baseline macros based on body weight
- Dynamic updates to macro distribution
- Goal-based adjustments for caloric intake and macros
- Responsive design for mobile and desktop

## Tech Stack

- **Frontend Framework**: Next.js 15 with App Router
- **UI Library**: React 19
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Hosting**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18.18.0 or later

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/longda/diet-calculator.git
   cd diet-calculator
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Run the development server
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

## Calculation Logic

- Total daily calories = `bodyweight * 12`
- Protein = `1 gram per pound of bodyweight` (calories = protein grams * 4)
- Fat = `0.5 grams per pound of bodyweight` (calories = fat grams * 9)
- Carbs = Remaining calories / 4 (grams)

## Deployment

The easiest way to deploy this application is using Vercel:

```bash
npm install -g vercel
vercel
```

## License

MIT

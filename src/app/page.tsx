import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Home() {
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
                  <Input
                    id="weight"
                    type="number"
                    placeholder="220"
                    className="max-w-xs"
                  />
                  <Button>Calculate Macros</Button>
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
                <p className="text-2xl font-bold">0</p>
              </div>
              
              <div className="p-4 rounded-lg bg-blue-100 dark:bg-blue-900">
                <h3 className="font-medium mb-2">Protein</h3>
                <p className="text-2xl font-bold">0g (0 calories)</p>
              </div>
              
              <div className="p-4 rounded-lg bg-yellow-100 dark:bg-yellow-900">
                <h3 className="font-medium mb-2">Fat</h3>
                <p className="text-2xl font-bold">0g (0 calories)</p>
              </div>
              
              <div className="p-4 rounded-lg bg-green-100 dark:bg-green-900">
                <h3 className="font-medium mb-2">Carbs</h3>
                <p className="text-2xl font-bold">0g (0 calories)</p>
              </div>
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

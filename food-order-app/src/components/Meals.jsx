import { useEffect, useState } from "react";

import MealItem from "./MealItem.jsx";
import { fetchAvailableMeals } from "../http.js";
import Error from "./UI/Error.jsx";

export default function Meals() {
  const [loadedMeals, setLoadedMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    async function loadMeals() {
      setIsLoading(true);

      try {
        const meals = await fetchAvailableMeals();
        setLoadedMeals(meals);
      } catch (error) {
        setError({ message: error.message || "Failed to fetch meals" });
      }

      setIsLoading(false);
    }

    loadMeals();
  }, []);

  if (isLoading) {
    return <p className="center">Fetching meals...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch meals" message={error.message} />;
  }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}

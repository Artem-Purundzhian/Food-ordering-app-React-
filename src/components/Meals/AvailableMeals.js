import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetchMeals = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://foodordering-4ef92-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
      );
      if (!response.ok) {
        console.log(response);
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      const loadedMeals = [];
      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: +data[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  if (error) {
    return (
      <section className={classes.meals}>
        <Card>
          <div className="errorMessage">{error}</div>
        </Card>
      </section>
    );
  }

  return (
    <section className={classes.meals}>
      <Card>
        {isLoading ? (
          <div className="loadingSpinner"></div>
        ) : (
          <ul>{mealsList}</ul>
        )}
      </Card>
    </section>
  );
};

export default AvailableMeals;

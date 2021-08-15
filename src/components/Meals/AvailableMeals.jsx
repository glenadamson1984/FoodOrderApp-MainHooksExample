import { DUMMY_MEALS } from "./__data__/dummy-meals";
import styles from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [availableMeals, setAvailableMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);

    // didnt use try catch here as i am throwing an error on a bad status code
    // but this will only return a rejected promise so using the .catch syntax instead
    const fetchMeals = async () => {
      const response = await fetch(
        `https://http-request-c835b-default-rtdb.firebaseio.com/meals.json`
      );

      if (!response.ok) {
        throw new Error("bad status code");
      }

      const data = await response.json();

      const loadedMeals = [];

      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }

      setAvailableMeals(loadedMeals);
    };

    fetchMeals().catch(() => {
      setIsError(true);
    });
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>loading...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section>
        <p>error thrown...</p>
      </section>
    );
  }

  const mealsList = availableMeals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;

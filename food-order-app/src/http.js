export async function fetchAvailableMeals() {
  const response = await fetch("http://localhost:3000/meals");

  if (!response.ok) {
    throw new Error("Failed to fetch meals");
  }

  const meals = await response.json();
  return meals;
}

export async function submitOrder(order) {
  const response = await fetch("http://localhost:3000/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ order }),
  });

  if (!response.ok) {
    throw new Error("Failed to submit order");
  }

  const resData = await response.json();
  return resData.message;
}

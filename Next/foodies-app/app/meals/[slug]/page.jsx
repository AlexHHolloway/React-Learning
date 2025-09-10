export default function MealDetailPage({ params }) {
  return (
    <div>
      <h1>Meal Details</h1>
      <p>Showing details for meal: {params.slug}</p>
    </div>
  );
}

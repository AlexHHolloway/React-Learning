import { useState, useEffect } from "react";
import Places from "./Places.jsx";
import ErrorPage from "../components/Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  // data fetching
  const [availablePlaces, setAvailablePlaces] = useState([]);
  // loading state
  const [isFetching, setIsFetching] = useState(false);
  // error state
  const [error, setError] = useState();

  useEffect(() => {
    setIsFetching(true);
    async function fetchPlaces() {
      try {
        const places = await fetchAvailablePlaces();

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        });
      } catch (error) {
        setError(error);
        setIsFetching(false);
      }
    }
    fetchPlaces();
  }, []);

  if (error) {
    return (
      <ErrorPage title="Oh no! An error occured!" message={error.message} />
    );
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      loadingText="Fetching place data..."
      isLoading={isFetching}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}

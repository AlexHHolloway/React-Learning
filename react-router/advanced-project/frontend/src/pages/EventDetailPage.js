import { useRouteLoaderData, redirect } from 'react-router-dom';
import EventItem from '../components/EventItem';

function EventDetailPage() {
  const eventDetailsData = useRouteLoaderData('event-details');
  return <EventItem event={eventDetailsData.event} />;
}

export default EventDetailPage;

export async function loader({ params }) {
  const id = params.eventId;
  const response = await fetch('http://localhost:8080/events/' + id);

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: 'Selected event details not found' }),
      { status: 500 }
    );
  } else return response;
}

export async function action({ params, request }) {
  const id = params.eventId;
  const response = await fetch('http://localhost:8080/events/' + id, {
    method: request.method,
  });

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not delete event.' }), {
      status: 500,
    });
  }

  return redirect('/events');
}

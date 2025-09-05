import { Await } from 'react-router-dom';
import { Suspense, useEffect } from 'react';

import { useRouteLoaderData, redirect, useParams } from 'react-router-dom';
import EventItem from '../components/EventItem';
import EventsList from '../components/EventsList';
import { getAuthToken } from '../util/auth';

function EventDetailPage() {
  const { event, events } = useRouteLoaderData('event-details');
  const params = useParams();

  // Scroll to top when event ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.eventId]);

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading EVENT</p>}>
        <Await resolve={event}>
          {loadedEvent => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense
        fallback={<p style={{ textAlign: 'center' }}>Loading EVENT LIST</p>}
      >
        <Await resolve={events}>
          {loadedEvents => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

export default EventDetailPage;

async function loadEvent(id) {
  const response = await fetch('http://localhost:8080/events/' + id);

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: 'Selected event details not found' }),
      { status: 500 }
    );
  } else {
    const resData = await response.json();
    return resData.event;
  }
}

async function loadEvents() {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
      status: 500,
    });
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export async function loader({ params }) {
  const id = params.eventId;

  return {
    event: await loadEvent(id),
    events: loadEvents(),
  };
}

export async function action({ params, request }) {
  const id = params.eventId;
  const token = getAuthToken();
  const response = await fetch('http://localhost:8080/events/' + id, {
    method: request.method,
    headers: {
      'Authorization': 'Bearer ' + token,
    },
  });

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not delete event.' }), {
      status: 500,
    });
  }

  return redirect('/events');
}

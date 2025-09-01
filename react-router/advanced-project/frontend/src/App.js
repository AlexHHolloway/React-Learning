import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import EventsLayout from './pages/EventsLayout';
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import EventDetailPage, {
  loader as eventDetailsLoader,
} from './pages/EventDetailPage';
import NewEventPage, { action as newEventAction } from './pages/NewEventPage';
import EditEventPage from './pages/EditEventPage';
import ErrorPage from './pages/ErrorPage';
import { loader as eventsLoader } from './pages/EventsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'events',
        element: <EventsLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            path: ':eventId',
            id: 'event-details',
            loader: eventDetailsLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
              },
              {
                path: 'edit',
                element: <EditEventPage />,
              },
            ],
          },
          {
            path: 'new',
            element: <NewEventPage />,
            action: newEventAction,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

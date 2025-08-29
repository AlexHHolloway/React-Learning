import { useParams } from 'react-router-dom';
import { DUMMY_EVENTS } from '../data/events';
import classes from './EventDetailPage.module.css';

function EventDetailPage() {
  const params = useParams();
  const event = DUMMY_EVENTS.find(event => event.id === params.eventId);

  if (!event) {
    return (
      <div className={classes.notFound}>
        <h1 className={classes.notFoundTitle}>Event Not Found</h1>
        <p className={classes.notFoundText}>
          The event with ID &quot;{params.eventId}&quot; could not be found.
        </p>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>{event.title}</h1>

      <div className={classes.infoItem}>
        <span className={classes.label}>Event ID:</span> {event.id}
      </div>

      <div className={classes.infoItem}>
        <span className={classes.label}>Date:</span> {event.date}
      </div>

      <div className={classes.infoItem}>
        <span className={classes.label}>Time:</span> {event.time}
      </div>

      <div className={classes.infoItem}>
        <span className={classes.label}>Location:</span> {event.location}
      </div>

      <div className={classes.descriptionContainer}>
        <span className={classes.label}>Description:</span>
        <p className={classes.descriptionText}>{event.description}</p>
      </div>
    </div>
  );
}

export default EventDetailPage;

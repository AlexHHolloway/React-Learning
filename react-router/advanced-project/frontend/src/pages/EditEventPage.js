import { useParams } from 'react-router-dom';

function EditEventPage() {
  const params = useParams();

  return (
    <div>
      <h1>Edit Event</h1>
      <p>Editing Event ID: {params.eventId}</p>
    </div>
  );
}

export default EditEventPage;

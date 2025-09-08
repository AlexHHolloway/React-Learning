import { useState } from 'react';
import { Link, Outlet, useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';

import Header from '../Header.jsx';
import { fetchEvent, deleteEvent, queryClient } from '../../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import Modal from '../UI/Modal.jsx';

export default function EventDetails() {
  const [deleting, setDeleting] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events', id],
    queryFn: ({ signal }) => fetchEvent({ id, signal }),
  });

  const {
    mutate,
    isPending: isDeleting,
    isError: isDeleteError,
    error: deleteError,
  } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['events'],
        refetchType: 'none',
      });
      navigate('/events');
    },
  });

  function handleStartDelete() {
    setDeleting(true);
  }

  function handleStopDelete() {
    setDeleting(false);
  }

  function handleDelete() {
    mutate({ id });
  }

  let content;

  if (isPending) {
    content = (
      <div id='event-details-content'>
        <p style={{ paddingLeft: '1rem' }}>Loading event...</p>
      </div>
    );
  }

  if (isError) {
    content = (
      <div id='event-details-content'>
        <ErrorBlock
          title='Failed to load event'
          message={error.info?.message || 'Failed to fetch event details.'}
        />
      </div>
    );
  }

  if (data) {
    // Parse date string directly to avoid timezone issues
    const [year, month, day] = data.date.split('-');
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const formattedDate = `${monthNames[parseInt(month) - 1]} ${parseInt(day)}, ${year}`;

    // Format time from 24-hour to 12-hour format
    const formatTime = time24 => {
      const [hours, minutes] = time24.split(':');
      const hour12 = parseInt(hours);
      const ampm = hour12 >= 12 ? 'PM' : 'AM';
      const displayHour = hour12 % 12 || 12;
      return `${displayHour}:${minutes} ${ampm}`;
    };

    const formattedTime = formatTime(data.time);

    content = (
      <div id='event-details-content'>
        <img src={`http://localhost:3000/${data.image}`} alt={data.title} />
        <div id='event-details-info'>
          <div>
            <p id='event-details-location'>{data.location}</p>
            <time dateTime={`${data.date}T${data.time}`}>
              {formattedDate} @ {formattedTime}
            </time>
          </div>
          <p id='event-details-description'>{data.description}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {deleting && (
        <Modal onClose={handleStopDelete}>
          <h2>Are you sure?</h2>
          <p>Do you really want to delete this event?</p>
          <div className='form-actions'>
            {isDeleting && <p>Deleting...please wait.</p>}
            {!isDeleting && (
              <>
                <button
                  onClickCapture={handleStopDelete}
                  className='button-text'
                >
                  Cancel
                </button>
                <button onClick={handleDelete} className='button'>
                  Confirm
                </button>
              </>
            )}
          </div>
        </Modal>
      )}
      <Outlet />
      <Header>
        <Link to='/events' className='nav-item'>
          View all Events
        </Link>
      </Header>
      <article id='event-details'>
        <header>
          <h1>{data?.title || 'Event Details'}</h1>
          <nav>
            <button onClick={handleStartDelete} disabled={isDeleting}>
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
            <Link to='edit'>Edit</Link>
          </nav>
        </header>
        {isDeleteError && (
          <ErrorBlock
            title='Failed to delete event'
            message={
              deleteError.info?.message ||
              'Failed to delete event. Please try again later.'
            }
          />
        )}
        {content}
      </article>
    </>
  );
}

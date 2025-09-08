/* eslint-disable react-refresh/only-export-components */
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import { fetchEvent, updateEvent, queryClient } from '../../util/http.js';

export default function EditEvent() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isError, error } = useQuery({
    queryKey: ['events', id],
    queryFn: ({ signal }) => fetchEvent({ signal, id }),
  });

  const {
    mutate,
    isPending: isUpdating,
    isError: isUpdateError,
    error: updateError,
  } = useMutation({
    mutationFn: updateEvent,
    onMutate: async ({ id, event }) => {
      await queryClient.cancelQueries({ queryKey: ['events', id] });

      const previousEvent = queryClient.getQueryData(['events', id]);

      queryClient.setQueryData(['events', id], event);

      queryClient.setQueryData(['events'], oldData => {
        if (!oldData) return oldData;
        return oldData.map(oldEvent =>
          oldEvent.id === id ? { ...oldEvent, ...event } : oldEvent
        );
      });

      queryClient.setQueriesData(
        { queryKey: ['events'], type: 'active' },
        oldData => {
          if (!oldData || !Array.isArray(oldData)) return oldData;
          return oldData.map(oldEvent =>
            oldEvent.id === id ? { ...oldEvent, ...event } : oldEvent
          );
        }
      );

      navigate('../');

      return { previousEvent };
    },
    onError: (err, variables, context) => {
      if (context?.previousEvent) {
        queryClient.setQueryData(
          ['events', variables.id],
          context.previousEvent
        );
      }
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });

  function handleSubmit(formData) {
    mutate({ id, event: formData });
  }

  function handleClose() {
    navigate('../');
  }

  let content;

  if (isError) {
    content = (
      <>
        <ErrorBlock
          title='Failed to load event'
          message={
            error.info?.message ||
            'Failed to load event. Please check your inputs and try again later.'
          }
        />
        <div className='form-actions'>
          <Link to='../' className='button'>
            Okay
          </Link>
        </div>
      </>
    );
  }

  if (data) {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        {isUpdating && <p>Updating event...</p>}
        {!isUpdating && (
          <>
            <Link to='../' className='button-text'>
              Cancel
            </Link>
            <button type='submit' className='button'>
              Update
            </button>
          </>
        )}
      </EventForm>
    );
  }

  return (
    <Modal onClose={handleClose}>
      {isUpdateError && (
        <ErrorBlock
          title='Failed to update event'
          message={
            updateError.info?.message ||
            'Failed to update event. Please check your inputs and try again later.'
          }
        />
      )}
      {content}
    </Modal>
  );
}

export function loader({ params }) {
  return queryClient.fetchQuery({
    queryKey: ['events', params.id],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
  });
}

'use client';

import { useFormState } from 'react-dom';

import classes from './page.module.css';

import ImagePicker from '@/components/images/img-picker';
import MealsFormSubmit from '@/components/meals/meals-form-submit';
import { shareMeal } from '@/lib/actions';

export default function ShareMealPage() {
  const [state, formAction] = useFormState(shareMeal, { errors: {}, data: {} });

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        {state.errors?.general && (
          <div className={classes.generalError}>{state.errors.general}</div>
        )}
        <form className={classes.form} action={formAction}>
          <div className={classes.row}>
            <p>
              <label htmlFor='name'>Your name</label>
              <input
                type='text'
                id='name'
                name='name'
                required
                defaultValue={state.data?.creator || ''}
              />
              {state.errors?.creator && (
                <span className={classes.error}>{state.errors.creator}</span>
              )}
            </p>
            <p>
              <label htmlFor='email'>Your email</label>
              <input
                type='email'
                id='email'
                name='email'
                required
                defaultValue={state.data?.creator_email || ''}
              />
              {state.errors?.creator_email && (
                <span className={classes.error}>
                  {state.errors.creator_email}
                </span>
              )}
            </p>
          </div>
          <p>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              id='title'
              name='title'
              required
              defaultValue={state.data?.title || ''}
            />
            {state.errors?.title && (
              <span className={classes.error}>{state.errors.title}</span>
            )}
          </p>
          <p>
            <label htmlFor='summary'>Short Summary</label>
            <input
              type='text'
              id='summary'
              name='summary'
              required
              defaultValue={state.data?.summary || ''}
            />
            {state.errors?.summary && (
              <span className={classes.error}>{state.errors.summary}</span>
            )}
          </p>
          <p>
            <label htmlFor='instructions'>Instructions</label>
            <textarea
              id='instructions'
              name='instructions'
              rows='10'
              required
              defaultValue={state.data?.instructions || ''}
            />
            {state.errors?.instructions && (
              <span className={classes.error}>{state.errors.instructions}</span>
            )}
          </p>
          <ImagePicker label='Your image' name='image' />
          {state.errors?.image && (
            <span className={classes.error}>{state.errors.image}</span>
          )}
          <p className={classes.actions}>
            <MealsFormSubmit />
          </p>
        </form>
      </main>
    </>
  );
}

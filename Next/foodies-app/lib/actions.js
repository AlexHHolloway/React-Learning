'use server';
import { redirect } from 'next/navigation';

import { saveMeal } from './meals';

function isInvalidText(text) {
  return !text || text.trim() === '';
}

export async function shareMeal(prevState, formData) {
  const meal = {
    title: formData.get('title'),
    image: formData.get('image'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  };

  const errors = {};

  if (isInvalidText(meal.title)) {
    errors.title = 'Title is required.';
  }
  if (isInvalidText(meal.summary)) {
    errors.summary = 'Summary is required.';
  }
  if (isInvalidText(meal.instructions)) {
    errors.instructions = 'Instructions are required.';
  }
  if (isInvalidText(meal.creator)) {
    errors.creator = 'Your name is required.';
  }
  if (isInvalidText(meal.creator_email)) {
    errors.creator_email = 'Your email is required.';
  } else if (!meal.creator_email.includes('@')) {
    errors.creator_email = 'Please enter a valid email address.';
  }
  if (!meal.image || meal.image.size === 0) {
    errors.image = 'Please select an image.';
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      data: {
        title: meal.title,
        summary: meal.summary,
        instructions: meal.instructions,
        creator: meal.creator,
        creator_email: meal.creator_email,
      },
    };
  }

  try {
    await saveMeal(meal);
  } catch {
    return {
      errors: {
        general: 'Failed to save meal. Please try again.',
      },
      data: {
        title: meal.title,
        summary: meal.summary,
        instructions: meal.instructions,
        creator: meal.creator,
        creator_email: meal.creator_email,
      },
    };
  }

  redirect('/meals');
}

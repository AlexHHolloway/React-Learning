'use client';
import { useRef, useState } from 'react';
import Image from 'next/image';

import styles from './img-picker.module.css';

export default function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState();
  const imageInput = useRef();

  function handleClickInput() {
    imageInput.current.click();
  }

  function handleImageChange(e) {
    const file = e.target.files[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  }

  return (
    <>
      <div className={styles.picker}>
        <label htmlFor={name}>{label}</label>
        <div className={styles.controls}>
          <div className={styles.preview}>
            {!pickedImage && <p>No image selected.</p>}
            {pickedImage && (
              <Image
                src={pickedImage}
                alt='Preview of the selected image'
                fill
                sizes='(max-width: 768px) 100vw, 10rem'
              />
            )}
          </div>
          <input
            className={styles.input}
            type='file'
            id={name}
            accept='image/png, image/jpeg, image/jpg'
            name={name}
            ref={imageInput}
            onChange={handleImageChange}
            required
          />
          <button
            className={styles.button}
            type='button'
            onClick={handleClickInput}
          >
            Pick an Image
          </button>
        </div>
      </div>
    </>
  );
}

import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <>
      <header className={styles.header}>
        <h1>
          <span className={styles.highlight}>Meal Not Found</span>
        </h1>
        <p>
          Sorry, we couldn&apos;t find the meal you&apos;re looking for. It might have been moved, deleted, or you entered the wrong URL.
        </p>
        <p className={styles.cta}>
          <Link href='/'>Go back home</Link>
          <Link href='/meals'>Browse meals</Link>
        </p>
      </header>
      <main className={styles.main}>
        <div className={styles.errorCode}>404</div>
        <p className={styles.suggestion}>
          Try checking the URL for typos, or use the navigation above to find what you&apos;re looking for.
        </p>
      </main>
    </>
  );
}

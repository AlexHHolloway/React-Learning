import styles from './main-header-bg.module.css';

export default function MainHeaderBg() {
  return (
    <div className={styles['header-background']}>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 256'>
        <defs>
          <linearGradient id='gradient' x1='0%' y1='0%' x2='100%' y2='0%'>
            <stop
              offset='0%'
              style={{ stopColor: '#59453c', stopOpacity: '1' }}
            />
            <stop
              offset='100%'
              style={{ stopColor: '#8f3a09', stopOpacity: '1' }}
            />
          </linearGradient>
        </defs>
        <path
          fill='url(#gradient)'
          d='M0,205L48,192C96,179,192,154,288,145C384,137,480,145,576,149C672,154,768,154,864,145C960,137,1056,119,1152,107C1248,94,1344,86,1392,81L1440,77L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z'
        ></path>
      </svg>
    </div>
  );
}

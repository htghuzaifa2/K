
import styles from '../styles/tools.module.css';

export default function Loading() {
  return (
    <div className={styles.grid}>
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className={styles.cardSkeleton}>
          <div className={styles.skeletonTitle}></div>
        </div>
      ))}
    </div>
  );
}

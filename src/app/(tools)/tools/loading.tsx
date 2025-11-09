
import styles from '../styles/tools.module.css';

export default function Loading() {
  return (
    <div className={styles.grid}>
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className={styles.cardSkeleton}>
          <div className={styles.skeletonIcon}></div>
          <div className={styles.skeletonTitle}></div>
          <div className={styles.skeletonText}></div>
          <div className={styles.skeletonTextShort}></div>
        </div>
      ))}
    </div>
  );
}

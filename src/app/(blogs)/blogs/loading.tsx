
import styles from '../styles/blogs.module.css';

export default function Loading() {
  return (
    <div className={styles.grid}>
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className={styles.cardSkeleton}>
          <div className={styles.skeletonTitle}></div>
          <div className={styles.skeletonDescription}></div>
          <div className={styles.skeletonDescription} style={{width: '80%'}}></div>
          <div className={styles.skeletonDescription} style={{width: '90%'}}></div>
          <div className={styles.skeletonButton}></div>
        </div>
      ))}
    </div>
  );
}


import styles from '../styles/tools.module.css';

export default function Loading() {
  return (
    <div className={styles.grid}>
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className={styles.card}>
            <div className="flex flex-col space-y-3">
                <div className="space-y-2">
                    <div className={`${styles.skeletonTitle} h-6 w-[250px]`}></div>
                </div>
            </div>
        </div>
      ))}
    </div>
  );
}

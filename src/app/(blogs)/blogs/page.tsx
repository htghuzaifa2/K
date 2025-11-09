import { getBlogPosts } from '@/lib/blog-data';
import BlogSearch from '../components/BlogSearch';
import styles from '../styles/blogs.module.css';

const ITEMS_PER_PAGE = 20;

export default function BlogsPage() {
  const allPosts = getBlogPosts();

  return (
    <>
      <header className={styles.hero}>
        <h1>Insights & Ideas</h1>
        <p>Your source for tech trends, expert tutorials, and design inspiration.</p>
      </header>
      <main className={styles.main}>
        <div className={styles.searchContainer}>
          <BlogSearch allPosts={allPosts} itemsPerPage={ITEMS_PER_PAGE} />
        </div>
      </main>
    </>
  );
}

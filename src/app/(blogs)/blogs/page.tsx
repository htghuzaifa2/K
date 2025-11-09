import { getBlogPosts } from '@/lib/blog-data';
import BlogSearch from '../components/BlogSearch';
import BlogCard from '../components/BlogCard';
import BlogPagination from '../components/BlogPagination';
import styles from '../styles/blogs.module.css';

const ITEMS_PER_PAGE = 20; // This can be adjusted

// This is now a Server Component
export default function BlogsPage() {
  const allPosts = getBlogPosts();

  // For this example, we'll imagine pagination is handled on the client
  // But the initial data is from the server.
  // A full implementation would pass page number from searchParams
  const totalPages = Math.ceil(allPosts.length / ITEMS_PER_PAGE);
  const currentPosts = allPosts.slice(0, ITEMS_PER_PAGE);

  return (
    <div className={styles.container}>
      <header className={styles.hero}>
        <h1>Insights & Ideas</h1>
        <p>Your source for tech trends, expert tutorials, and design inspiration.</p>
        <div className={styles.searchContainer}>
            {/* The search component needs to be a client component */}
          <BlogSearch allPosts={allPosts} itemsPerPage={ITEMS_PER_PAGE} />
        </div>
      </header>
    </div>
  );
}

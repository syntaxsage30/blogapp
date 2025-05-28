import Link from 'next/link';
import Image from 'next/image';
import { canDeleteBlog ,deleteBlog} from '../utils/blogs';
import { getCurrentUser } from '../utils/auth';
import styles from '../styles/Home.module.css';


export default function BlogCard({ id, title, summary, date, image, location, author }) {
  const currentUser = getCurrentUser();
  
  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        await deleteBlog(id);
        // You might want to add a refresh function here or handle deletion in parent
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className={styles.blogCard}>
      <div className={styles.imageContainer}>
        <Image 
          src={image} 
          alt={title} 
          width={400} 
          height={250} 
          className={styles.blogImage}
        />
      </div>
      <div className={styles.blogContent}>
        <span className={styles.location}>{location}</span>
        <Link href={`/blog/${id}`}>
          <h2>{title}</h2>
        </Link>
        <p className={styles.summary}>{summary}</p>
        <div className={styles.cardFooter}>
          <span className={styles.date}>
            {new Date(date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
            {author && ` • By ${author}`}
          </span>
          <div className={styles.cardActions}>
            <Link href={`/blog/${id}`} className={styles.readMore}>
              Read More →
            </Link>
            {canDeleteBlog({ id, author }) && (
              <button onClick={handleDelete} className={styles.deleteButton}>
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
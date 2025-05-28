// components/Layout.js
import styles from '../styles/Layout.module.css';
import Link from 'next/link';
import UserBadge from './UserBadge';

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <Link href="/" legacyBehavior>
              <a className={styles.navLink}>🌍 Wanderlust</a>
            </Link>
          </div>

          <div className={styles.links}>
            <Link href="/" legacyBehavior>
              <a className={styles.navLink}>Home</a>
            </Link>
            <Link href="/add-blog" legacyBehavior>
              <a className={styles.navLink}>New Post</a>
            </Link>
            <UserBadge />
          </div>
        </nav>
      </header>

      <main className={styles.mainContent}>
        {children}
      </main>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Wanderlust Travel Blog</p>
        <div className={styles.socialLinks}>
          <a href="#" className={styles.socialLink}>Twitter</a>
          <a href="#" className={styles.socialLink}>Instagram</a>
          <a href="#" className={styles.socialLink}>Facebook</a>
        </div>
      </footer>
    </div>
  );
}

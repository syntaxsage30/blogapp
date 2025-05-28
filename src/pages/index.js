import { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import BlogCard from '../components/BlogCard';
import { getAllBlogs } from '../utils/blogs';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchBlogs() {
      const allBlogs = await getAllBlogs();
      setBlogs(allBlogs);
    }
    fetchBlogs();
  }, []);

  return (
    <Layout>
      <Head>
        <title>Wanderlust Travel Blog</title>
        <meta name="description" content="Travel stories and tips from around the world" />
      </Head>

      <div className={styles.hero}>
        <h1 className={styles.mainHeading}>Discover the World Through Our Stories</h1>
        <p>Journeys, experiences, and tips from passionate travelers</p>
      </div>

      <div className={styles.blogList}>
        {blogs.map((blog) => (
          <BlogCard key={blog.id} {...blog} />
        ))}
      </div>
    </Layout>
  );
}

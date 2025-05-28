import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '../../components/Layout';
import { getBlogById, deleteBlog } from '../../utils/blogs';
import LikeButton from '../../components/LikeButton';
import CommentSection from '../../components/CommentsSection';
import ShareButton from '../../components/ShareButton';
import styles from '../../styles/Features.module.css';

export default function BlogPost() {
  const router = useRouter();
  const { id } = router.query;
  const [blog, setBlog] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (id) {
      const loadedBlog = getBlogById(id);
      if (loadedBlog) {
        setBlog(loadedBlog);
      } else {
        router.replace('/404');
      }
    }
  }, [id, router]);

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this post?')) {
      setIsDeleting(true);
      deleteBlog(id);
      router.push('/');
    }
  };

  if (!blog) return (
    <Layout>
      <Head><title>Loading... | Wanderlust</title></Head>
      <div className="loading">Loading...</div>
    </Layout>
  );

  return (
    <Layout>
      <Head>
        <title>{`${blog.title} | Wanderlust`}</title>
        <meta name="description" content={blog.summary} />
      </Head>

      <article className="blogArticle">
        <div className="imageContainer">
          <Image
            src={blog.image}
            alt={blog.title}
            width={800}
            height={450}
            layout="responsive"
            quality={80}
            priority
            style={{ borderRadius: '12px' }}
          />
        </div>

        <h1>{blog.title}</h1>
        <div className="metaInfo">
          <span className={styles.location}>{blog.location}</span>
          <span className={styles.date}>
            {new Date(blog.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>

        <div className="content">
          {blog.content.split('\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <div className="interactionSection">
          <LikeButton postId={blog.id} />
          <ShareButton post={blog} />
        </div>

        <button 
          onClick={handleDelete} 
          className="deleteButton"
          disabled={isDeleting}
        >
          {isDeleting ? 'Deleting...' : 'Delete Post'}
        </button>
      </article>

      <CommentSection postId={blog.id} />

      <style jsx>{`
        .blogArticle {
          max-width: 800px;
          margin: 0 auto;
          padding: 1rem;
        }

        .imageContainer {
          max-width: 600px;
          margin: 0 auto 2rem;
          width: 100%;
        }

        h1 {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: #1e293b;
        }

        .metaInfo {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
          color: #64748b;
          font-size: 0.95rem;
        }

        .content p {
          margin-bottom: 1.5rem;
          line-height: 1.7;
          color: #475569;
        }

        .interactionSection {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
        }

        .deleteButton {
          background: #ef4444;
          color: white;
          border: none;
          padding: 0.8rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.2s;
          margin-top: 2rem;
        }

        .deleteButton:hover {
          background: #dc2626;
        }

        .deleteButton:disabled {
          background: #94a3b8;
          cursor: not-allowed;
        }

        .loading {
          text-align: center;
          padding: 2rem;
          color: #64748b;
        }
      `}</style>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  const blog = getBlogById(id);

  return {
    props: {
      blog: blog || null
    }
  };
}

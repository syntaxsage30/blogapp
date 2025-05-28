import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import { addBlog } from '../utils/blogs';
import styles from '../styles/Form.module.css';
import Image from 'next/image';

export default function AddBlog() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    image: '',
    location: ''
  });
  const [imagePreview, setImagePreview] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [newBlogId, setNewBlogId] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setFormData(prev => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBlog = addBlog(formData);
    setNewBlogId(newBlog.id);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Layout>
        <div className={styles.successContainer}>
          <h2>🎉 Blog Added Successfully!</h2>
          <div className={styles.successButtons}>
            <Link href="/" className={styles.button}>
              ← Back to Home
            </Link>
            <Link href={`/blog/${newBlogId}`} className={styles.button}>
              View Blog →
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Share Your Journey | Wanderlust</title>
      </Head>

      <div className={styles.formContainer}>
        <h1>Share Your Travel Story</h1>
        <form onSubmit={handleSubmit} className={styles.blogForm}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Title*</label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="location">Location*</label>
            <input
              type="text"
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Image</label>
            <div className={styles.imageUploadContainer}>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                hidden
              />
              <button
                type="button"
                className={styles.uploadButton}
                onClick={() => fileInputRef.current.click()}
              >
                {imagePreview ? 'Change Image' : 'Upload Image'}
              </button>
              {imagePreview && (
                <div className={styles.imagePreview}>
                  <image src={imagePreview} alt="Preview" />
                  <button
                    type="button"
                    className={styles.removeImage}
                    onClick={() => {
                      setImagePreview('');
                      setFormData(prev => ({ ...prev, image: '' }));
                    }}
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="date">Date*</label>
            <input
              type="date"
              id="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
              max={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="content">Your Story*</label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
              rows="10"
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Publish Your Story
          </button>
        </form>
      </div>
    </Layout>
  );
}
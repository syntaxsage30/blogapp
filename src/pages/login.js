import { useState } from 'react';
import Layout from '../components/Layout';
import AuthModal from '../components/AuthModal';
import styles from '../styles/Login.module.css';

export default function LoginPage() {
  const [showModal, setShowModal] = useState(true); // Show modal on load

  return (
    <Layout>
      <div className={styles.loginContainer}>
        {/* Background content is always visible */}
        <div className={styles.loginContent}>
          <h1>Welcome Back</h1>
          <p>Please login to continue</p>
          <button onClick={() => setShowModal(true)}>
            Open Login Modal
          </button>
        </div>

        {/* Modal appears on top when active */}
        {showModal && (
          <div className={styles.modalOverlay}>
            <AuthModal onClose={() => setShowModal(false)} />
          </div>
        )}
      </div>
    </Layout>
  );
}

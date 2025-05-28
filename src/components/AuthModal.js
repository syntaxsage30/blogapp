import { useState } from 'react';
import { setCurrentUser } from '../utils/auth';
import styles from '../styles/User.module.css';

export default function AuthModal({ onClose,onLogin }) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentUser(username);
    onLogin(username);
    onClose();
  };

  return (
    <div className={styles.authModal}>
      <div className={styles.authContent}>
        <h2>Choose a Nickname</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter nickname (optional)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.authInput}
          />
          <button 
            type="submit" 
            className={styles.authButton}
          >
            Continue as {username || 'Anonymous'}
          </button>
        </form>
        <button 
          onClick={onClose} 
          className={styles.closeButton}
        >
          Close
        </button>
      </div>
    </div>
  );
}
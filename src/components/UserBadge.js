// components/UserBadge.js
import { useState, useEffect } from 'react';
import { getCurrentUser, logout } from '../utils/auth';
import AuthModal from './AuthModal';
import styles from '../styles/User.module.css';

export default function UserBadge() {
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return (
    <div className={styles.userBadge}>
      {showAuthModal && (
  <AuthModal 
    onClose={() => setShowAuthModal(false)} 
    onLogin={(newUser) => {
      setUser({ username: newUser }); // immediately updates UI
      setShowAuthModal(false);
    }}
  />
)}

      
       {user && <span className={styles.username}>Logged in as <strong>{user.username}</strong></span>}

      <div className={styles.userActions}>
        <span 
          className={styles.authLink} 
          onClick={() => setShowAuthModal(true)}
          role="button"
          tabIndex={0}
        >
          {user ? 'Change Account' : 'Login'}
        </span>
        {user && (
          <button className={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
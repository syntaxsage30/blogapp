import { useState, useEffect } from 'react';
import { getLikes, incrementLikes, hasLiked, markLiked } from '../utils/likes';
import styles from '../styles/Features.module.css';

export default function LikeButton({ postId }) {
  const [likes, setLikes] = useState(0);
  const [userHasLiked, setUserHasLiked] = useState(false);

  useEffect(() => {
    setLikes(getLikes(postId));
    setUserHasLiked(hasLiked(postId));
  }, [postId]);

  const handleLike = () => {
    if (!userHasLiked) {
      const newLikes = incrementLikes(postId);
      markLiked(postId);
      setLikes(newLikes);
      setUserHasLiked(true);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={userHasLiked}
      className={`${styles.interactionButton} ${styles.likeButton}`}
    >
      {userHasLiked ? '❤️ Liked' : '🤍 Like'}
      <span>({likes})</span>
    </button>
  );
}
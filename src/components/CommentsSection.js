import { useState, useEffect } from 'react';
import {
  getComments,
  addComment,
  deleteComment,
  canDeleteComment
} from '../utils/comments';
import { getCurrentUser } from '../utils/auth';
import styles from '../styles/Features.module.css';

export default function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [cooldown, setCooldown] = useState(false);
  const currentUser = getCurrentUser();

  useEffect(() => {
    const loadedComments = getComments(postId);
    setComments(Array.isArray(loadedComments) ? loadedComments : []);
  }, [postId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cooldown || !currentUser) return;

    setCooldown(true);
    setTimeout(() => setCooldown(false), 30000); // 30-second cooldown

    try {
      const updatedComments = addComment(postId, newComment);
      setComments(updatedComments);
      setNewComment('');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = (commentId) => {
    if (confirm('Delete this comment?')) {
      try {
        const updatedComments = deleteComment(postId, commentId);
        setComments(updatedComments);
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className={styles.commentSection}>
      <h3>Comments ({comments.length})</h3>

      {currentUser ? (
        <form onSubmit={handleSubmit}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            required
          />
          <button type="submit" disabled={cooldown}>
            {cooldown ? 'Please wait...' : 'Post Comment'}
          </button>
        </form>
      ) : (
        <p className={styles.loginPrompt}>Please log in to comment</p>
      )}

      <div className={styles.commentList}>
        {Array.isArray(comments) && comments.map((comment) => (
          <div key={comment.id} className={styles.comment}>
            <div className={styles.commentHeader}>
              <p className={styles.commentAuthor}>{comment.author}</p>
              {canDeleteComment(comment) && (
                <button
                  onClick={() => handleDelete(comment.id)}
                  className={styles.deleteComment}
                >
                  ×
                </button>
              )}
            </div>
            <p className={styles.commentText}>{comment.text}</p>
            <time className={styles.commentTime}>
              {new Date(comment.timestamp).toLocaleString()}
            </time>
          </div>
        ))}
      </div>
    </div>
  );
}

import { getCurrentUser, isAdmin } from './auth';

export function getComments(postId) {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(`comments-${postId}`);
    const parsed = JSON.parse(raw || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Failed to parse comments:', err);
    return [];
  }
}

export function deleteComment(postId, commentId) {
  const user = getCurrentUser();
  if (!user) throw new Error('You must be logged in to delete comments');

  const comments = getComments(postId);
  const commentToDelete = comments.find(c => c.id === commentId);

  if (!commentToDelete) throw new Error('Comment not found');

  if (!isAdmin() && commentToDelete.author !== user.username) {
    throw new Error('You are not authorized to delete this comment');
  }

  const updatedComments = comments.filter(c => c.id !== commentId);
  localStorage.setItem(`comments-${postId}`, JSON.stringify(updatedComments));
  return updatedComments; // ✅ return updated array
}

export function addComment(postId, text) {
  const user = getCurrentUser();
  if (!user) throw new Error('You must be logged in to comment');

  const comment = {
    id: Date.now(),
    postId,
    text,
    timestamp: new Date().toISOString(),
    author: user.username
  };

  const comments = [...getComments(postId), comment];
  localStorage.setItem(`comments-${postId}`, JSON.stringify(comments));
  return comments; // ✅ return updated array
}

export function canDeleteComment(comment) {
  const user = getCurrentUser();
  if (!user) return false;
  return isAdmin() || comment?.author === user.username;
}

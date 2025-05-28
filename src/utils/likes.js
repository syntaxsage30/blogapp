import { getCurrentUser } from './auth';
export function getLikes(postId) {
  if (typeof window === 'undefined') return 0;
  return parseInt(localStorage.getItem(`likes-${postId}`)) || 0;
}

export function incrementLikes(postId) {
  const currentLikes = getLikes(postId);
  const newLikes = currentLikes + 1;
  localStorage.setItem(`likes-${postId}`, newLikes.toString());
  return newLikes;
}

export function hasLiked(postId) {
  const user = getCurrentUser();
  return localStorage.getItem(`liked-${postId}-${user}`) === 'true';
}

export function markLiked(postId) {
  const user = getCurrentUser();
  localStorage.setItem(`liked-${postId}-${user}`, 'true');
}
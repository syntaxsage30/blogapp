export function getCurrentUser() {
  if (typeof window === 'undefined') return null;
  try {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error parsing user:', error);
    return null;
  }
}

export function setCurrentUser(username) {
  const user = {
    username,
    id: Date.now(),
    role: username === 'admin' ? 'admin' : 'user'
  };
  localStorage.setItem('currentUser', JSON.stringify(user));
}

export function logout() {
  localStorage.removeItem('currentUser');
}

export function isAdmin() {
  const user = getCurrentUser();
  return user?.role === 'admin';
}

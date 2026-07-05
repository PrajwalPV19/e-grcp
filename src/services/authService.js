import users from '../mocks/users.json';
import { simulateRequest } from '../utils/mockApi';

export async function login({ email, password }) {
  const user = users.find((item) => item.email === email && item.password === password);

  if (!user) {
    throw new Error('Invalid email or password');
  }

  window.localStorage.setItem('e-grcp-token', `mock-token-${user.id}`);

  return simulateRequest({ user: { ...user, password: undefined } }, 500);
}

export async function forgotPassword(email) {
  const exists = users.some((item) => item.email === email);
  if (!exists) {
    throw new Error('No user found for the provided email address');
  }
  return simulateRequest({ message: 'Reset instructions sent to your email.' });
}

export async function resetPassword() {
  return simulateRequest({ message: 'Password reset complete. Use the demo credentials to sign in.' });
}

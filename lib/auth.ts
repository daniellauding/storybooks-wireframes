import bcrypt from 'bcryptjs';
import Cookies from 'js-cookie';

// In production, store these in a database
const passwords: Record<string, string> = {
  'client-2': '$2a$10$YourHashedPasswordHere', // Replace with actual hashed password
  'project-3': '$2a$10$AnotherHashedPassword' // Replace with actual hashed password
};

// For demo purposes - in production, never store plain passwords
export const demoPasswords: Record<string, string> = {
  'client-2': 'demo123',
  'project-3': 'admin456'
};

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function setAuthCookie(resourceId: string): void {
  const authKey = `auth_${resourceId}`;
  Cookies.set(authKey, 'true', { expires: 7 }); // Expires in 7 days
}

export function checkAuthCookie(resourceId: string): boolean {
  const authKey = `auth_${resourceId}`;
  return Cookies.get(authKey) === 'true';
}

export function removeAuthCookie(resourceId: string): void {
  const authKey = `auth_${resourceId}`;
  Cookies.remove(authKey);
}

export async function authenticate(resourceId: string, password: string): Promise<boolean> {
  // For demo, check against plain passwords
  const correctPassword = demoPasswords[resourceId];
  
  if (!correctPassword) {
    return true; // Resource not password protected
  }
  
  if (password === correctPassword) {
    setAuthCookie(resourceId);
    return true;
  }
  
  return false;
}
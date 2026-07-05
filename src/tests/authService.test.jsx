import { describe, expect, it } from 'vitest';
import { login } from '../services/authService';

describe('authService', () => {
  it('authenticates a valid user', async () => {
    const result = await login({
      email: 'manager@egrcp.com',
      password: 'Password@123',
    });

    expect(result.user.role).toBe('Procurement Manager');
  });
});

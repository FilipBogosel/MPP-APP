import type { User } from '@/types';

export const mockUsers: ReadonlyArray<User> = [
  {
    id: 'user-001',
    username: 'driver01',
    fullName: 'Avery Stone',
    email: 'avery@example.com',
    dateOfBirth: '1991-03-17',
    createdAt: '2022-10-01',
  },
  {
    id: 'user-002',
    username: 'speedline',
    fullName: 'Maya Brooks',
    email: 'maya@example.com',
    dateOfBirth: '1994-11-02',
    createdAt: '2023-01-14',
  },
  {
    id: 'user-003',
    username: 'citycommuter',
    fullName: 'Liam Chen',
    email: 'liam@example.com',
    dateOfBirth: '1988-06-29',
    createdAt: '2024-03-18',
  },
];

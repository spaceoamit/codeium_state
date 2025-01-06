import { useState, useEffect } from 'react';
import { User } from '../types/user';
import { fetchUsers } from '../api/users';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);

      // Check cache if not forcing refresh
      if (!forceRefresh) {
        const cached = localStorage.getItem('dashboardUsers');
        const cacheTimestamp = localStorage.getItem('dashboardUsersTimestamp');
        
        if (cached && cacheTimestamp) {
          const age = Date.now() - parseInt(cacheTimestamp, 10);
          // Use cache if less than 5 minutes old
          if (age < 5 * 60 * 1000) {
            setUsers(JSON.parse(cached));
            setLoading(false);
            return;
          }
        }
      }

      const data = await fetchUsers();
      setUsers(data);
      
      // Update cache
      localStorage.setItem('dashboardUsers', JSON.stringify(data));
      localStorage.setItem('dashboardUsersTimestamp', Date.now().toString());
    } catch (err) {
      setError('Failed to load users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return { users, loading, error, refreshUsers: () => loadUsers(true) };
}
import React, { useState } from 'react';
import { UserTable } from './table/UserTable';
import { TopPerformersChart } from './charts/TopPerformersChart';
import { Users, RefreshCw } from 'lucide-react';
import { useUsers } from '../hooks/useUsers';
import { User } from '../types/user';
import { PlatformFilter } from './PlatformFilter';

type Platform = 'Android' | 'iOS' | 'Web';

export function Dashboard() {
  const { users: initialUsers, loading, error, refreshUsers } = useUsers();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('Android');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof User;
    direction: 'asc' | 'desc';
  } | null>(null);

  // Update users when initialUsers changes
  React.useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers]);
  
  const handleSort = (key: keyof User) => {
    let direction: 'asc' | 'desc' = 'asc';
    
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sortedUsers = [...users].sort((a, b) => {
      let aValue = a[key];
      let bValue = b[key];

      // Handle numeric values with % or commas
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.replace('%', '').replace(',', '');
        bValue = bValue.replace('%', '').replace(',', '');
        
        if (!isNaN(Number(aValue)) && !isNaN(Number(bValue))) {
          return direction === 'asc' 
            ? Number(aValue) - Number(bValue)
            : Number(bValue) - Number(aValue);
        }
      }

      // Default string comparison
      return direction === 'asc'
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });

    setUsers(sortedUsers);
    setSortConfig({ key, direction });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-indigo-600" />
                  <h1 className="text-2xl font-semibold text-gray-900">Codeium Top Performer Report</h1>
                </div>
                <PlatformFilter 
                  selectedPlatform={selectedPlatform} 
                  onPlatformChange={setSelectedPlatform} 
                />
              </div>
              <button
                onClick={refreshUsers}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>
          
          <div className="p-6">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
              </div>
            ) : error ? (
              <div className="text-center text-red-600 p-4">{error}</div>
            ) : (
              <>
                <TopPerformersChart users={users} />
                <UserTable 
                  users={users} 
                  onSort={handleSort} 
                  sortConfig={sortConfig}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 
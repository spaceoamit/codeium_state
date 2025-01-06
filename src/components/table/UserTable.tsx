import React from 'react';
import { User } from '../../types/user';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { UserTableRow } from './UserTableRow';

interface UserTableProps {
  users: User[];
  onSort: (key: keyof User) => void;
  sortConfig: {
    key: keyof User;
    direction: 'asc' | 'desc';
  } | null;
}

export function UserTable({ users, onSort, sortConfig }: UserTableProps) {
  const headers = [
    { key: 'Name', label: 'Name' },
    { key: 'Percentile', label: 'Percentile' },
    { key: 'Total Completions', label: 'Completions' },
    { key: 'Streak (6 day record)', label: 'Streak' },
    { key: 'Total Languages', label: 'Languages' },
  ];

  const getSortIcon = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <ArrowUpDown className="h-4 w-4" />;
    }
    return sortConfig.direction === 'asc' 
      ? <ArrowUp className="h-4 w-4" />
      : <ArrowDown className="h-4 w-4" />;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {headers.map(({ key, label }) => (
              <th
                key={key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => onSort(key as keyof User)}
              >
                <div className="flex items-center gap-2">
                  {label}
                  {getSortIcon(key)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <UserTableRow key={user.Codeium} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
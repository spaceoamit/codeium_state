import React from 'react';
import { User } from '../types/user';
import { ArrowUpDown } from 'lucide-react';

interface UserTableProps {
  users: User[];
  onSort: (key: keyof User) => void;
}

export function UserTable({ users, onSort }: UserTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {Object.keys(users[0] || {}).map((key) => (
              <th
                key={key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => onSort(key as keyof User)}
              >
                <div className="flex items-center gap-2">
                  {key}
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.row_number} className="hover:bg-gray-50">
              {Object.values(user).map((value, index) => (
                <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
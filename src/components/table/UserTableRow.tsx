import React from 'react';
import { User } from '../../types/user';

interface UserTableRowProps {
  user: User;
}

export function UserTableRow({ user }: UserTableRowProps) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {user.row_number}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        <a 
          href={user.Codeium}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:text-indigo-900 hover:underline"
        >
          {user.Name}
        </a>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {user.Percentile}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {user["Total Completions"]}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {user["Streak (6 day record)"]}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {user["Total Languages"]}
      </td>
    </tr>
  );
}
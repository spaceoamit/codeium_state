import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { User } from '../../types/user';

interface CompletionPieChartProps {
  users: User[];
}

export function CompletionPieChart({ users }: CompletionPieChartProps) {
  const completionRanges = users.reduce((acc, user) => {
    const percentile = parseFloat(user.Percentile.replace('%', ''));
    if (percentile >= 90) return { ...acc, '90-100%': acc['90-100%'] + 1 };
    if (percentile >= 75) return { ...acc, '75-89%': acc['75-89%'] + 1 };
    if (percentile >= 50) return { ...acc, '50-74%': acc['50-74%'] + 1 };
    return { ...acc, '<50%': acc['<50%'] + 1 };
  }, {
    '90-100%': 0,
    '75-89%': 0,
    '50-74%': 0,
    '<50%': 0
  });

  const data = Object.entries(completionRanges).map(([name, value]) => ({
    name,
    value
  }));

  const COLORS = ['#4f46e5', '#8b5cf6', '#a855f7', '#d946ef'];

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Completion Distribution</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { User } from '../../types/user';

interface StreakChartProps {
  users: User[];
}

export function StreakChart({ users }: StreakChartProps) {
  const streakData = users
    .map(user => ({
      name: user.Name,
      streak: parseInt(user["Streak (6 day record)"], 10)
    }))
    .sort((a, b) => b.streak - a.streak)
    .slice(0, 5);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Top Streaks</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={streakData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="streak" fill="#d946ef" name="Streak Days" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
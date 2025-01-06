import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { User } from '../../types/user';
import { CompletionPieChart } from './CompletionPieChart';
import { StreakChart } from './StreakChart';

interface PerformanceChartsProps {
  users: User[];
}

export function PerformanceCharts({ users }: PerformanceChartsProps) {
  const topPerformers = users
    .map(user => ({
      name: user.Name,
      percentile: parseFloat(user.Percentile.replace('%', '')),
      totalLanguages: parseInt(user["Total Languages"], 10)
    }))
    .sort((a, b) => b.percentile - a.percentile)
    .slice(0, 5);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Top Performers by Percentile</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topPerformers}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="percentile" fill="#4f46e5" name="Percentile" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Languages Mastered</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topPerformers}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="totalLanguages" fill="#8b5cf6" name="Total Languages" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <CompletionPieChart users={users} />
      <StreakChart users={users} />
    </div>
  );
}
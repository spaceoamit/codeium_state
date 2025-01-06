import { User } from '../types/user';

export function parseNumber(value: string): number {
  return parseInt(value.replace(/,/g, ''), 10);
}

export function getTopPerformers(users: User[], field: 'completions' | 'percentile', limit = 5) {
  return users
    .map(user => ({
      name: user.Name,
      value: field === 'completions' 
        ? parseNumber(user["Total Completions"])
        : parseFloat(user.Percentile.replace('%', ''))
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, limit);
}
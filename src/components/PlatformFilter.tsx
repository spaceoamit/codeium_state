import React from 'react';

type Platform = 'Android' | 'iOS' | 'Web';

interface PlatformFilterProps {
  selectedPlatform: Platform;
  onPlatformChange: (platform: Platform) => void;
}

export function PlatformFilter({ selectedPlatform, onPlatformChange }: PlatformFilterProps) {
  return (
    <select
      value={selectedPlatform}
      onChange={(e) => onPlatformChange(e.target.value as Platform)}
      className="ml-4 px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
    >
      <option value="Android">Android</option>
      <option value="iOS">iOS</option>
      <option value="Web">Web</option>
    </select>
  );
}
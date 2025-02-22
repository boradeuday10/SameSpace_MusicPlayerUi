import React from 'react';
import { Search } from 'lucide-react';

export const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative mb-6">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search Son"
        className="w-full bg-neutral-800 rounded-md py-3 px-4 text-white placeholder-neutral-400 focus:outline-none"
      />
      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
    </div>
  );
};
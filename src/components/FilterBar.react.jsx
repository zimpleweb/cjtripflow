import React, { useState } from 'react';

export default function FilterBar() {
  const [filters, setFilters] = useState({ region: '', type: '' });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    // TODO: Filter tours via API or props
  };

  return (
    <div className="flex gap-4">
      <select name="region" onChange={handleChange} className="p-2 border">
        <option>All Regions</option>
        <option>Douro Valley</option>
        <option>Minho</option>
      </select>
      <select name="type" onChange={handleChange} className="p-2 border">
        <option>All Types</option>
        <option>Wine Tasting</option>
        <option>Heritage Tour</option>
      </select>
    </div>
  );
}
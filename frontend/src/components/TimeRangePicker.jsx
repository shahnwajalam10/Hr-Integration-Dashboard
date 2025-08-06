import React from 'react';

const ranges = [
  { label: 'Last 24 Hours', value: '24h' },
  { label: 'Last 7 Days', value: '7d' },
  { label: 'Last 30 Days', value: '30d' },
  { label: 'Custom', value: 'custom' },
];

const TimeRangePicker = ({ selected, onChange }) => {
  return (
    <div className="flex gap-2 flex-wrap mb-4">
      {ranges.map((range) => (
        <button
          key={range.value}
          className={`px-4 py-1.5 text-sm rounded-md border transition-all duration-200
            ${
              selected === range.value
                ? 'bg-black text-white border-black'
                : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
            }`}
          onClick={() => onChange(range.value)}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
};

export default TimeRangePicker;

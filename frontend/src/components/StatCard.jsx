 const StatCard = ({ title, value, change, icon, color }) => {
  const colors = {
    green: {
      bg: 'bg-green-50',
      text: 'text-green-600',
    },
    red: {
      bg: 'bg-red-50',
      text: 'text-red-600',
    },
    yellow: {
      bg: 'bg-yellow-50',
      text: 'text-yellow-600',
    },
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
    }
  };

  return (
    <div className={`${colors[color].bg} p-6 rounded-xl shadow`}>
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className={`text-3xl font-bold ${colors[color].text} mt-2`}>{value}</p>
        </div>
        <div className="h-10 w-10 rounded-lg flex items-center justify-center bg-white shadow-sm">
          {icon}
        </div>
      </div>
      {change !== undefined && (
        <p className={`text-sm mt-4 ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {change >= 0 ? '↑' : '↓'} {Math.abs(change)}% from previous period
        </p>
      )}
    </div>
  );
};

export default StatCard
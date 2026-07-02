function KpiCard({
  title,
  value,
  icon,
  color,
}) {
  return (
    <div
      className={`bg-white rounded-3xl shadow-md p-6 border-l-8 ${color}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 font-medium">
            {title}
          </p>

          <h2 className="text-5xl font-bold text-gray-800 mt-4">
            {value}
          </h2>
        </div>

        <div className="text-4xl text-gray-500">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default KpiCard;
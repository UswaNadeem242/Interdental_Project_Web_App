import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-lg min-w-[120px]">
        <p className="text-sm font-semibold text-gray-800 mb-1">{`${label}`}</p>
        {payload.map((entry, index) => (
          <div
            key={`item-${index}`}
            className="flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-xs text-gray-600">Earnings</span>
            </div>
            <span className="text-xs font-medium text-gray-800">
              {entry.value >= 1000
                ? `${(entry.value / 1000).toFixed(1)}k`
                : entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function SingleLineChart({
  data,
  dataKey,
  stroke = "#00A5FF",
  strokeWidth = 2,
  height = 200,
  showXAxis = true,
  showYAxis = true,
  showDots = false,
  showGrid = true,
  dotConfig = {
    fill: "#00A5FF",
    strokeWidth: 2,
    r: 3,
  },
}) {
  // Use the data as-is for the chart
  //   const isMobile = useIsMobile();

  return (
    <div className="bg-white w-full h-full">
      <ResponsiveContainer width="100%" height={height}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, left: -10, bottom: 0 }}
        >
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#A556FD" />
              <stop offset="100%" stopColor="#43CEFA" />
            </linearGradient>
          </defs>

          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#f1f5f9"
              horizontal={true}
              vertical={false}
            />
          )}

          {showXAxis && (
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              interval={0}
              tick={{ fontSize: 10, fill: "#64748b" }}
              dy={5}
            />
          )}

          {showYAxis && (
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#64748b" }}
              dx={-5}
              tickFormatter={(value) => `${value}`}
            />
          )}

          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: "rgba(0,0,0,0.1)", strokeWidth: 1 }}
          />

          <Line
            type="monotone"
            dataKey={dataKey}
            stroke="url(#lineGradient)"
            strokeWidth={4}
            dot={showDots ? dotConfig : false}
            activeDot={{
              r: 5,
              fill: "#A556FD",
              stroke: "#fff",
              strokeWidth: 2,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

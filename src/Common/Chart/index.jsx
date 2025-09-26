import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

// Tooltip component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-lg min-w-[140px]">
        <p className="text-sm font-semibold text-gray-800 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div
            key={`item-${index}`}
            className="flex items-center justify-between gap-3 mb-1"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-xs text-gray-600">{entry.name}</span>
            </div>
            <span className="text-xs font-medium text-gray-800">
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// Chart component
export function MultiLineChart({
  data = [],
  lines = [],
  height = 400,
  showGrid = false,
  showLegend = true,
  title = "",
}) {
  return (
    <div
      className="bg-white w-full h-full focus:outline-none focus:ring-0 focus:border-0"
      style={{
        outline: "none",
        border: "none",
        userSelect: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
      }}
      onMouseDown={(e) => e.preventDefault()}
      onClick={(e) => e.preventDefault()}
    >
      {/* Legend at top-right outside the chart */}
      {(title || showLegend) && (
        <div className="flex justify-between items-center mb-2">
          {title && (
            <h3 className="text-sm lg:text-sm   md:text-base font-poppins font-semibold text-[#434343]">
              {title}
            </h3>
          )}
          {showLegend && <ChartLegend lines={lines} />}
        </div>
      )}

      <ResponsiveContainer
        width="100%"
        height={height}
        className="focus:outline-none focus:ring-0 focus:border-0"
        style={{
          outline: "none",
          border: "none",
          userSelect: "none",
          WebkitUserSelect: "none",
          MozUserSelect: "none",
          msUserSelect: "none",
        }}
      >
        <AreaChart
          data={data}
          margin={{ top: 5, right: 10, left: 10, bottom: 10 }}
          style={{
            outline: "none",
            border: "none",
            userSelect: "none",
            WebkitUserSelect: "none",
            MozUserSelect: "none",
            msUserSelect: "none",
          }}
        >
          <style>
            {`
              svg:focus {
                outline: none !important;
                border: none !important;
              }
              svg *:focus {
                outline: none !important;
                border: none !important;
              }
              .recharts-wrapper:focus {
                outline: none !important;
                border: none !important;
              }
              .recharts-wrapper *:focus {
                outline: none !important;
                border: none !important;
              }
            `}
          </style>
          <defs>
            {lines.map((line, index) => (
              <linearGradient
                key={index}
                id={`gradient-${index}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor={line.stroke} stopOpacity={0.3} />
                <stop offset="95%" stopColor={line.stroke} stopOpacity={0.05} />
              </linearGradient>
            ))}
          </defs>

          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#f1f5f9"
              horizontal
              vertical={false}
            />
          )}

          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: "#64748b" }}
            dy={8}
            interval={0}
            minTickGap={0}
            height={40}
          />

          <YAxis axisLine={false} tickLine={false} tick={false} width={0} />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: "rgba(0,0,0,0.1)", strokeWidth: 1 }}
          />

          {lines.map((line, index) => (
            <Area
              key={index}
              type="monotone"
              dataKey={line.dataKey}
              stroke={line.stroke}
              strokeWidth={line.strokeWidth || 2}
              fill={`url(#gradient-${index})`}
              name={line.name}
              dot={false}
              activeDot={{
                r: 4,
                fill: line.stroke,
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// Legend component
export const ChartLegend = ({ lines }) => (
  <div className="flex items-center gap-4 text-sm">
    {lines.map((line, index) => (
      <div key={index} className="flex items-center gap-1.5">
        <div
          className="lg:w-3 lg:h-3 w-2 h-2 rounded-full"
          style={{ backgroundColor: line.stroke }}
        />
        <span className="text-gray-600 lg:text-sm text-xs font-semibold">
          {line.name}
        </span>
      </div>
    ))}
  </div>
);

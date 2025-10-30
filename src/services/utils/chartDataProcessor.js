/**
 * Utility functions to fill missing data points for complete chart ranges
 */

// Helper function to get all months in a year
const getAllMonths = () => {
  return [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
};

// Helper function to get all days of the week
const getAllDaysOfWeek = () => {
  return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
};

// Normalize API day labels (e.g., "Monday" → "Mon", maintain already-short labels)
const normalizeDayLabel = (label) => {
  if (!label) return "";
  const l = String(label).trim();
  const map = {
    Monday: "Mon",
    Tuesday: "Tue",
    Wednesday: "Wed",
    Thursday: "Thu",
    Friday: "Fri",
    Saturday: "Sat",
    Sunday: "Sun",
  };
  return map[l] || l.slice(0, 3);
};

// Helper function to get years range (current year and 3 years before)
const getYearsRange = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 3; i >= 0; i--) {
    years.push((currentYear - i).toString());
  }
  return years;
};

// Helper function to get current week days (last 7 days including today)
const getCurrentWeekDays = () => {
  const today = new Date();
  const days = [];
  const dayNames = getAllDaysOfWeek();

  // Get the last 7 days
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dayName = dayNames[date.getDay() === 0 ? 6 : date.getDay() - 1]; // Convert Sunday=0 to Sunday=6
    days.push(dayName);
  }

  return days;
};

/**
 * Fill missing data points for month view
 * Shows data from January to current month
 */
export const fillMonthData = (apiData) => {
  if (!apiData || !Array.isArray(apiData)) return [];

  const allMonths = getAllMonths();
  const currentMonth = new Date().getMonth(); // 0-11
  const monthsToShow = allMonths.slice(0, currentMonth + 1);

  // Create a map of existing data for quick lookup
  const dataMap = new Map();
  apiData.forEach((item) => {
    dataMap.set(item.label, item);
  });

  // Fill missing months with zero values
  return monthsToShow.map((month) => {
    const existingData = dataMap.get(month);
    return (
      existingData || {
        label: month,
        total: 0,
        completed: 0,
        inProgress: 0,
        pending: 0,
      }
    );
  });
};

/**
 * Fill missing data points for week view
 * Shows data from last 7 days
 */
export const fillWeekData = (apiData) => {
  if (!apiData || !Array.isArray(apiData)) return [];

  const weekDays = getCurrentWeekDays();

  // Create a map of existing data for quick lookup
  const dataMap = new Map();
  apiData.forEach((item) => {
    const key = normalizeDayLabel(item.label);
    dataMap.set(key, { ...item, label: key });
  });

  // Fill missing days with zero values
  return weekDays.map((day) => {
    const existingData = dataMap.get(day);
    return (
      existingData || {
        label: day,
        total: 0,
        completed: 0,
        inProgress: 0,
        pending: 0,
      }
    );
  });
};

/**
 * Fill missing data points for year view
 * Shows data for current year and 3 years before
 */
export const fillYearData = (apiData) => {
  if (!apiData || !Array.isArray(apiData)) return [];

  const yearsRange = getYearsRange();

  // Create a map of existing data for quick lookup
  const dataMap = new Map();
  apiData.forEach((item) => {
    dataMap.set(item.label, item);
  });

  // Fill missing years with zero values
  return yearsRange.map((year) => {
    const existingData = dataMap.get(year);
    return (
      existingData || {
        label: year,
        total: 0,
        completed: 0,
        inProgress: 0,
        pending: 0,
      }
    );
  });
};

/**
 * Main function to process chart data based on time period
 */
export const processChartData = (apiData, timePeriod) => {
  if (!apiData || !Array.isArray(apiData)) return [];

  switch (timePeriod) {
    case "month":
      return fillMonthData(apiData);
    case "week":
      return fillWeekData(apiData);
    case "year":
      return fillYearData(apiData);
    default:
      return apiData;
  }
};

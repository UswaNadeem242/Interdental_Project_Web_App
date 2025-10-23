import { formatDistanceToNow, parseISO } from "date-fns";

/**
 * Formats a timestamp relative to the user's local timezone
 * Handles both timezone-aware and timezone-naive timestamps
 * 
 * @param {string} isoString - ISO timestamp string from backend
 * @returns {string} - Formatted relative time (e.g., "2 hours ago", "3 days ago")
 * 
 * @example
 * // With timezone info
 * formatRelativeTime("2025-10-22T06:44:10.640424Z") // "2 hours ago"
 * 
 * // Without timezone info (assumes UTC)
 * formatRelativeTime("2025-10-22T06:44:10.640424") // "2 hours ago"
 */
export const formatRelativeTime = (isoString) => {
  if (!isoString) return "";
  
  try {
    // Check if the string has timezone information
    const hasTimezone = isoString.includes('Z') || isoString.includes('+') || isoString.includes('-', 10);
    
    let date;
    if (hasTimezone) {
      // Has timezone info, parse normally
      date = parseISO(isoString);
    } else {
      // No timezone info, assume it's UTC and add 'Z' to make it explicit
      const utcString = isoString + 'Z';
      date = parseISO(utcString);
    }
    
    // Calculate the difference and format it
    return formatDistanceToNow(date, { addSuffix: true });
  } catch (error) {
    console.error('Error parsing date:', error);
    // Fallback: try to create date and let JavaScript handle it
    try {
      return formatDistanceToNow(new Date(isoString), { addSuffix: true });
    } catch (fallbackError) {
      console.error('Fallback date parsing also failed:', fallbackError);
      return "Invalid date";
    }
  }
};





export default formatRelativeTime;

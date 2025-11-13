import { formatDistanceToNow, parseISO, format } from "date-fns";

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
  
  // Handle non-string inputs
  if (typeof isoString !== 'string') {
    try {
      return formatDistanceToNow(new Date(isoString), { addSuffix: true });
    } catch (error) {
      console.error('Error parsing non-string date:', error);
      return "Invalid date";
    }
  }
  
  try {
    // Improved timezone detection:
    // - 'Z' at the end means UTC
    // - '+' means positive timezone offset
    // - '-' after position 10 (to skip date separators) means negative timezone offset
    // - Regex check for proper ISO format with timezone: matches patterns like +05:00, -03:30, etc.
    const hasZ = isoString.endsWith('Z');
    const hasPlusTimezone = isoString.includes('+');
    const hasMinusTimezone = isoString.length > 10 && isoString.substring(10).includes('-');
    const hasTimezone = hasZ || hasPlusTimezone || (hasMinusTimezone && /[+-]\d{2}:\d{2}$/.test(isoString));
    
    let date;
    if (hasTimezone) {
      // Has timezone info, parse normally
      date = parseISO(isoString);
    } else {
      // No timezone info, assume it's UTC and add 'Z' to make it explicit
      const utcString = isoString + 'Z';
      date = parseISO(utcString);
    }
    
    // Validate the parsed date
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date after parsing');
    }
    
    // Calculate the difference and format it
    return formatDistanceToNow(date, { addSuffix: true });
  } catch (error) {
    console.error('Error parsing date:', error);
    // Fallback: try to create date and let JavaScript handle it
    try {
      const fallbackDate = new Date(isoString);
      if (isNaN(fallbackDate.getTime())) {
        return "Invalid date";
      }
      return formatDistanceToNow(fallbackDate, { addSuffix: true });
    } catch (fallbackError) {
      console.error('Fallback date parsing also failed:', fallbackError);
      return "Invalid date";
    }
  }
};

/**
 * Formats a timestamp as DD-MM-YYYY
 * Handles both timezone-aware and timezone-naive timestamps
 * 
 * @param {string} isoString - ISO timestamp string from backend
 * @returns {string} - Formatted date (e.g., "01-10-2025")
 * 
 * @example
 * // With timezone info
 * formatDate("2025-10-01T06:44:10.640424Z") // "01-10-2025"
 * 
 * // Without timezone info (assumes UTC)
 * formatDate("2025-10-01T06:44:10.640424") // "01-10-2025"
 */
export const formatDate = (isoString) => {
  if (!isoString) return "-";
  
  // Handle non-string inputs
  if (typeof isoString !== 'string') {
    try {
      return format(new Date(isoString), "dd-MM-yyyy");
    } catch (error) {
      console.error('Error parsing non-string date:', error);
      return "-";
    }
  }
  
  try {
    // Improved timezone detection:
    // - 'Z' at the end means UTC
    // - '+' means positive timezone offset
    // - '-' after position 10 (to skip date separators) means negative timezone offset
    // - Regex check for proper ISO format with timezone: matches patterns like +05:00, -03:30, etc.
    const hasZ = isoString.endsWith('Z');
    const hasPlusTimezone = isoString.includes('+');
    const hasMinusTimezone = isoString.length > 10 && isoString.substring(10).includes('-');
    const hasTimezone = hasZ || hasPlusTimezone || (hasMinusTimezone && /[+-]\d{2}:\d{2}$/.test(isoString));
    
    let date;
    if (hasTimezone) {
      // Has timezone info, parse normally
      date = parseISO(isoString);
    } else {
      // No timezone info, assume it's UTC and add 'Z' to make it explicit
      const utcString = isoString + 'Z';
      date = parseISO(utcString);
    }
    
    // Validate the parsed date
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date after parsing');
    }
    
    // Format as DD-MM-YYYY
    return format(date, "dd-MM-yyyy");
  } catch (error) {
    console.error('Error parsing date:', error);
    // Fallback: try to create date and let JavaScript handle it
    try {
      const fallbackDate = new Date(isoString);
      if (isNaN(fallbackDate.getTime())) {
        return "-";
      }
      return format(fallbackDate, "dd-MM-yyyy");
    } catch (fallbackError) {
      console.error('Fallback date parsing also failed:', fallbackError);
      return "-";
    }
  }
};

export default formatRelativeTime;

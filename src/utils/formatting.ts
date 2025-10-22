/**
 * Format a number as currency
 * @param value The number to format
 * @param locale The locale to use for formatting (default: 'en-US')
 * @param currency The currency code (default: 'USD')
 * @returns The formatted currency string
 */
export const formatCurrency = (
  value: number,
  locale = 'en-US',
  currency = 'USD',
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);
};

/**
 * Format a number with commas for thousands
 * @param value The number to format
 * @param locale The locale to use for formatting (default: 'en-US')
 * @returns The formatted number string
 */
export const formatNumber = (value: number, locale = 'en-US'): string => {
  return new Intl.NumberFormat(locale).format(value);
};

/**
 * Format a date to a string
 * @param date The date to format
 * @param locale The locale to use for formatting (default: 'en-US')
 * @param options The date formatting options (default: day, month, year)
 * @returns The formatted date string
 */
export const formatDate = (
  date: Date | string | number,
  locale = 'en-US',
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  },
): string => {
  const dateObj =
    typeof date === 'string' || typeof date === 'number'
      ? new Date(date)
      : date;
  return new Intl.DateTimeFormat(locale, options).format(dateObj);
};

/**
 * Format a date to a time string
 * @param date The date to format
 * @param locale The locale to use for formatting (default: 'en-US')
 * @param options The time formatting options (default: hour, minute)
 * @returns The formatted time string
 */
export const formatTime = (
  date: Date | string | number,
  locale = 'en-US',
  options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
  },
): string => {
  const dateObj =
    typeof date === 'string' || typeof date === 'number'
      ? new Date(date)
      : date;
  return new Intl.DateTimeFormat(locale, options).format(dateObj);
};

/**
 * Truncate a string to a maximum length with ellipsis
 * @param text The text to truncate
 * @param maxLength The maximum length
 * @returns The truncated text
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '...';
};

/**
 * Format a phone number to a standard format
 * @param phoneNumber The phone number to format (e.g., '1234567890')
 * @param format The format to use (default: '(XXX) XXX-XXXX')
 * @returns The formatted phone number
 */
export const formatPhoneNumber = (
  phoneNumber: string,
  format = '(XXX) XXX-XXXX',
): string => {
  let formatted = format;
  const digits = phoneNumber.replace(/\D/g, '');

  for (let i = 0; i < digits.length; i++) {
    formatted = formatted.replace('X', digits[i]);
  }

  // Remove any remaining X's
  formatted = formatted.replace(/X/g, '');
  return formatted;
};

/**
 * Capitalize the first letter of a string
 * @param text The text to capitalize
 * @returns The capitalized text
 */
export const capitalizeFirstLetter = (text: string): string => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
};

/**
 * Convert a string to title case
 * @param text The text to convert
 * @returns The title-cased text
 */
export const toTitleCase = (text: string): string => {
  if (!text) return '';
  return text
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Format a file size in bytes to a human-readable string
 * @param bytes The file size in bytes
 * @param decimals The number of decimal places (default: 2)
 * @returns The formatted file size
 */
export const formatFileSize = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

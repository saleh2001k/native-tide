/**
 * Email validation regex pattern
 */
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * URL validation regex pattern
 */
const URL_REGEX =
  /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;

/**
 * Phone number validation regex (international format)
 * Accepts formats like: +1234567890, 1234567890, 123-456-7890
 */
const PHONE_REGEX =
  /^(\+?\d{1,4})?[-.\s]?(\(?\d{1,3}\)?[-.\s]?)?(\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9})$/;

/**
 * Strong password regex
 * At least 8 characters, one uppercase, one lowercase, one number, one special character
 */
const STRONG_PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

/**
 * Validate if a string is a valid email address
 * @param email The email to validate
 * @returns True if the email is valid, false otherwise
 */
export const isValidEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

/**
 * Validate if a string is a valid URL
 * @param url The URL to validate
 * @returns True if the URL is valid, false otherwise
 */
export const isValidUrl = (url: string): boolean => {
  return URL_REGEX.test(url);
};

/**
 * Validate if a string is a valid phone number
 * @param phone The phone number to validate
 * @returns True if the phone number is valid, false otherwise
 */
export const isValidPhone = (phone: string): boolean => {
  return PHONE_REGEX.test(phone);
};

/**
 * Validate if a string is a strong password
 * @param password The password to validate
 * @returns True if the password is strong, false otherwise
 */
export const isStrongPassword = (password: string): boolean => {
  return STRONG_PASSWORD_REGEX.test(password);
};

/**
 * Validate if a value is a valid number
 * @param value The value to validate
 * @returns True if the value is a valid number, false otherwise
 */
export const isNumber = (value: string): boolean => {
  if (typeof value !== 'string') return false;
  return !isNaN(parseFloat(value)) && isFinite(parseFloat(value));
};

/**
 * Check if a string is empty or only contains whitespace
 * @param value The string to check
 * @returns True if the string is empty or contains only whitespace, false otherwise
 */
export const isEmpty = (value: string | null | undefined): boolean => {
  return value === null || value === undefined || value.trim() === '';
};

/**
 * Validates if a string has a minimum length
 * @param value The string to validate
 * @param minLength The minimum length required
 * @returns True if the string is at least minLength characters long, false otherwise
 */
export const hasMinLength = (value: string, minLength: number): boolean => {
  return value.length >= minLength;
};

/**
 * Validates if a string does not exceed a maximum length
 * @param value The string to validate
 * @param maxLength The maximum length allowed
 * @returns True if the string is at most maxLength characters long, false otherwise
 */
export const hasMaxLength = (value: string, maxLength: number): boolean => {
  return value.length <= maxLength;
};

/**
 * Validate that a string is a valid date format (YYYY-MM-DD)
 * @param dateString The date string to validate
 * @returns True if the date string is valid, false otherwise
 */
export const isValidDateString = (dateString: string): boolean => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;

  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
};

/**
 * Create a custom validator function that combines multiple validation rules
 * @param validators An array of validator functions
 * @returns A function that returns true if all validators pass, false otherwise
 */
export const createValidator = (
  validators: Array<(value: string) => boolean>,
): ((value: string) => boolean) => {
  return (value: string) => validators.every((validator) => validator(value));
};

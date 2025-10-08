export interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeNumbers: boolean;
  includeSpecialChars: boolean;
}

export const generatePassword = (options: PasswordOptions): string => {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const specialChars = '!@#$%^&*()_-+=|;:"<>.?/';

  let chars = lowercase;
  if (options.includeUppercase) chars += uppercase;
  if (options.includeNumbers) chars += numbers;
  if (options.includeSpecialChars) chars += specialChars;

  let password = '';
  for (let i = 0; i < options.length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }

  return password;
};
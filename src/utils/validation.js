// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone number validation regex (basic international format)
const phoneRegex = /^[+]?[\d\s\-\(\)]{10,}$/;

// Password validation (at least 8 characters, contain at least one letter and one number)
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

// Username validation (3-20 characters, alphanumeric and underscore)
const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

export const validateRegistration = (data) => {
  const errors = {};

  // First name validation
  if (!data.firstName?.trim()) {
    errors.firstName = 'First name is required';
  } else if (data.firstName.trim().length < 2) {
    errors.firstName = 'First name must be at least 2 characters';
  } else if (data.firstName.trim().length > 50) {
    errors.firstName = 'First name must be less than 50 characters';
  }

  // Last name validation
  if (!data.lastName?.trim()) {
    errors.lastName = 'Last name is required';
  } else if (data.lastName.trim().length < 2) {
    errors.lastName = 'Last name must be at least 2 characters';
  } else if (data.lastName.trim().length > 50) {
    errors.lastName = 'Last name must be less than 50 characters';
  }

  // Username validation
  if (!data.username?.trim()) {
    errors.username = 'Username is required';
  } else if (!usernameRegex.test(data.username.trim())) {
    errors.username = 'Username must be 3-20 characters and contain only letters, numbers, and underscores';
  }

  // Phone number validation
  if (!data.phNum?.trim()) {
    errors.phNum = 'Phone number is required';
  } else if (!phoneRegex.test(data.phNum.trim())) {
    errors.phNum = 'Please enter a valid phone number';
  }

  // Email validation
  if (!data.mail?.trim()) {
    errors.mail = 'Email is required';
  } else if (!emailRegex.test(data.mail.trim())) {
    errors.mail = 'Please enter a valid email address';
  }

  // Password validation
  if (!data.password) {
    errors.password = 'Password is required';
  } else if (!passwordRegex.test(data.password)) {
    errors.password = 'Password must be at least 8 characters with at least one letter and one number';
  }

  return errors;
};

export const validateLogin = (data) => {
  const errors = {};

  // Identifier validation (username or email)
  if (!data.identifier?.trim()) {
    errors.identifier = 'Email or username is required';
  } else if (data.identifier.trim().length < 3) {
    errors.identifier = 'Please enter a valid email or username';
  }

  // Password validation
  if (!data.password) {
    errors.password = 'Password is required';
  } else if (data.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return errors;
};

export const validateEmail = (email) => {
  if (!email?.trim()) {
    return 'Email is required';
  }
  if (!emailRegex.test(email.trim())) {
    return 'Please enter a valid email address';
  }
  return null;
};

export const validatePassword = (password) => {
  if (!password) {
    return 'Password is required';
  }
  if (!passwordRegex.test(password)) {
    return 'Password must be at least 8 characters with at least one letter and one number';
  }
  return null;
};

export const validatePasswordMatch = (password, confirmPassword) => {
  if (!confirmPassword) {
    return 'Please confirm your password';
  }
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  return null;
};
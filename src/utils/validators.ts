interface PasswordValidationErrors {
    password?: string;
    confirmPassword?: string;
  }
  
function passwordValidator(
    password: string,
    confirmPassword: string
  ): PasswordValidationErrors {
    const errors: PasswordValidationErrors = {};
  
    if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
    }
  
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }
      
    return errors;
  }
  
  export { passwordValidator }
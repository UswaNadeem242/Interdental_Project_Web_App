import * as Yup from "yup";

// Contact Form Validation Schema
export const contactValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .max(25, "First name must not exceed 25 characters")
    .matches(/^[a-zA-Z\s]+$/, "First name must contain only letters and spaces")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .max(25, "Last name must not exceed 25 characters")
    .matches(/^[a-zA-Z\s]+$/, "Last name must contain only letters and spaces")
    .required("Last name is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  description: Yup.string()
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message must not exceed 500 characters")
    .required("Message is required"),
});

// Login Form Validation Schema
export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

// Buyer Signup Validation Schema
export const buyerSignupValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .max(25, "First name must not exceed 25 characters")
    .matches(/^[a-zA-Z\s]+$/, "First name must contain only letters and spaces")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .max(25, "Last name must not exceed 25 characters")
    .matches(/^[a-zA-Z\s]+$/, "Last name must contain only letters and spaces")
    .required("Last name is required"),
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{7,15}$/, "Phone number must be 7-15 digits")
    .required("Phone number is required"),
  address: Yup.string()
    .min(10, "Address must be at least 10 characters")
    .required("Address is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password must not exceed 16 characters")
    .test(
      "password-requirements",
      "Must contain uppercase, lowercase, number, and special character",
      function (value) {
        if (!value) return false;
        const hasLower = /[a-z]/.test(value);
        const hasUpper = /[A-Z]/.test(value);
        const hasNumber = /\d/.test(value);
        const hasSpecial = /[!@#$%^&*()-_=+[\]{};:'",<.>/?\\|`~]/.test(
          value
        );
        return hasLower && hasUpper && hasNumber && hasSpecial;
      }
    )
    .test(
      "special-char-limit",
      "Maximum 8 special characters allowed",
      function (value) {
        if (!value) return true;
        const specialCharCount = (
          value.match(/[!@#$%^&*()-_=+[\]{};:'",<.>/?\\|`~]/g) || []
        ).length;
        return specialCharCount <= 8;
      }
    ),
});

// Doctor Signup Validation Schema
export const doctorSignupValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .max(25, "First name must not exceed 25 characters")
    .matches(/^[a-zA-Z\s]+$/, "First name must contain only letters and spaces")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .max(25, "Last name must not exceed 25 characters")
    .matches(/^[a-zA-Z\s]+$/, "Last name must contain only letters and spaces")
    .required("Last name is required"),
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{7,15}$/, "Phone number must be 7-15 digits")
    .required("Phone number is required"),
  address: Yup.string()
    .min(10, "Address must be at least 10 characters")
    .required("Address is required"),
  city: Yup.string()
    .min(2, "City must be at least 2 characters")
    .max(25, "City must not exceed 25 characters")
    .matches(/^[a-zA-Z\s]+$/, "City must contain only letters and spaces")
    .required("City is required"),
  zip: Yup.string()
    .matches(/^\d{5,9}$/, "ZIP code must be 5-9 digits")
    .required("Zip code is required"),
  drLicenseNo: Yup.string()
    .required("Doctor's License Number is required")
    .min(5, "Must be at least 5 characters")
    .max(15, "Must not exceed 15 characters")
    .matches(
      /^[A-Z]+-[0-9]+$/,
      "Format: LETTERS-hyphen-numbers (e.g., PMC-12345)"
    ),
  officeRefNo: Yup.string()
    .required("Office Reference Number is required")
    .min(6, "Must be at least 6 characters")
    .max(15, "Must not exceed 15 characters")
    .matches(
      /^[A-Z0-9_-]+$/,
      "Only letters, numbers, hyphens, and underscores allowed"
    )
    .test(
      "different-from-license",
      "Cannot be same as License Number",
      function (value) {
        const licenseValue = this.parent.drLicenseNo;
        if (!value || !licenseValue) return true;
        return value !== licenseValue;
      }
    ),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password must not exceed 16 characters")
    .test(
      "password-requirements",
      "Must contain uppercase, lowercase, number, and special character",
      function (value) {
        if (!value) return false;
        const hasLower = /[a-z]/.test(value);
        const hasUpper = /[A-Z]/.test(value);
        const hasNumber = /\d/.test(value);
        const hasSpecial = /[!@#$%^&*()-_=+[\]{};:'",<.>/?\\|`~]/.test(
          value
        );
        return hasLower && hasUpper && hasNumber && hasSpecial;
      }
    )
    .test(
      "special-char-limit",
      "Maximum 8 special characters allowed",
      function (value) {
        if (!value) return true;
        const specialCharCount = (
          value.match(/[!@#$%^&*()-_=+[\]{};:'",<.>/?\\|`~]/g) || []
        ).length;
        return specialCharCount <= 8;
      }
    ),
});

// Profile Modal Validation Schema
export const profileValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .max(25, "First name must not exceed 25 characters")
    .matches(/^[a-zA-Z\s]+$/, "First name must contain only letters and spaces")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .max(25, "Last name must not exceed 25 characters")
    .matches(/^[a-zA-Z\s]+$/, "Last name must contain only letters and spaces")
    .required("Last name is required"),
  phone: Yup.string()
    .matches(/^[0-9]{7,15}$/, "Phone number must be 7-15 digits")
    .required("Phone number is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
});

// Change Password Validation Schema
export const changePasswordValidationSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Current password is required"),
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password must not exceed 16 characters")
    .test(
      "password-requirements",
      "Must contain uppercase, lowercase, number, and special character",
      function (value) {
        if (!value) return true;

        const hasUppercase = /[A-Z]/.test(value);
        const hasLowercase = /[a-z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};:'"\\,.<>/?~`]/.test(
          value
        );
        const specialCharCount = (
          value.match(/[!@#$%^&*()_+\-=[\]{};:'"\\,.<>/?~`]/g) || []
        ).length;

        if (!hasUppercase || !hasLowercase || !hasNumber || !hasSpecialChar) {
          return this.createError({
            message:
              "Must contain uppercase, lowercase, number, and special character",
          });
        }

        if (specialCharCount > 8) {
          return this.createError({
            message: "Maximum 8 special characters allowed",
          });
        }

        return true;
      }
    )
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
});

// Shopping Cart Modal Validation Schema
export const shoppingCartValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Full Name must be at least 2 characters")
    .matches(/^[a-zA-Z\s]+$/, "Full Name must contain only letters and spaces")
    .required("Full Name is required"),
  phone: Yup.string()
    .min(7, "Phone number must be at least 7 digits")
    .max(15, "Phone number must not exceed 15 digits")
    .matches(/^[0-9]{7,15}$/i, "Phone number must contain only digits (7–15)")
    .required("Phone number is required"),
  country: Yup.string().required("Country is required"),
  state: Yup.string()
    .min(3, "State/Province must be at least 3 characters")
    .matches(/^[a-zA-Z\s]+$/, "State/Province must contain only letters")
    .required("State/Province is required"),
  city: Yup.string()
    .min(2, "City must be at least 2 characters")
    .matches(/^[a-zA-Z\s\-'.]+$/, "City contains invalid characters")
    .required("City is required"),
  street: Yup.string()
    .min(5, "Street address must be at least 5 characters")
    .matches(
      /^[a-zA-Z0-9\s#.,'-]+$/,
      "Street address can contain letters, numbers, spaces, and # . , ' -"
    )
    .required("Street Address is required"),
  recipientName: Yup.string()
    .min(2, "Recipient's Name must be at least 2 characters")
    .matches(
      /^[a-zA-Z\s]+$/,
      "Recipient's Name must contain only letters and spaces"
    )
    .required("Recipient's Name is required"),
  paypalUsername: Yup.string()
    .min(3, "PayPal Username must be at least 3 characters")
    .required("PayPal Username is required"),
  paypalContact: Yup.string()
    .test(
      "email-or-phone",
      "Please enter a valid email or phone number (7-15 digits)",
      function (value) {
        if (!value) return false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{7,15}$/;
        return emailRegex.test(value) || phoneRegex.test(value);
      }
    )
    .required("PayPal Email/Phone is required"),
});

// Doctor Profile Completion Validation Schema
export const doctorProfileCompletionSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(/^[0-9]{7,15}$/, "Phone number must be 7-15 digits")
    .required("Phone number is required"),
  address: Yup.string()
    .min(10, "Address must be at least 10 characters")
    .required("Address is required"),
  drLicenseNo: Yup.string()
    .required("Doctor's License Number is required")
    .min(5, "Must be at least 5 characters")
    .max(15, "Must not exceed 15 characters")
    .matches(
      /^[A-Z]+-[0-9]+$/,
      "Format: LETTERS-hyphen-numbers (e.g., PMC-12345)"
    ),
  officeRefNo: Yup.string()
    .required("Office Reference Number is required")
    .min(6, "Must be at least 6 characters")
    .max(15, "Must not exceed 15 characters")
    .matches(
      /^[A-Z0-9_-]+$/,
      "Only letters, numbers, hyphens, and underscores allowed"
    )
    .test(
      "different-from-license",
      "Cannot be same as License Number",
      function (value) {
        const licenseValue = this.parent.drLicenseNo;
        if (!value || !licenseValue) return true;
        return value !== licenseValue;
      }
    ),
});

// Checkout Form Validation Schema
export const checkoutValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Full Name must be at least 2 characters")
    .matches(/^[a-zA-Z\s]+$/, "Full Name must contain only letters and spaces")
    .required("Full Name is required"),
  phone: Yup.string()
    .min(7, "Phone number must be at least 7 digits")
    .max(15, "Phone number must not exceed 15 digits")
    .matches(/^[0-9]{7,15}$/i, "Phone number must contain only digits (7–15)")
    .required("Phone number is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  country: Yup.string().required("Country is required"),
  state: Yup.string()
    .min(3, "State/Province must be at least 3 characters")
    .matches(/^[a-zA-Z\s]+$/, "State/Province must contain only letters")
    .required("State/Province is required"),
  city: Yup.string()
    .min(2, "City must be at least 2 characters")
    .matches(/^[a-zA-Z\s\-'.]+$/, "City contains invalid characters")
    .required("City is required"),
  street: Yup.string()
    .min(5, "Street address must be at least 5 characters")
    .matches(
      /^[a-zA-Z0-9\s#.,'-]+$/,
      "Street address can contain letters, numbers, spaces, and # . , ' -"
    )
    .required("Street Address is required"),
  recipientName: Yup.string()
    .min(2, "Recipient's Name must be at least 2 characters")
    .matches(
      /^[a-zA-Z\s]+$/,
      "Recipient's Name must contain only letters and spaces"
    )
    .required("Recipient's Name is required"),
  paypalUsername: Yup.string()
    .min(3, "PayPal Username must be at least 3 characters")
    .required("PayPal Username is required"),
  paypalEmailPhone: Yup.string()
    .test(
      "email-or-phone",
      "Please enter a valid email or phone number (11-15 digits)",
      function (value) {
        if (!value) return false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{11,15}$/;
        return emailRegex.test(value) || phoneRegex.test(value);
      }
    )
    .required("PayPal Email/Phone is required"),
});

const validationSchemas = {
  contactValidationSchema,
  loginValidationSchema,
  buyerSignupValidationSchema,
  doctorSignupValidationSchema,
  profileValidationSchema,
  changePasswordValidationSchema,
  shoppingCartValidationSchema,
  doctorProfileCompletionSchema,
  checkoutValidationSchema,
};

export default validationSchemas;

import validator from 'validator';

export const inputRegisterForm = (data: Registration) => {
    const errors = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        dob: '',
        confirmLicense: '',
    };
    if (!data.firstName) {
        errors.firstName = 'is required';
    }
    if (!data.lastName) {
        errors.lastName = 'is required';
    }
    if (!data.email) {
        errors.email = 'is required';
    } else if (!validator.isEmail(data.email)) {
        errors.email = 'is invalid';
    }
    if (!data.password) {
        errors.password = 'is required';
    }
    if (!data.confirmPassword) {
        errors.confirmPassword = 'is required';
    }
    if (!data.dob) {
        errors.dob = 'is required';
    }
    if (!data.confirmLicense) {
        errors.confirmLicense = 'is required';
    }
    if (data.password && data.password.length < 6) {
        errors.password = 'should contain at least 6 characters';
    } else if (data.confirmPassword && data.confirmPassword.length < 6) {
        errors.confirmPassword = 'should contain at least 6 characters';
    } else if (data.password !== data.confirmPassword) {
        errors.confirmPassword = "and Password * doesn't match";
    }

    return {
        errors,
        isInvalid: Object.values(errors).some((err) => err),
    };
};

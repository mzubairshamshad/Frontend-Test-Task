import {array, boolean, number, object, ref, string} from 'yup';
// import * as yup from "yup"

export const useFormValidation = () => {

    const formValidationSchema = object({
        first_name: string()
            .required('You need to enter a first name.')
            .min(3, 'First Name must be at least 3 characters.')
            .max(32, 'First Name must not exceed 32 characters.')
            .matches(
            /^[a-zA-Z0-9]*$/,
            `Spaces and special characters are not allowed`,
        ),
        last_name: string()
            .required('You need to enter a last name.')
            .min(3, 'Last Name must be at least 3 characters.')
            .max(15, 'Last Name must not exceed 15 characters.')
            .matches(
                /^[a-zA-Z0-9]*$/,
                `Spaces and special characters are not allowed`,
            ),
    });

    return {
        formValidationSchema,
    };
};
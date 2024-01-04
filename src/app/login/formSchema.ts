import * as Yup from 'yup';

export interface LoginFormProps {
    name?: string;
    email: string;
    password: string;
    passwordConfirm?: string;
};

export const formSchema: LoginFormProps = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
};

export const formValidationSchema = Yup.object().shape({
    email: Yup.string().trim().required('E-mail is required!').email('Invalid E-mail!'),
    password: Yup.string().required('Password is required!').min(8, 'Password must have at least 8 characters!'),
    passwordConfirm: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match!')
});

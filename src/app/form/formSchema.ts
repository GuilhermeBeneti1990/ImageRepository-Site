import * as Yup from 'yup';

export interface FormProps {
    name: string;
    tags: string;
    file: string | Blob;
};

export const formSchema: FormProps = {
    name: '',
    tags: '',
    file: ''
};

export const formValidationSchema = Yup.object().shape({
    name: Yup.string().trim().required('Name is required!').max(50, 'Name has the limit of 50 characters!'),
    tags: Yup.string().trim().required('Tags is required!').max(50, 'Tags has the limit of 50 characters!'),
    file: Yup.mixed<Blob>().required('Select an image to upload!').test('size', 'File size cannot be higher than 4MB!', (file) => {
        return file.size < 4000000;
    })
    .test('type', 'Accepted formats: jpeg, gif, or png', (file) => {
        return file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
    })
});

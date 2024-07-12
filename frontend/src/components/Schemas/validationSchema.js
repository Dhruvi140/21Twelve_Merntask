import * as Yup from 'yup';

const shopValidationSchema = Yup.object().shape({
    name: Yup.string().required('Shop name is required'),
    owner: Yup.string().required('Owner name is required'),
    phone: Yup.string()
        .matches(/^[0-9]+$/, 'Phone number must be only digits')
        .required('Phone number is required'),
    GSTNo: Yup.string().required('GST number is required'),
    address: Yup.string().required('Address is required'),
});

const productValidationSchema = Yup.object().shape({
    productname: Yup.string().required('Product name is required'),
    price: Yup.number().required('Price is required').positive('Price must be a positive number'),
    description: Yup.string().required('Description is required'),
});

export { shopValidationSchema, productValidationSchema };

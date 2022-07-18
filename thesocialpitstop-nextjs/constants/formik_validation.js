import * as Yup from 'yup';

export const YupEmailValidation = Yup.string().email('Invalid email').required('Required');
import { Button, TextField } from "@mui/material";
import { Formik } from "formik";

const RegisterPage = () => {
    return (
        <>
            <h1>Registration!</h1>
            <Formik
                initialValues={{ email: '', password: '' }}
                validate={values => {
                const errors = {};
                if (!values.email) {
                    errors.email = 'Required';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = 'Invalid email address';
                }
                return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting
                }) => (
                    <form onSubmit={handleSubmit}>
                        <TextField
                            required
                            id="standard-required"
                            label="Email"
                            variant="standard"
                            type="email"
                            name="email"
                        />
                        <Button 
                            variant="contained" 
                            type="submit" 
                            disable={isSubmitting}
                            >
                                Submit
                        </Button>
                    </form>
                )}

            </Formik>
        </>
    );
}

export default RegisterPage;
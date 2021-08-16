import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import {
    Col,
    Row,
    Container,
} from 'reactstrap';
import APIURL from '../helpers/environment';

const RegisterSchema = Yup.object().shape({ //yup schema used for field validation. Each property will handle validation corresponding to the Textfield
    username: Yup.string()
        .min(4, 'Username is too short: Min 4 characters.')
        .max(20, 'Username is too long: Max 20 characters.')
        .matches(/^(?=.\S+$)(?=.*[@#$%^!*&()+=_-]).*$/, 'Username requires at least one special character.')
        .required('Required'),
    password: Yup.string()
        .min(5, 'Password is too short: Min 5 characters.')
        .max(20, 'Password is too long: Max 20 characters.')
        .required('Required'),
    passwordConfirmation: Yup.string()
        .test('passwords-match', 'Passwords must match', function (value) {
            return this.parent.password === value
        })
});

const Register = (props) => { //we pass in props to access other functions from parent component
    const formik = useFormik({//uses formik library that will handle form validation(this case, formik is a prop)
        initialValues: {//initiates initial values for username, password, and passwordConfirmation
            username: '',
            password: '',
            passwordConfirmation: '',
        },
        validationSchema: RegisterSchema, //links yup schema to formik
        onSubmit: (e) => { //handles the fetch post request to register a user on form submit
            fetch(`${APIURL}user/register`, {
                method: 'POST',
                body: JSON.stringify({
                    user: {
                        username: e.username,
                        password: e.password,
                        image: "place holder", //a string of placeholder is used to pass image and userBio property upon sign up
                        userBio: "place holder"
                    }
                }),
                headers: new Headers({
                    'Content-type': 'application/json',
                })
            }).then((response) => response.json()
            ).then((data) => {
                props.updatetoken(data.sessionToken)
            })
        },
    });

    return (
        <Container className='mainDiv'>
            <Row id='registerWrapper'>
                <Col>
                    <h1>Sign Up</h1>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField //validates each TextField information using the formik and yup library
                            fullWidth
                            id="username"
                            name="username"
                            label="Username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            error={formik.touched.username}
                            helperText={formik.touched.username && formik.errors.username}
                        />
                        <TextField
                            fullWidth
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                        <TextField
                            fullWidth
                            id="passwordConfirmation"
                            name="passwordConfirmation"
                            label="Confirm Password"
                            type="password"
                            value={formik.values.passwordConfirmation}
                            onChange={formik.handleChange}
                            error={formik.touched.passwordConfirmation}
                            helperText={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
                        />
                        <Button type="submit" className='registerButton'> Submit </Button>
                    </form>
                    <div>
                        <p>Already have an account? <Link className='authLink' to='#' onClick={(e) => props.handleChange(e, 0)}>Login</Link></p> {/* handleChange allows us to switch between login and signup tabs by utilizing the event and index # */}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;

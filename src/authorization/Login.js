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

const RegisterSchema = Yup.object().shape({ //yup schema used for field validation
    username: Yup.string()
        .required('Required'),
    password: Yup.string()
        .required('Required'),
});

const Login = (props) => {
    const formik = useFormik({  //uses formik library that will handle form validation
        initialValues: { //initiates initial values for username and password
            username: '',
            password: '',
        },
        validationSchema: RegisterSchema, //links yups schema to formik
        onSubmit: (e) => { //fetches user info from our server
            fetch(`https://cb-movie-reviews-server.herokuapp.com/user/login`, {
                method: 'POST',
                body: JSON.stringify({
                    user: {
                        username: e.username,
                        password: e.password,
                    }
                }),
                headers: new Headers({
                    'Content-type': 'application/json',
                })
            }).then((response) => response.json()//jsonify the data
            ).then((data) => {
                console.log(data)
                props.updatetoken(data.sessionToken) //we use updatetoken function within the Auth.js file. We use props to access it.
            })
        },
    });

    return (
        <Container className='mainDiv'>
            <Row id='loginWrapper'>
                <Col>
                    <h1>Sign In</h1>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
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
                        <Button type="submit" className='loginButton'> Submit </Button>
                    </form>
                    <div>
                        <p>Don't have an account? <Link className='authLink' to='#' onClick={(e) => props.handleChange(e, 1)}>Sign Up</Link></p> {/* handleChange allows us to switch between login and signup tabs by utilizing the event and index # */}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
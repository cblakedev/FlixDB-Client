// import React, {
//     useState, useEffect
// } from 'react';

// import '../App.css';
// import { Link } from 'react-router-dom';
// import { Formik, Form, Field } from 'formik';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';



// const Register = (props) => {
//     // const [username, setUsername] = useState('');
//     // const [password, setPassword] = useState('');


// const submitRegister = (e) => {
//     e.preventDefault();

//     fetch(`http://localhost:5000/user/register`, {
//         method: 'POST',
//         body: JSON.stringify({
//             user: {
//                 username: username,
//                 password: password
//             }
//         }),
//         headers: new Headers({
//             'Content-type': 'application/json',
//         })
//     }).then((response) => response.json()
//     ).then((data) => {
//         console.log(data)
//         props.updatetoken(data)
//     })
// }

// const RegisterSchema = Yup.object().shape({
//     username: Yup.string()
//         .min(4, 'Username is too short: Min 4 characters.')
//         .max(15, 'Username is too long: Max 15 characters.')
//         .matches(/^(?=.\S+$)(?=.*[@#$%^!*&()+=_-]).*$/, 'Username requires at least one special character.')
//         .required('Required'),
//     password: Yup.string()
//         .min(2, 'Password is too short: Min 5 characters.')
//         .max(15, 'Password is too long: Max 15 characters.')
//         .required('Required'),
// });

//     const formik = useFormik({
//         initialValues: {
//             username: '',
//             password: '',
//         },
//         validationSchema: RegisterSchema,
//         onSubmit: (e) => {
//             console.log(e.username, e.password)
//         },
//     });

//     return (
//         <Container className='mainDiv'>
//             <Row id='registerWrapper'>
//                 <Col>
//                     <h1>Sign Up</h1>
//                     <Form onSubmit={formik.handleSubmit}>
//                         <FormGroup className='userFormGroup'>
//                             <Field name='username' placeholder='Username' id='username' value={formik.values.username} onChange={formik.handleChange} error={formik.touched.email && Boolean(formik.errors.username)} helperText={formik.touched.username && formik.errors.username} />
//                         </FormGroup>
//                         <FormGroup className='passFormGroup'>
//                             <Field name='password' type='password' placeholder='Password' id='password' value={formik.values.password} onChange={formik.handleChange} error={formik.touched.password && Boolean(formik.errors.password)} helperText={formik.touched.password && formik.errors.password} />
//                         </FormGroup>
//                         <Button className='registerButton' type='submit'>REGISTER</Button>
//                     </Form>
//                     {/* <div>
//                         <p>Already have an account? <Link className='authLink' to='#' onClick={(e) => props.handleChange(e, 0)}>Sign In</Link></p>
//                     </div> */}
//                 </Col>
//             </Row>
//         </Container>
//     )
// }

// export default Register;

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

const RegisterSchema = Yup.object().shape({
    username: Yup.string()
        .min(4, 'Username is too short: Min 4 characters.')
        .max(15, 'Username is too long: Max 15 characters.')
        .matches(/^(?=.\S+$)(?=.*[@#$%^!*&()+=_-]).*$/, 'Username requires at least one special character.')
        .required('Required'),
    password: Yup.string()
        .min(2, 'Password is too short: Min 5 characters.')
        .max(15, 'Password is too long: Max 15 characters.')
        .required('Required'),
});

const Register = (props) => {
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: RegisterSchema,
        onSubmit: (e) => {
            fetch(`http://localhost:5000/user/register`, {
                method: 'POST',
                body: JSON.stringify({
                    user: {
                        username: e.username,
                        password: e.password
                    }
                }),
                headers: new Headers({
                    'Content-type': 'application/json',
                })
            }).then((response) => response.json()
            ).then((data) => {
                console.log(data)
                props.updatetoken(data)
            })
        },
    });

    return (
        <Container className='mainDiv'>
            <Row id='loginWrapper'>
                <Col>
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
                        <Button type="submit"> Submit </Button>
                    </form>
                    <div>
                        <p>Already have an account? <Link className='authLink' to='#' onClick={(e) => props.handleChange(e, 0)}>Login</Link></p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
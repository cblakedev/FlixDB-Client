import React, {
    useState, useEffect
} from 'react';
import {
    Col,
    Row,
    Container,
    Form,
    Label,
    Input,
    Button,
    FormGroup,
} from 'reactstrap';
import Register from './Register';
import { Route, Link, Switch } from 'react-router-dom';



const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submitLogin = (e) => {
        e.preventDefault();

        fetch(`http://localhost:5000/user/login`, {
            method: 'POST',
            body: JSON.stringify({
                user: {
                    username: username,
                    password: password
                }
            }),
            headers: new Headers({
                'Content-type': 'application/json',
            })
        }).then((response) => response.json()
        ).then((data) => {
            console.log(data)
            props.updatetoken(data)////update props
        })
    }

    return (
        <Container className='mainDiv'>
            <Row id='loginWrapper'>
                <Col>
                    <h1>Sign In</h1>
                    <Form onSubmit={submitLogin}>
                        <FormGroup className='userFormGroup'>
                            
                            <Input name='username' placeholder='Username' id='username' onChange={(e) => setUsername(e.target.value)} value={username} />
                        </FormGroup>
                        <FormGroup className='passFormGroup'>
                            
                            <Input name='password' type='password' placeholder='Password' id='password' onChange={(e) => setPassword(e.target.value)} value={password} />
                        </FormGroup>
                        <Button className='loginButton' type='submit'>LOGIN</Button>
                    </Form>
                    <div>
                        <p>Don't have an account? <Link className='authLink' to='#' onClick={(e) => props.handleChange(e, 1)}>Register</Link></p>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Login;
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
import '../App.css';
import {Link} from 'react-router-dom';


const Register = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const submitRegister = (e) => {
        e.preventDefault();

        fetch(`http://localhost:5000/user/register`, {
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
            props.updatetoken(data)
        })
    }

    return (
        <Container className='mainDiv'>
            <Row id='registerWrapper'>
                <Col>
                    <h1>Sign Up</h1>
                    <Form onSubmit={submitRegister}>
                        <FormGroup className='userFormGroup'>
                            <Input name='username' placeholder='Username' id='username' onChange={(e) => setUsername(e.target.value)} value={username} />
                        </FormGroup>
                        <FormGroup className='passFormGroup'>
                            <Input name='password' type='password' placeholder='Password' id='password' onChange={(e) => setPassword(e.target.value)} value={password} />
                        </FormGroup>
                        <Button className='registerButton' type='submit'>REGISTER</Button>
                        <div>
                        <p>Already have an account? <Link className='authLink' to='#' onClick={(e) => props.handleChange(e, 0)}>Sign In</Link></p>
                    </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Register;
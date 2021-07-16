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
import Login from '../authorization/Login';



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
            <Row>
                <Col>
                    <h1>Hello, register below</h1>
                    <Form onSubmit={submitRegister}>
                        <FormGroup>
                            <Label htmlFor='username'>Username</Label>
                            <Input name='username' onChange={(e) => setUsername(e.target.value)} value={username} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor='password'>Password</Label>
                            <Input name='password' onChange={(e) => setPassword(e.target.value)} value={password} />
                        </FormGroup>
                        <Button type='submit'>Register</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Register;
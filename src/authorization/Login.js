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
    let updatetoken = (props.updatetoken)

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
            updatetoken(data)
        })
    }

    return (
        <Container className='mainDiv'>
            <Row>
                <Col>
                    <h1>Welcome, please sign in.</h1>
                    <Form onSubmit={submitLogin}>
                        <FormGroup>
                            <Label htmlFor='username'>Username</Label>
                            <Input name='username' onChange={(e) => setUsername(e.target.value)} value={username} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor='password'>Password</Label>
                            <Input name='password' onChange={(e) => setPassword(e.target.value)} value={password} />
                        </FormGroup>
                        <Button type='submit'>Login</Button>
                    </Form>
                    <div>
                        <p>Don't have an account? Click<Link to='/register'>here</Link>to register</p>
                    </div>
                </Col>
                <div className='router'>
                    <Switch>
                        <Route exact path='/register'><Register /></Route>
                    </Switch>
                </div>


            </Row>
        </Container>
    )
}

export default Login;
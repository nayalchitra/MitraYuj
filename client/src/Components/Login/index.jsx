import { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { loginApi } from './apiUtils';
import { useDispatch, useSelector } from 'react-redux';
import { loginActionCreator } from '../../reducers/userReducer';
import { useLocation, useNavigate } from 'react-router';

function Login() {
    
    const [username,setUsername] = useState("");
    const [password, setPassword] = useState("");

    const {name} = useSelector(({users})=>users);

    const dispatch = useDispatch();
    const {state:redirectTo} = useLocation() ||'';
    const navigate = useNavigate();

    useEffect(()=>{
        if(name && redirectTo){
            navigate(redirectTo)
        }
    },[name])


    const login = (e)=>{
        e.preventDefault();
    //     console.log("clicked login")
    //     const payload = {
    //         username,
    //         password
    //     }
    //    try{
    //         const userData = (await loginApi(payload)).data;
    //         console.log(userData);
    //    }catch(err){
    //     console.log(err);
    //    }

        dispatch(loginActionCreator({username,password}));

    }
  return (
   <Container fluid>
        <Row>
            <Col md={{span:6,offset:3}} sm={{span:10,offset:1}} lg={{span:4,offset:4}}>
            <Card >
                <Card.Title>Login</Card.Title>
                <Card.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicUserName">
                        <Form.Label>username</Form.Label>
                        <Form.Control type="email" placeholder="Enter username" onChange={e=>setUsername(e.target.value)} />
                        {/* <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text> */}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>
                    </Form.Group>
                    {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group> */}
                    <Button variant="primary" type="submit" disabled={!(username.length> 0 && password.length > 0)} onClick={login}>
                        Login
                    </Button>
                    </Form>
                    
                   
                </Card.Body>
            </Card>
            </Col>
            
        </Row>
   </Container>
  );
}

export default Login;
import { useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function Login() {
    
  return (
   <Container fluid>
        <Row>
            <Col md={{span:6,offset:3}} sm={{span:10,offset:1}} lg={{span:4,offset:4}}>
            <Card >
                <Card.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicUserName">
                        <Form.Label>username</Form.Label>
                        <Form.Control type="email" placeholder="Enter username" />
                        {/* <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text> */}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group> */}
                    <Button variant="primary" type="submit">
                        Submit
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
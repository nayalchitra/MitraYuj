import { useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./style.css";

function SignUp() {
    const [password, setPassword] = useState('');
    const [valid, setValid] = useState({
        isNumberValid:false,
        isLowerCaseValid:false,
        isUpperCaseValid:false,
        isLengthValid:false,
        isSpecialCharacterValid:false
    });


    const validate = (e)=>{
        const pwd = e.target.value;
        console.log({pwd})
        // Pattern.test(string)
        const NUM_PAT = /\d/;
        const LOWERCASE_PAT = /[a-z]/;
        const UPPERCASE_PAT = /[A-Z]/;
        const SPECIAL_PAT = /[\W_]/;
        const length = pwd.length;

        setValid({
            ...valid,
            isNumberValid:NUM_PAT.test(pwd),
            isLowerCaseValid:LOWERCASE_PAT.test(pwd),
            isUpperCaseValid:UPPERCASE_PAT.test(pwd),
            isLengthValid:length>=8,
            isSpecialCharacterValid:SPECIAL_PAT.test(pwd)
            
        })
        console.log({valid});
    }

  return (
   <Container fluid>
        <Row>
            <Col md={{span:6,offset:3}} sm={{span:10,offset:1}} lg={{span:4,offset:4}}>
            <Card >
                <Card.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="email" placeholder="Enter name" />
                        {/* <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text> */}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicUserName">
                        <Form.Label>username</Form.Label>
                        <Form.Control type="email" placeholder="Enter username" />
                        {/* <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text> */}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={validate}/>
                    </Form.Group>
                    {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group> */}
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    </Form>
                    
                    <section>
                        <div className={valid.isLengthValid?'Valid':'non-Valid'} >Passsword length should be more than 7</div>
                        <div className={valid.isNumberValid?'Valid':'non-Valid'}>Atleast 1 Number</div>
                        <div className={valid.isLowerCaseValid?'Valid':'non-Valid'}>Atleast 1 LowerCase alphabet</div>
                        <div className={valid.isUpperCaseValid?'Valid':'non-Valid'}>Atleast 1 UpperCase alphabet</div>
                        <div className={valid.isSpecialCharacterValid?'Valid':'non-Valid'}>Atleast 1 Special Character</div>
                    </section>
                </Card.Body>
            </Card>
            </Col>
            
        </Row>
   </Container>
  );
}

export default SignUp;
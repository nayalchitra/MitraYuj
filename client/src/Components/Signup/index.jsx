import { useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./style.css";
import { signupApi } from '../Login/apiUtils';

function SignUp() {
    // const [password, setPassword] = useState('');
    const [userDetails, setUserDetails] = useState({
        name:'',
        password:'',
        username:''
    })
    const [valid, setValid] = useState({
        isNumberValid:false,
        isLowerCaseValid:false,
        isUpperCaseValid:false,
        isLengthValid:false,
        isSpecialCharacterValid:false
    });

    const SignupData = (e)=>{
        console.log(e.target)
        const targetName = e.target.name;
        const targetValue = e.target.value; 
        console.log({targetName}, {targetValue})

        setUserDetails({
            ...userDetails,
            [targetName]:targetValue
        })

        if(targetName === "password"){
            validate(targetValue);
        }
    }


    const validate = (value)=>{
        
        console.log({value})
        // Pattern.test(string)
        const NUM_PAT = /\d/;
        const LOWERCASE_PAT = /[a-z]/;
        const UPPERCASE_PAT = /[A-Z]/;
        const SPECIAL_PAT = /[\W_]/;
        const length = value.length;

        setValid({
            ...valid,
            isNumberValid:NUM_PAT.test(value),
            isLowerCaseValid:LOWERCASE_PAT.test(value),
            isUpperCaseValid:UPPERCASE_PAT.test(value),
            isLengthValid:length>=8,
            isSpecialCharacterValid:SPECIAL_PAT.test(value)
            
        })
        console.log({valid});
    }

    const userSignup = async(e)=>{
        e.preventDefault();
        const payload= userDetails;
        console.log(payload);
        try{
            const data = (await signupApi(payload));
            console.log(data);
        }catch(err){
            console.log(err.message);
        }

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
                        <Form.Control type="text" placeholder="Enter name" name='name' value={userDetails.name} onChange={SignupData}/>
                        {/* <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text> */}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicUserName">
                        <Form.Label>username</Form.Label>
                        <Form.Control type="email" placeholder="Enter username" name='username' value={userDetails.username} onChange={SignupData} />
                        {/* <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text> */}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name='password' value={userDetails.password} onChange={SignupData}/>
                    </Form.Group>
                    {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group> */}
                    <Button variant="primary" type="submit" onClick={userSignup}>
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
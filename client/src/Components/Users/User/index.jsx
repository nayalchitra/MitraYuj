import { Button, Col } from 'react-bootstrap';
import React from 'react'
import Card from 'react-bootstrap/Card';
import "./style.css";

export default function User({userData}) {
    const { firstName, lastName, picture, title} = userData;
    const fullName = `${title} ${firstName} ${lastName}`
  return (
               <Col md={5}  lg={4} sm={6} xl={3}>
                     <Card>
                    <Card.Body>
                            <img className='profile' src={picture} alt='user'></img>
                            <div className=''>
                                <Card.Title>{fullName}</Card.Title>
                                <Button>Add Friend</Button>
                            </div>
                            
                    </Card.Body>
                </Card>
               </Col>
  )
}

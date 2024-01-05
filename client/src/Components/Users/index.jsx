import React, { useEffect, useState } from 'react'
import axios from 'axios';
import User from './User';
import { Container, Row } from 'react-bootstrap';
import "./style.css";

const URL = "https://dummyapi.io/data/v1/user?limit=10";

export default function Users() {

    const instance = axios.create({
        baseURL:"https://dummyapi.io/data/v1/user?limit=10",
        headers:{"app-id":"640c6e4fee294db65a2053d8"}
    })

    const [users, setUsers] = useState([]);

    useEffect(()=>{

        (async()=>{
            const {data} = await instance.get(); // default is the base url
            console.log(data);
            setUsers(data.data);
        })()
    },[])

  return (
    <Container fluid>
        <Row>
        {
            users.map((user)=> <User userData={user} key={user.id}/>)
        }
        </Row>
    </Container>
  )
}

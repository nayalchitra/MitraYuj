import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useSearchParams } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutActionCreator } from '../reducers/userReducer';

function MyNavbar() {

  // const [name, setName] = useState();
  const [search, setSearch] = useSearchParams();
  const {username} = useSelector(({users})=>users);
  const dispatch = useDispatch();

  const handleChange = (e)=>{
    
      setSearch({search:e.target.value})
  }
  return (
    <Navbar collapseOnSelect expand="md" data-bs-theme="dark" className="bg-body-tertiary">
      <Container fluid>
        {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/routing">Routing</Nav.Link>
            <Nav.Link as={Link} to="/counter">Counter</Nav.Link>
          </Nav>
          <Nav>
           
            <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            
              onChange={handleChange}
            />
            <Button variant="outline-success">Search</Button>
            </Form>
            {/* <Link to="/login">Login</Link>
            <Link to="/signup">
             SignUp
            </Link> */}
            {
              username ? 
              <Nav.Link as={Button} onClick={()=>dispatch(logoutActionCreator())}>Logout</Nav.Link>
              :
              <>
                <Nav.Link as={Link} to='/login'>Login</Nav.Link>
                <Nav.Link as={Link} to='/signup'>SignUp</Nav.Link>
              </>
            }
           
             
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
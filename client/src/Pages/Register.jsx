import { useEffect, useState } from "react"
import { useAuth } from "../Hooks/Auth"
import { useNavigate } from "react-router"

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';



const Register = (props) => {

    const { userURLEndpoint } = props
    // console.log(userURLEndpoint)

    const navigate = useNavigate()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const auth = useAuth()
    // console.log(auth)

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(firstName, lastName, username, password)
        const registerResult = await auth.register(firstName, lastName, username, password)
        // console.log(registerResult)
        if(registerResult.success){
          auth.login(username, password)
          navigate('/')
        }
    }

    return (
        <Container id='register-container' fluid='md'>
          <Row className="justify-content-center m-2">
            <h1>Register</h1>
          </Row>
          <Row className="justify-content-center m-2">
            <Col md={6}>
              <Form id='register-form'>
    
                <Form.Group className="inputs">
                  <Form.Label>First Name:</Form.Label>
                  <Form.Control type="text" placeholder="Enter your first name" onChange={(e) => {
                    setFirstName(e.target.value)
                  }}></Form.Control>
                </Form.Group>

                <Form.Group className="inputs">
                  <Form.Label>Last Name:</Form.Label>
                  <Form.Control type="text" placeholder="Enter your last name" onChange={(e) => {
                    setLastName(e.target.value)
                  }}></Form.Control>
                </Form.Group>

                <Form.Group className="inputs">
                  <Form.Label>Username: </Form.Label>
                  <Form.Control type="text" placeholder="Enter your username" onChange={(e) => {
                    setUsername(e.target.value)
                  }}></Form.Control>
                </Form.Group>
    
                <Form.Group className="inputs">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control type="password" placeholder="Enter your password" onChange={(e) => {
                    setPassword(e.target.value)
                  }}></Form.Control>
                </Form.Group>
    
                <Button 
                  id="register-button"
                  variant="primary" type="submit"
                  onClick={(e) => {
                    handleSubmit(e)
                  }}
                >
                  Register
                </Button>
    
              </Form>
            </Col>
          </Row>
          <Row className="justify-content-center mt-5">
            <p>Have an account? <a href="/login">Login</a></p>
          </Row>
        </Container>
      );
}

export default Register
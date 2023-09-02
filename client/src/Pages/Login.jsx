import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../Hooks/Auth'
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const Login = () => {
  const auth = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState('')
	const navigate = useNavigate() // be able to navigate to home on login


    const handleLogin = async () => {
        // console.log(username, password)
        const loginResult = await auth.login(username, password)
        console.log(loginResult)
        if(loginResult.success) {
          navigate('/')
        }
        else {
          setErrorMessage(loginResult.message)
        }
    }

    return ( 
        <Container id='login-container' fluid='md'>
        <Row className="justify-content-center m-2">
          <h1>Login</h1>
        </Row>
          
          <Row className="justify-content-center m-2" >
            <Col md={6}>
              <Form id='login-form'>
    
                <Form.Group className="inputs">
                  <Form.Label>Username:</Form.Label>
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

                {errorMessage && <p id="password-error">{errorMessage}</p>}
    
                <Button 
                  id="login-button"
                  variant="primary" type="submit"
                  onClick={async (e) => {
                    e.preventDefault()
                    handleLogin()
                  }}
                >
                  Login
                </Button>
              </Form>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <p>Don't have an account? <a href="/register">Register</a></p>
          </Row>
        </Container>
      );
}

export default Login
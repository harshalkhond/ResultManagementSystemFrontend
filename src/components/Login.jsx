import React, { useContext, useState } from 'react'
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from "react-router-dom";
import AuthContext from '../contextapi/auth-context.jsx';
import { User,Lock,Mail   } from 'lucide-react';
import axios from 'axios';
import { Register } from './register.jsx';

export const Login = (props) => {

    const authContext = useContext(AuthContext)
    console.log(authContext.access);
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, showError] = useState(false);
    const [showlogin , setShow] = useState(true);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (username==="" || password===""){
            showError(true);
        }
        const data = {
            "username": username,
            "password": password
        }
        console.log(data);
        try {
            const { data: response } = await axios.post('http://127.0.0.1:8000/login', data);
            localStorage.setItem('token', JSON.stringify(response.token));
            localStorage.setItem('username', JSON.stringify(username));
            navigate('/');
            console.log(response);
        } catch (error) {
            showError(true);
            console.error(error.message);
        }

    }
    return (
        <>
        { showlogin?
        <Container style={{ fontFamily: "Open Sans", color: "black", textAlign:"center"  }}>

            <Form className='px-4 py-5' style={{
                color: "black", position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                width: "30%",
                backgroundColor: "#e9ecef", borderRadius: "12px"
            }}>
                <b><Form.Label>LOGIN</Form.Label></b>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={3}>
                        <User /> 
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Control type="text" placeholder="Roll No" onChange={(e) => { setUsername(e.target.value); showError(false) }} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={3}>
                        <Lock />
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Control type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value); showError(false) }} />
                    </Col>
                </Form.Group>
                
                {error && <Form.Group as={Row} className="">
                    <Col>
                        <h6 style={{ color: "red" }}>Invalid username or password</h6>
                    </Col>
                </Form.Group>
                }
                <Form.Group as={Row} className="pt-4">
                    <Col>
                        <Button style={{ backgroundColor: "#6e44ff", float:"right" }} type="submit" onClick={handleLogin}>Sign in</Button>
                    </Col>
                    <Col>
                        <Button style={{ backgroundColor: "#6e44ff" }} onClick={(e)=>{setShow(false)}}>Register</Button>
                    </Col>
                </Form.Group>
            </Form>
        </Container>
            :<Register state={setShow}/>}</>
    )
}

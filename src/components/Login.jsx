import React, { useContext, useState } from 'react'
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { API } from '../API/apis.ts';
import { useNavigate } from "react-router-dom";
import AuthContext from '../contextapi/auth-context.jsx';
import { GraduationCap } from 'lucide-react';
import { KeyRound } from 'lucide-react';
import axios from 'axios';

export const Login = (props) => {

    const authContext = useContext(AuthContext)
    console.log(authContext.access);
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, showError] = useState(false);

    const [show, setShow] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
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
            setShow(true);
            console.log(response);
        } catch (error) {
            showError(true);
            console.error(error.message);
        }

    }
    // const fetchdata = async ()=>{
    //     console.log(true);
    //     try {
    //         const { data: response } = await apis.fetchStudentData(101);
    //         console.log(response.students[0]);
    //     } catch (error) {
    //         console.error(error.message);
    //     }
    // }
    return (
        <Container style={{ fontFamily: "Open Sans", color: "black" }}>

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
                    <Form.Label column sm={4}>
                        <GraduationCap /> Roll No
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Control type="text" placeholder="Roll No" onChange={(e) => { setUsername(e.target.value); showError(false) }} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={4}>
                        <KeyRound />  Password
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Control type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value); showError(false) }} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-2" controlId="formHorizontalCheck">
                    <Col>
                        <Form.Check label="Remember me" />
                    </Col>
                </Form.Group>
                {error && <Form.Group as={Row} className="">
                    <Col>
                        <h6 style={{ color: "red" }}>Invalid username or password</h6>
                    </Col>
                </Form.Group>
                }
                <Form.Group as={Row} className="">
                    <Col>
                        <Button style={{ backgroundColor: "#6e44ff" }} type="submit" onClick={handleLogin}>Sign in</Button>
                    </Col>
                </Form.Group>
                {/* { show? <h1 style={{color:"black"}} onClick={fetchdata}>logged in</h1>:<></>} */}
            </Form>
        </Container>
    )
}

import React, { useContext, useState} from 'react'
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

export const Login = (props) => {
    const apis = new API();
    const authContext = useContext(AuthContext)
    console.log(authContext.access);
    const navigate = useNavigate();
    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");
    const [show , setShow] = useState(false);
 
    const handleLogin = async () =>{
        const data = {
            "username":username,
            "password":password
        }
        console.log(data);
        try {
            const { data: response } = await apis.login(data);
            navigate('/',
            {
                state: {
                    roll: username,
                }
            });
            setShow(true);
            console.log(response);
        } catch (error) {
            console.error(error.message);
        }
    }
    const fetchdata = async ()=>{
        console.log(true);
        try {
            const { data: response } = await apis.fetchStudentData(101);
            console.log(response.students[0]);
        } catch (error) {
            console.error(error.message);
        }
    }
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
              <b>  <Form.Label>LOGIN</Form.Label></b>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={4}>
                    <GraduationCap/> Roll No 
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Control type="email" placeholder="Roll No" onChange={(e)=>{setUsername(e.target.value)}}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={4}>
                    <KeyRound/>  Password
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Control type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-2" controlId="formHorizontalCheck">
                    <Col>
                        <Form.Check label="Remember me" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="">
                    <Col>
                        <Button style={{backgroundColor:"#6e44ff"}} type="submit" onClick={handleLogin}>Sign in</Button>
                    </Col>
                </Form.Group>
                { show? <h1 style={{color:"black"}} onClick={fetchdata}>logged in</h1>:<></>}
            </Form>
        </Container>
    )
}

import React from 'react'
import {Form,Container,Row,Col , Button} from 'react-bootstrap';
import { User,Lock,Mail   } from 'lucide-react';
import { useState } from 'react';
import { API } from '../API/apis.ts';
import { useNavigate } from "react-router-dom";
export const Register = (props) => {
    const apis = new API();
    console.log()
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [email, setEmail] = useState("");
    const [error, showError] = useState(false);
    const [errortext, setErrorText] = useState("");
    const registerUserInfo = (e) =>{
        e.preventDefault();
        if (password1!==password2){
            showError(true);
            setErrorText("Passwords not matching");
            return ;
        }
        if (password1.length < 8){
            showError(true);
            setErrorText("Password length should be minimum 8 characters")
        }
        const data = {
            "username":username,
            "password":password1,
            "password2":password2,
            "email":email
        }
        apis.registerUser(data).then((res)=>{
            console.log(res);
            navigate('/addstudentDetails');
        }).catch((err)=>{
            console.log(err.response.data.username[0]);
            setErrorText(err.response.data.username[0]);
            showError(true);
            console.log(errortext);
        })
    }
  return (
    <Container style={{ fontFamily: "Open Sans", color: "black" , textAlign:"center" }}>

            <Form className='px-4 py-5 text-center"' style={{
                color: "black", position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                width: "30%",
                backgroundColor: "#e9ecef", borderRadius: "12px"
            }}>
                <Form.Label className='pb-2' style={{color:"#49b6ff"}}><h2>Sign Up</h2></Form.Label>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={3}>
                        <User  />
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
                        <Form.Control type="password" placeholder="Password" onChange={(e) => { setPassword1(e.target.value); showError(false) }} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={3}>
                        <Lock />
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Control type="password" placeholder="Enter Password Again" onChange={(e) => { setPassword2(e.target.value); showError(false) }} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={3}>
                        <Mail />
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Control type="email" placeholder="Email-Id" onChange={(e) => { setEmail(e.target.value); showError(false) }} />
                    </Col>
                </Form.Group>
                {error && <Form.Group as={Row} className="">
                    <Col>
                        <h6 style={{ color: "red" }}>{errortext}</h6>
                    </Col>
                </Form.Group>
                }
                <Form.Group as={Row} className="pt-3">
                    <Col >
                        <Button style={{ backgroundColor: "#6e44ff",float:"right" }} type="submit" onClick={registerUserInfo}>Register</Button>
                    </Col>
                    <Col>
                        <Button style={{ backgroundColor: "#6e44ff", float:"left" }}  onClick={(e)=>{props.state(true)}}>Login</Button>
                    </Col>
                </Form.Group>
            </Form>
        </Container>
  )
}

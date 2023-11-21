import React, { useContext, useState} from 'react'
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { API } from '../API/apis.ts';
import { useNavigate } from "react-router-dom";
import AuthContext from '../contextapi/auth-context.jsx';
export const Login = () => {
    const apis = new API();
    const authContext = useContext(AuthContext)
    console.log(authContext.access);
    const navigate = useNavigate();
    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");
    const [token,setToken]=useState("");
    const [refresh,setRefresh]=useState("");
    const handleLogin = async () =>{
        const data = {
            "username":username,
            "password":password
        }
        console.log(data);
        try {
            const { data: response } = await apis.login(data);
            setToken(response.access);
            setRefresh(response.refresh);
            navigate("/", { state: { name:username } });
            console.log(response);
        } catch (error) {
            console.error(error.message);
        }
    }
    console.log(token);
    console.log(refresh);
    return (
        <Container>

            <Form className='bg-dark px-4 py-5' style={{
                color: "white", position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                width: "30%", border: "2px solid black", borderRadius: "14px"
            }}>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={4}>
                        Roll No
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Control type="email" placeholder="Roll No" onChange={(e)=>{setUsername(e.target.value)}}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={4}>
                        Password
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
                        <Button type="submit" onClick={handleLogin}>Sign in</Button>
                    </Col>
                </Form.Group>
            </Form>

        </Container>
    )
}

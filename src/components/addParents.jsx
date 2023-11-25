import React from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { useState } from 'react';
import axios from 'axios';
import { Baseurl } from '../Constants/urls';
import Spinner from 'react-bootstrap/Spinner'
export const AddParents = () => {
    const [pfname, setPFname] = useState("");
    const [plname, setpLname] = useState("");
    const [pdob, setpDOB] = useState("");
    const [pphnum, setpPhnum] = useState("");
    const [pmobnum, setpMobnum] = useState("");
    const [pactive, setpActive] = useState(true);
    const [puserpassword, setpUserpassword] = useState("");
    const [pdesignation, setpDesignation] = useState("");
    const [pemail, setpEmail] = useState("");
    const [ParentId, setParentId] = useState("");
    const [authenticated, setAuthenticated] = useState(false);
    const [roll , setRoll] = useState(0);
    const [loading , setLoading] = useState(false);
    const [show , setShow] = useState(false);
    const updateParentData = () =>{
        if (authenticated){
            let data = {
                "email":pemail,
                "fname" : pfname,
                "lname":plname,
                "dob":pdob,
                "phone":pphnum,
                "mobile":pmobnum,
                "p_id":ParentId,
                "status":pactive,
                "password":puserpassword,
                "designation":pdesignation
            }
            console.log(data);
            axios.post(Baseurl + 'parents', data).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
            alert("Data Submitted Successfully");
        }
    }
    const getStdId = async ()=>{
        setLoading(true);
        await axios.get(Baseurl+'students?roll='+roll).then((res) => {
            console.log(res.data.students[0].p_id);
            
            setTimeout(() => {
                setParentId(res.data.students[0].p_id);
            }, 3000);
        }).catch((err) => {
            console.log(err);
        }) 
        setLoading(false);
        setShow(true);
    }
  return (
    <>
    <Container className='text-white pt-3 py-3' style={{fontFamily: "Open Sans", backgroundColor: "#e9ecef", color:"black" , borderRadius: "12px" }}>
    <Form className='mb-3' style={{color:"black"}}>
                <Form.Label> Get Parent Id for Student</Form.Label>
                    <Row>
                        <Col className='col-8'>
                            <Form.Label>Enter Student Roll no</Form.Label>
                            <Form.Control type='number' onChange={(e)=>{setRoll(e.target.value)}} placeholder="Enter Student Roll No"/>
                        </Col>
                        <Col>
                      { !show ?  <Button onClick={getStdId} style={{marginTop:"30px", backgroundColor:"#49b6ff" }}>Get Id</Button> : (ParentId==="" ? <Spinner animation="border" variant="primary" style={{marginTop:"30px"}}/>: <Button style={{marginTop:"30px" ,backgroundColor:"#49b6ff" }}>{ParentId}</Button>)}
                        </Col>
                    </Row>
                </Form>
    <Form className='mb-3' style={{color:"black"}}>
                <Form.Label> <h4>Parents Data</h4></Form.Label>
                    <Row>
                        <Col>
                            <Form.Label>Parents Id</Form.Label>
                            <Form.Control type='number' placeholder={ParentId} readOnly />
                        </Col>
                    </Row>
                </Form>

                <Form className='mb-3' style={{color:"black"}}>

                    <Row>
                        <Col className='col-4'>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control placeholder="Enter First Name" onChange={(e) => { setPFname(e.target.value) }} />
                        </Col>
                        <Col>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control placeholder="Enter Last Name" onChange={(e) => { setpLname(e.target.value) }} />
                        </Col>
                        <Col>
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control placeholder="Enter Date of Birth" onChange={(e) => { setpDOB(e.target.value) }} />
                        </Col>
                    </Row>
                </Form>

                <Form className='mb-3' style={{color:"black"}}>

                    <Row>
                        <Col className='col-4'>
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control placeholder="Enter Phone Number" onChange={(e) => { setpPhnum(e.target.value) }} />
                        </Col>
                        <Col>
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control placeholder="Enter Mobile Number" onChange={(e) => { setpMobnum(e.target.value) }} />
                        </Col>
                    </Row>
                </Form> <Form className='mb-3' style={{color:"black"}}>

                    <Row>
                        <Col className='col-4'>
                            <Form.Label>Active</Form.Label>
                            <Form.Select aria-label="is user active" onChange={(e) => {setpActive(e.target.value) }}>
                                <option value="True">True</option>
                                <option value="False">False</option>
                            </Form.Select>
                        </Col>
                        <Col>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' placeholder="Enter Password" onChange={(e) => { setpUserpassword(e.target.value) }} />
                        </Col>
                        <Col>
                            <Form.Label>Designation</Form.Label>
                            <Form.Select aria-label="Designation" onChange={(e) => { setpDesignation(e.target.value) }}>
                                <option value="Student">Student</option>
                                <option value="Teacher">Teacher</option>
                                <option value="Parent">Parent</option>
                            </Form.Select>
                        </Col>
                    </Row>
                    <Row className='mb-3'>

                    <Col className='col-10'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' placeholder="Enter email id" onChange={(e) => { setpEmail(e.target.value) }} />
                        </Col>
                       
                        <Col>
                        <Form.Label>  </Form.Label>
                            <Button onClick={updateParentData} style={{marginTop:"32px", backgroundColor:"#49b6ff" }}>Update</Button>
                        </Col>
                    </Row>
                </Form> 
        </Container></>
  )
}

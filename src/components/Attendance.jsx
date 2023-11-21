import axios from 'axios';
import React, { useState } from 'react'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import { Baseurl } from '../Constants/urls';

export const Attendance = () => {
    const [roll , setRoll] = useState(0);
    const [date , setDate] = useState(new Date())
    const [description, setDescription]=useState("")
    const [attendance, setAttendance]=useState("Absent")

    const submitAttendance = ()=>{
        const data = {
            date : date,
            std_id : roll,
            present : (attendance==="Present"?true:false),
            absent : (attendance==="Absent"?true:false),
            remarks : description
        }
        axios.post(Baseurl+'Attendance' , data).then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
    }
  return (
    <Container>
    <Form className='bg-dark px-3 py-3' style={{border:"2px solid black", borderRadius:"8px"}}>
            
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Roll No</Form.Label>
          <Form.Control onChange={(e)=>{setRoll(e.target.value)}} type="number" placeholder="Enter Roll no" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Date</Form.Label>
          <Form.Control onChange={(e)=>{setDate(e.target.value)}} type="date" />
        </Form.Group>
      </Row>
      <Row>
        <Col>
      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>Description</Form.Label>
        <Form.Control onChange={(e)=>{setDescription(e.target.value)}}  placeholder="Description" />
      </Form.Group>
      </Col>
     
<Col>
      <Form.Label>Status</Form.Label>
        <Form.Select aria-label="Designation" onChange={(e) => { setAttendance(e.target.value) }}>
            <option value="Absent">Default</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
        </Form.Select>
        </Col>
        </Row>

      <Button className='mt-3' onClick={submitAttendance} variant="primary">
        Submit
      </Button>
    </Form>
    </Container>

  )
}

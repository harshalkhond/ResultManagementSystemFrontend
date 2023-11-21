import React, { useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import axios from 'axios';
import { useEffect } from 'react';
import { Baseurl } from '../Constants/urls';

export const StudentData = (propsData) => {
    // const location = useLocation();
    // const propsData = location.state;
  console.log(propsData.state)
    const [loading, setLoading] =useState(false);
    const [data , setData] = useState([]);
    const [marks , setMarks] = useState(1);
    const [totalmarks, setTotalMarks] = useState(0);
    console.log(loading);
    useEffect(() => {
        const fetchData = async () =>{
            console.log("funcion triggered")
              setLoading(true);
              try {
                const {data: response} = await axios.get(Baseurl+'students/data?roll='+propsData.state[0]);
                setData(response.students);
                setTotalMarks(parseInt(response.students[0].Sub1marks) + parseInt(response.students[0].Sub2marks) + parseInt(response.students[0].Sub3marks) + parseInt(response.students[0].Sub4marks) + parseInt(response.students[0].Sub5marks));
                setMarks(parseInt(response.students[0].Sub1marksobt) + parseInt(response.students[0].Sub2marksobt) + parseInt(response.students[0].Sub3marksobt) + parseInt(response.students[0].Sub4marksobt) + parseInt(response.students[0].Sub5marksobt));
                console.log(response);
              } catch (error) {
                console.error(error.message);
              }
            }

            fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
    
  return (
    <>
    <Container className='bg-dark text-white pt-3' style={{border : "2px solid black", borderRadius:"12px"}}>
    <Form className='mb-5'>
    
            <Row>
            <Col xs={7}>
              <Form.Label>Name</Form.Label>
              <Form.Control placeholder={propsData.state[1]} readOnly="true"/>
            </Col>
            <Col>
            <Form.Label>Roll No</Form.Label>
              <Form.Control placeholder={propsData.state[0]} readOnly="true" />
            </Col>
            <Col>
            <Form.Label>Class</Form.Label>
              <Form.Control placeholder={propsData.state[2]} readOnly="true" />
            </Col>
          </Row>
   
    </Form>
    { data.map((key)=>(  <><Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
        <Form.Label>Subject</Form.Label>
            <Form.Control placeholder={key.Sub1} readOnly="true" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
        <Form.Label>Marks Obtained</Form.Label>
            <Form.Control placeholder={key.Sub1marksobt} readOnly="true" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
        <Form.Label>Total Marks</Form.Label>
            <Form.Control placeholder={key.Sub1marks} readOnly="true" />
        </Form.Group>
    </Row><Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
                
                <Form.Control placeholder={key.Sub2} readOnly="true" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
                
                <Form.Control placeholder={key.Sub2marksobt} readOnly="true" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
                
                <Form.Control placeholder={key.Sub2marks} readOnly="true" />
            </Form.Group>
        </Row>
        <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          
          <Form.Control placeholder={key.Sub3} readOnly="true"/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          
          <Form.Control placeholder={key.Sub3marksobt} readOnly="true"/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          
          <Form.Control placeholder={key.Sub3marks} readOnly="true"/>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          
          <Form.Control placeholder={key.Sub4} readOnly="true"/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          
          <Form.Control placeholder={key.Sub4marksobt} readOnly="true"/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          
          <Form.Control placeholder={key.Sub4marks} readOnly="true"/>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          
          <Form.Control placeholder={key.Sub5} readOnly="true"/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          
          <Form.Control placeholder={key.Sub5marksobt} readOnly="true"/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          
          <Form.Control placeholder={key.Sub5marks} readOnly="true"/>
        </Form.Group>
      </Row>
      
      <Row className="mt-5 pb-5">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Percentage</Form.Label>
          <Form.Control placeholder={(marks/totalmarks)*100} readOnly="true"/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Marks Scored</Form.Label>
          <Form.Control placeholder={marks} readOnly="true"/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Total Marks</Form.Label>
          <Form.Control placeholder={totalmarks} readOnly="true"/>
        </Form.Group>
      </Row></>
      
       )) 
    }
    </Container>
    </>
  )
}

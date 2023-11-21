/* eslint-disable no-restricted-globals */
import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { StudentData } from './StudentData';
import { Baseurl } from '../Constants/urls';
export const StudentDetails = (state) => {
  console.log(state)
    const [data, setData] = useState([{
      Name : ""
    }]);
    const [show , setShow] = useState(false);
    const [loading , setLoading] = useState(false);
    const [name , setName] = useState("")
    const [roll , setRoll] = useState(0)
    const [arr , setArr]= useState([]);
    useEffect(() => {
      }, []);
    const fetchData = async () =>{
      console.log("funcion triggered")
        setLoading(true);
        try {
          const {data: response} = await axios.get(Baseurl+'students?name='+name+'&roll='+roll);
          setData(response.students);
          console.log(response)
        } catch (error) {
          console.error(error.message);
        }
      }
      const fetchCompleteData = async () =>{
        console.log("funcion triggered")
          setLoading(true);
          try {
            const {data: response} = await axios.get(Baseurl+'students?name=all');
            setData(response.students);
            console.log(response)
          } catch (error) {
            console.error(error.message);
          }
        }
  return (
    <>
   { !show ? <Container>
    <Form className='mb-3 mt-3'>
      <Row>
        <Col className='col-4'>
          <Form.Control placeholder="Enter Name"  onChange={(e)=>{ setName(e.target.value) }}/>
        </Col>
        <Col className='col-4'>
          <Form.Control placeholder="Enter Roll No"  onChange={(e)=>{ setRoll(e.target.value) }}/>
        </Col>
        <Col className='col-4'>
        <Button onClick={fetchData}>Search</Button>
        </Col>
      </Row>
    </Form>
    <ListGroup as="ol" numbered>
    { loading && data.map((key)=>(  <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">{key.Name}</div>
          {key.Reportsto}
        </div>
        <Button onClick={(e)=>{setShow(!show); setArr([key.RollNo , key.Name , key.Class , key.Percentage])}}>See Info</Button>
      </ListGroup.Item>
      ))  }
    </ListGroup>
    </Container> : <StudentData state = {arr} />
}
    </>
  )
}

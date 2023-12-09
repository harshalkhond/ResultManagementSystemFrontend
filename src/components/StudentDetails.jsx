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
import Table from 'react-bootstrap/Table'
import Badge from 'react-bootstrap/Badge';
import { API } from '../API/apis.ts';
export const StudentDetails = (state) => {
  console.log(state)
  const apis = new API();
  const [data, setData] = useState([{
    Name: ""
  }]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("")
  const [roll, setRoll] = useState(0)
  const [arr, setArr] = useState([]);
  useEffect(() => {
  }, []);
  
  const fetchData = async () => {
    console.log("funcion triggered")
    setLoading(true);
    try {
      const { data: response } = await apis.fetchStudentData(roll,name);
      setData(response.students);
      console.log(response)
    } catch (error) {
      console.error(error.message);
    }
  }
  const fetchCompleteData = async () => {
    console.log("funcion triggered")
    setLoading(true);
    try {
      const { data: response } = await axios.get(Baseurl + 'students?name=all');
      setData(response.students);
      console.log(response)
    } catch (error) {
      console.error(error.message);
    }
  }
  return (
    <>
      {!show ? <Container>
        <Form className='mb-3 mt-3'>
          <Row>
            <Col className='col-4'>
              <Form.Control placeholder="Enter Name" onChange={(e) => { setName(e.target.value) }} />
            </Col>
            <Col className='col-4'>
              <Form.Control placeholder="Enter Roll No" onChange={(e) => { setRoll(e.target.value) }} />
            </Col>
            <Col className='col-4'>
              <Button style={{ backgroundColor: "#49b6ff" }} onClick={fetchData}>Search</Button>
            </Col>
          </Row>
        </Form>
        <Table hover>
         {loading? <thead>
            <tr>
              <th>Sr no</th>
              <th>Name</th>
              <th></th>
              <th></th>
            </tr>
          </thead>:<></>}
          <tbody>
          {loading && data.map((key,i) => (  <tr>
              <td>{i + 1}</td>
              <td>{key.Name}</td>
              <td><Badge bg="success" onClick={(e) => { setShow(!show); setArr([key.RollNo, key.Name, key.Class, key.Percentage]) }}>Info</Badge></td>
            </tr>
            ))}
          </tbody>
        </Table>
      </Container> : <StudentData state={arr} />
      }
    </>
  )
}

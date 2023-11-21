import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { useState } from 'react'
import { AddStudent } from './addStudent'
import { StudentDetails } from './StudentDetails'
import { AddParents } from './addParents'
import { Attendance } from './Attendance'
import { LandingDashBoard } from './LandingDashBoard'
import { Submitmarks } from './submitmarks'

export const DashBoard = (props) => {
  const [on, setOn] = useState(1);
  const showdb = {
    1: <LandingDashBoard />,
    2: <StudentDetails />,
    3: <AddParents/>,
    4: <Attendance/>,
    5: <AddStudent/>,
    6: <Submitmarks/>
  }
  console.log(props);
  return (

    <>
      <Container className='mt-4' style={{ color: "white" }}>
        <Row className='mt-4'>
          <Col className='col-3 pt-3' style={{ backgroundColor: "black", borderRadius: "8px", wordBreak: "break-all" }}>
            <Nav fill variant="tabs" className='flex-sm-column'>
              <Nav.Item>
                <b> <span onClick={(e) => { setOn(1) }} style={{ cursor: "pointer" }}>Home</span></b>
              </Nav.Item>
              <hr />
              <Nav.Item>
                <b>    <span onClick={(e) => { setOn(2); }} style={{ cursor: "pointer" }}> Search </span></b>
              </Nav.Item>
              <hr />
              <Nav.Item>
                <b> <span onClick={(e) => { setOn(3) }} className='my-2' style={{ cursor: "pointer" }}>AddParents</span></b>
              </Nav.Item>
              <hr />
              <Nav.Item>
                <b> <span onClick={(e) => { setOn(4) }} className='my-2' style={{ cursor: "pointer" }}>Attendance</span></b>
              </Nav.Item>
              <hr />
              <Nav.Item>
                <b> <span onClick={(e) => { setOn(5) }} className='my-2' style={{ cursor: "pointer" }}>Add Student</span></b>
              </Nav.Item>
              <hr />
              <Nav.Item>
                <b> <span onClick={(e) => { setOn(6) }} className='my-2' style={{ cursor: "pointer" }}>Submitmarks</span></b>
              </Nav.Item>
              <hr />
            </Nav>
          </Col>
          <Col>
            {showdb[on]};
          </Col>

        </Row>
      </Container>
    </>
  )
}
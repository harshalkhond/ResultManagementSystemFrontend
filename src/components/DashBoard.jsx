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
import { AddNotice } from './addNotice'
import { NewDashboard } from './newDashboard'
import { Submitmarks } from './submitmarks'
import { Home } from 'lucide-react';
import { Search } from 'lucide-react';
import { UserPlus2 } from 'lucide-react';
import { UserPlus } from 'lucide-react';
import { Backpack } from 'lucide-react';
import { Percent } from 'lucide-react';
import { AddTaasks } from './AddTaasks'
import { Datainsert } from './datainsert'
import { useLocation } from 'react-router-dom';
export const DashBoard = () => {
  const { state } = useLocation();
  const [on, setOn] = useState(1);
  const showdb = {
    1: <NewDashboard/>,
    2: <StudentDetails />,
    3: <AddParents/>,
    4: <Attendance/>,
    5: <AddStudent/>,
    6: <Submitmarks/>,
    7:<AddNotice/>,
    8: <AddTaasks/>
  }
  return (

    <>
      <Container className='mt-4' style={{ fontFamily: "Open Sans",borderRadius: "8px" }}>
        <Row className='mt-4'>
          <Col className='col-2 pt-3' style={{  borderRadius: "12px", wordBreak: "break-all", maxHeight:"fit-content" }}>
            <Nav fill variant="tabs" className='flex-sm-column'>
              <Nav.Item>
                <b> <span onClick={(e) => { setOn(1) }} style={{ cursor: "pointer" }}>Home <Home style={{float:"right"}}/></span></b>
              </Nav.Item>
              <hr />
              <Nav.Item>
                <b>    <span onClick={(e) => { setOn(2); }} style={{ cursor: "pointer" }}> Search<Search  style={{float:"right"}}/> </span></b>
              </Nav.Item>
              <hr />
              <Nav.Item>
                <b> <span onClick={(e) => { setOn(3) }} className='my-2' style={{ cursor: "pointer" }}>AddParents<UserPlus2  style={{float:"right"}}/></span></b>
              </Nav.Item>
              <hr />
              <Nav.Item>
                <b> <span onClick={(e) => { setOn(4) }} className='my-2' style={{ cursor: "pointer" }}>Attendance<Backpack  style={{float:"right"}}/></span></b>
              </Nav.Item>
              <hr />
              <Nav.Item>
                <b> <span onClick={(e) => { setOn(5) }} className='my-2' style={{ cursor: "pointer" }}>Add Student<UserPlus  style={{float:"right"}}/></span></b>
              </Nav.Item>
              <hr />
              <Nav.Item>
                <b> <span onClick={(e) => { setOn(6) }} className='my-2' style={{ cursor: "pointer" }}>Submitmarks <Percent  style={{float:"right"}}/></span></b>
              </Nav.Item>
              <hr />
              <Nav.Item>
                <b> <span onClick={(e) => { setOn(7) }} className='my-2' style={{ cursor: "pointer" }}>Add Notices<Percent  style={{float:"right"}}/></span></b>
              </Nav.Item>
              <hr />
              <Nav.Item>
                <b> <span onClick={(e) => { setOn(8) }} className='my-2' style={{ cursor: "pointer" }}>Add Tasks<Percent  style={{float:"right"}}/></span></b>
              </Nav.Item>
              <hr />
            </Nav>
          </Col>
          <Col>
            {showdb[on]}
          </Col>

        </Row>
      </Container>
    </>
  )
}

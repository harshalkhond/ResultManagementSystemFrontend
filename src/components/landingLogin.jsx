import React, { useState } from 'react'
import { Card,Button } from 'react-bootstrap'
import { MyVerticallyCenteredModal } from './StudentLogin';

export const LandingLogin = () => {
    const [modalShow, setModalShow] = useState(false);
  return (
    <div className="d-flex align-items-center justify-content-center" style={{height: "500px"}}>
    <Card style={{ width: '18rem', color:"white" }} className='bg-dark'>
       <Card.Body>
         <Card.Title>Login as</Card.Title>
         <Button variant="primary" onClick={() => setModalShow(true)}>
        Student
      </Button>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
       </Card.Body>
     </Card>
</div>
  )
}

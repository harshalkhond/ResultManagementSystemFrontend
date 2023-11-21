import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form, Container } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import { Baseurl } from '../Constants/urls';
export const  MyVerticallyCenteredModal = (props) => {
    const [rollno , setRoll] = useState("");
    const [password , setPassword] = useState("");

    const login = () =>{
        axios.get(Baseurl+'login?name='+rollno+'&pass='+password).then((res)=>{
            console.log(res);
            alert("Successful");
        }).catch((err)=>{
            console.log(err);
            alert("failed");
        })
    }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
        <Container className='bg-dark' style={{color:"white"}}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Student Login
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Roll No</Form.Label>
              <Form.Control
                type="text"
                placeholder="RollNo"
                autoFocus
                onChange={(e)=>{ setRoll(e.target.value)}}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="Password"
                placeholder="Password"
                autoFocus
                onChange={(e) => {setPassword(e.target.value)}}
              />
            </Form.Group>
          </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={login}>Submit</Button>
      </Modal.Footer>
      </Container>
    </Modal>
 
  );
}

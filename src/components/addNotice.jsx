import React from 'react'
import { Row, Col, Form, Container, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { API } from '../API/apis.ts';
export const AddNotice = () => {
    const [description, setDescription] = useState("");
    const [cid, setCid] = useState(0);
    const [headline, setHeadline] = useState("");
    const [courses, setCourses] = useState([]);

    const apis = new API();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await apis.getCourses();
                setCourses(response.students);
            } catch (error) {
                console.error(error.message);
            }
        }
        fetchData();
    }, [])
    console.log(courses);
    const submitForm = async () => {
        const noticedata = {
            "cid":cid,
            "noticeheadline":headline,
            "noticedescrip":description
        }
        try {
            const { data: response } = await apis.postNotices(noticedata);
            console.log("success");
        } catch (error) {
            console.error(error.message);
        }
    }
    return (
        <Container >
            <Form className='px-3 py-3' style={{ fontFamily: "Open Sans", backgroundColor: "#e9ecef", color: "black", borderRadius: "12px" }}>

                <Row className="mb-3">
                    <Col>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Notice headline</Form.Label>
                        <Form.Control onChange={(e) => { setHeadline(e.target.value) }} type="text" placeholder="Notice headline" />
                    </Form.Group>
                    </Col>
                    <Col>
                    <Form.Label>Class</Form.Label>
                    <Form.Select aria-label="Class" onChange={(e) => { setCid(e.target.value) }}>
                        <option value="Absent">select</option>
                        {
                            courses.map((key) => {
                                return (
                                    <option value={key.c_id}>{key.name}</option>
                                )
                            })
                        }


                    </Form.Select>
                    </Col>
                </Row>
                <Row>
                <Col>
                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control onChange={(e) => { setDescription(e.target.value) }} placeholder="Description" />
                        </Form.Group>
                    </Col>
                </Row>
                    
                

                <Button className='mt-3' onClick={submitForm} variant="primary">
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

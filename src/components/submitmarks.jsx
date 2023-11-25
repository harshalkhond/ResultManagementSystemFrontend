import React from 'react'
import { Row, Col, Form, Container } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/Spinner';
import { API } from '../API/apis.ts'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
export const Submitmarks = () => {
    const apis = new API();
    const [stddata, setStdData] = useState({});
    const [courseid, setCourseid] = useState(0);
    const [subject, setSubject] = useState([]);
    const [subjectdata, setSubjectData] = useState({});
    const [marks, setMarks] = useState({});
    const [loading, setLoading] = useState(false);
    const [roll, setRoll] = useState(true);
    const [showcourse, setShowCourse] = useState(false);
    //console.log(stddata);
    //console.log(courseid);
    // useEffect(() => { 
    //         const fetchData = async () => {
    //         try {
    //             const { data: response } = await apis.fetchStudentData(101);
    //             setStdData(response.students[0]);
    //             let dt = response.students[0];
    //             setCourseid(dt.c_id);
    //         } catch (error) {
    //             //console.error(error.message);
    //         }
    //         try {
    //             const { data: response } = await apis.fetchSubjects(1);
    //             let arr = []
    //             let subdata=subjectdata;
    //             response.students.map((key)=>{
    //                 subdata[key.sub_name]=key.sub_id;
    //                 arr.push(key.sub_name);
    //                 console.log(subdata);
    //             })
    //             let ept=[]
    //             setSubjectData(subdata);
    //             setSubject([...ept,...arr]);
    //             //console.log(response.students)
    //         } catch (error) {
    //             //console.error(error.message);
    //         }
    //         setLoading(false);
    //     }
    //     fetchData();
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])
    //console.log(subjectdata);
    let c_id = 0;
    const getSubjectsData = async () => {
        try {
            const { data: response } = await apis.fetchStudentData(roll);
            setStdData(response.students[0]);
            let dt = response.students[0];
            c_id = dt.c_id;
            setCourseid(dt.c_id);
        } catch (error) {
            //console.error(error.message);
        }
        try {
            const { data: response } = await apis.fetchSubjects(c_id);
            let arr = []
            let subdata = subjectdata;
            response.students.map((key) => {
                subdata[key.sub_name] = key.sub_id;
                arr.push(key.sub_name);
                console.log(subdata);
            })
            let ept = []
            setSubjectData(subdata);
            setSubject([...ept, ...arr]);
            //console.log(response.students)
        } catch (error) {
            //console.error(error.message);
        }
        setShowCourse(true);
    }

    const handleclick = () => {
        //console.log(marks);
        let marksdata = [];
        console.log(subjectdata);
        for (let x in marks) {
            marksdata.push({
                "sub_id": subjectdata[x],
                "std_id": roll,
                "marks": marks[x],
                "sub_name": x
            })
        }
        apis.saveSubjectMarks(marksdata);
        console.log(marksdata);
    }
    console.log(stddata);
    console.log(courseid);
    return (
        <>{!loading ?
            <Container className='py-3' style={{ fontFamily: "Open Sans", backgroundColor: "#e9ecef", borderRadius: "12px" }}>
                <Form className='mb-2'>
                    <Row className='mb-2'>
                        <Col>
                            <Form.Label>Roll No</Form.Label>
                            <Form.Control placeholder='Roll no' onChange={(e) => { setRoll(e.target.value) }} />
                        </Col>
                        <Col>
                            <Form.Label></Form.Label> <br />
                            <Button className='mt-2' style={{backgroundColor:"#49b6ff"}} onClick={getSubjectsData}>Get Subjects</Button>

                        </Col>
                    </Row> <hr />
                    {showcourse ?
                        <>
                            
                            <Row>
                                <Col>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>Sr no</th>
                                                <th>Subject</th>
                                                <th>Marks Obtained</th>
                                                <th>Total Marks</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {subject.map((key, i) => (<tr>
                                                <td>{i + 1}</td>
                                                <td>{key}</td>
                                                <td><Form.Control type='number' placeholder='Enter marks' onChange={(e) => { let x = marks; x[key] = parseInt(e.target.value); setMarks(x); }} /></td>
                                                <td>100 </td>
                                            </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                            <Row>
                                <Col className='col-2'></Col>
                                <Col>
                                    <Button className='mt-3'  style={{backgroundColor:"#49b6ff"}} onClick={handleclick}>Submit</Button>
                                </Col>
                            </Row></> : <></>
                    }
                </Form>
            </Container> : <Spinner animation="border" variant="primary" />
        }</>
    )
}

/* eslint-disable array-callback-return */
import React, { useState } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { useEffect } from 'react';
import { Chart } from "react-google-charts";
import { API } from '../API/apis.ts';
import { options, baroptions } from '../Constants/PiechartData';
import { Home } from 'lucide-react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Spinner from 'react-bootstrap/Spinner';
import { Percent } from 'lucide-react';
import { BadgePercent } from 'lucide-react';
import { BookA } from 'lucide-react';
import { ScrollText } from 'lucide-react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

export const NewDashboard = () => {
    const apis = new API();
    const [dataBar, setdataBar] = useState([]);
    const [dataPie, setdataPie] = useState([]);
    const [subject, setSubject] = useState([]);
    const [marks, setMarks] = useState([]);
    const [notices, setNotices] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [teacheername, setteachername] = useState("");
    const [stddata, setStdData] = useState({});
    const [prdata, setPrData] = useState({});
    const [present, setPresent] = useState({});
    const [absent, setAbsent] = useState({});
    const [courseid, setCourseid] = useState(0);
    const [course, setCourse] = useState("");
    const [loading, setLoading] = useState(true);
    const styles = { backgroundColor: "#A084E8", color: "black", border: "1px solid #A084E8", borderRadius: "26px" };
    useEffect(() => {

        const fetchData = async () => {

            setTimeout(() => {
                setLoading(false);
            }, 1000);
            let cid = 0;
            try {
                const { data: response } = await apis.fetchStudentData(101);
                setStdData(response.students[0]);
                let dt = response.students[0];
                setCourseid(dt.c_id);
                cid = dt.c_id;
            } catch (error) {
                console.error(error.message);
            }
            try {
                const { data: response } = await apis.getParentsData(10101);
                setPrData(response.students[0]);
                console.log(response.students);
            } catch (error) {
                console.error(error.message);
            }
            try {
                const { data: response } = await apis.fetchSubjectMarks(101);
                setMarks(response.students);
            } catch (error) {
                console.error(error.message);
            }
            try {
                const { data: response } = await apis.fetchStudentResult(101);
                let arr = []
                arr.push(["Exam", "marks"])
                response.students.map((key) => {
                    arr.push([key.name, key.marks]);
                })
                setdataBar(arr);
            } catch (error) {
                console.error(error.message);
            }
            try {
                const { data: response } = await apis.fetchAttendanceCount(101);
                setdataPie([
                    ["Present", "Absent"],
                    ["Present", response.Present],
                    ["Absent", response.Absent],
                ])
                setPresent(response.Present);
                setAbsent(response.Absent);
            } catch (error) {
                console.error(error.message);
            }
            try {
                const { data: response } = await apis.fetchSubjects(courseid);
                setSubject(response.students);
                //console.log(response.students)
            } catch (error) {
                console.error(error.message);
            }
            try {
                const { data: response } = await apis.getCourses(cid);
                setCourse(response.students[0].name);
                //console.log(response)
            } catch (error) {
                console.error(error.message);
            }
            try {
                const { data: response } = await apis.getNotices(cid);
                setNotices(response.students);
                //console.log(response)
            } catch (error) {
                console.error(error.message);
            }
            try {
                const { data: response } = await apis.getTasks(cid);
                setTasks(response.students);
                //console.log(response)
            } catch (error) {
                console.error(error.message);
            }
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    // console.log(subject)
    console.log(tasks)
    return (
        <>
            <Container className='px-3 py-3' style={{ fontFamily: "Open Sans", backgroundColor: "#e9ecef", color:"white" , borderRadius: "12px" }}>
                <Row >
                    <Col className='col-1 py-2 mx-3' style={{ backgroundColor: "#815ac0", borderRadius: "12px" }}>
                        <Home className='mx-3' />

                    </Col>
                    <Col className='col-1 py-2' style={{ color: "black" }}>
                        <span>DashBoard</span>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card.Body className='my-4 px-4 py-4' style={{ backgroundColor: "#ff477e", borderRadius: "12px" }}>
                            <Card.Title>Attendance
                                <span style={{ float: "right" }}><BookA /></span></Card.Title>
                            <b><h4 className='py-3'>{((present / (absent + present)) * 100).toFixed(2)} <Percent /> </h4></b>
                            <h5>Class 6</h5>
                        </Card.Body>
                    </Col>
                    <Col>
                        <Card.Body className='my-4 px-4 py-4' style={{ backgroundColor: "#6e44ff", borderRadius: "12px" }}>
                            <Card.Title>Overall Percentage
                                <span style={{ float: "right" }}><BadgePercent /></span></Card.Title>
                            <b><h4 className='py-3'>{stddata.Percentage} <Percent /> </h4></b>
                            <h5>Class 6</h5>
                        </Card.Body>
                    </Col>
                    <Col>
                        <Card.Body className='my-4 px-4 py-4' style={{ backgroundColor: "#49b6ff", borderRadius: "12px" }}>
                            <Card.Title>{stddata.fname} {stddata.lname}
                                <span style={{ float: "right" }}><ScrollText /></span></Card.Title>
                            <b><h4 className='py-3'>{stddata.RollNo} </h4></b>
                            <h5>Class 6</h5>
                        </Card.Body>
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col style={{ borderRadius: "26px" }}>
                    <h4 style={{color:"black"}}>Attendance</h4>
                        <Chart
                            chartType="PieChart"
                            data={dataPie}
                            options={options}
                            width={"100%"}
                            height={"260px"}

                        />
                    </Col>
                    <Col style={{ borderRadius: "26px" }}>
                    <h4 style={{color:"black"}}>Marks</h4>
                        <Chart
                            chartType="Bar"
                            data={dataBar}
                            options={baroptions}
                            width={"100%"}
                            height={"260px"}
                            style={{ borderRadius: "26px" }}
                        />
                    </Col>
                </Row>
                <Row className='my-5'>
                    <Col className='col-7'>
                        <Table hover>
                            <thead>
                                <tr>
                                    <th>Sr no</th>
                                    <th>Subject</th>
                                    <th>Marks</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {marks.map((key,i) => (    <tr>
                                    <td>{i+1}</td>
                                    <td>{key.sub_name}</td>
                                    <td colSpan={2}><ProgressBar variant={key.marks > 70 ? "success" : (key.marks > 40 & key.marks <= 70 ? "warning" : "danger")} now={key.marks} label={key.marks} /></td>
                                </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                    <Col>
                    <Table hover>
                            <thead>
                                <tr>
                                    <th>Recent Notices</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                            {notices.map((key,i) => (    <tr>
                                    <td>{key.noticeheadline}</td>
                                </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Table hover>
                            <thead>
                                <tr>
                                    <th>Sr no</th>
                                    <th>Task</th>
                                    <th>Assignee</th>
                                    <th>status</th>
                                    <th>Due Date</th>
                                </tr>
                            </thead>
                            <tbody>
                            {tasks.map((key,i) => (    <tr>
                                    <td>{i+1}</td>
                                    <td>{key.description}</td>
                                    <td>{key.assignee}</td>
                                    <td><Badge bg={key.status === "done"?"success":(key.status === "overdue"?"danger":"warning")}>{key.status}</Badge> </td>
                                    <td>{key.duedate} </td>
                                </tr>
                                ))}
                            </tbody>
                        </Table>    
                    </Col>
                </Row>
            </Container>
        </>
    )
}

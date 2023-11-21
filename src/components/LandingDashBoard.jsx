/* eslint-disable array-callback-return */
import React, { useState } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { useEffect } from 'react';
import { Chart } from "react-google-charts";
import { API } from '../API/apis.ts';
import { options, baroptions } from '../Constants/PiechartData';
import { Image } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Spinner from 'react-bootstrap/Spinner';

export const LandingDashBoard = () => {
    const apis = new API();
    const [dataBar, setdataBar] = useState([]);
    const [dataPie, setdataPie] = useState([]);
    const [subject, setSubject] = useState([]);
    const [marks, setMarks] = useState([]);
    const [stddata, setStdData] = useState({});
    const [prdata, setPrData] = useState({});
    const [present, setPresent] = useState({});
    const [absent, setAbsent] = useState({});
    const [courseid, setCourseid] = useState(0);
    const [course, setCourse] = useState("");
    const [loading, setLoading] = useState(true);
    const styles ={backgroundColor:"#A084E8",color: "black", border: "1px solid #A084E8", borderRadius: "26px" };
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
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    console.log(subject)
    console.log(prdata)
    return (
        <>{ loading?<Spinner className='position-absolute top-50 start-50 translate-middle' animation="grow" variant="primary" />:
        <Container className='py-3' style={{backgroundColor:"#793FDF", border: "4px solid", borderRadius: "24px" }}>
            <Container className='mt-3' style={styles}>
                <Row className='mb-2'>
                    <Col className='col-2 mr-3 mt-2'>
                        <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaCefNhcreE7nO0DZtNjF5vS907o0OTt-7XJ0yvjEVDg&s" roundedCircle style={{ border: "2px solid black" }} />
                    </Col>
                    <Col className='col-3 mt-4'>
                        <b><h3>{stddata.fname} {stddata.lname}</h3></b>
                        <span>{stddata.designation}</span>
                    </Col>
                    <Col className='col-2 float-right  mt-4'>
                        <h1>{stddata.Percentage}</h1>
                        <h5 style={{ textShadow: "1px 1px 2px" }}>Percentage</h5>
                    </Col>
                    <Col className='col-2 float-right  mt-4 px-2'>
                        <h1>{((present / (absent + present)) * 100).toFixed(2)}%</h1>
                        <h5 style={{ textShadow: "1px 1px 2px" }}>Attendance</h5>
                    </Col>
                    <Col className='col-2 float-right  mt-4 mx-4'>
                        <h1>{stddata.RollNo}</h1>
                        <h5 style={{ textShadow: "1px 1px 2px" }}>RollNo</h5>
                    </Col>
                </Row>
            </Container>
            <Row className='mt-3'>
                <Col className='Col-6'>
                    <Card  style={styles}>
                        <Card.Body>
                            <Card.Title> <b> Students Data </b></Card.Title>
                                <h5>DOB : {stddata.dob}</h5>
                                <h5>Mobile : {stddata.phone}</h5>
                                <h5>Email : {stddata.email}</h5>
                                <h5>Reports to : {stddata.Reportsto}</h5>
                        </Card.Body>
                        
                    </Card>
                </Col>
                <Col className='Col-6'>
                    <Card style={styles}>
                        <Card.Body>
                            <Card.Title> <b> Parents Data </b></Card.Title>
                            <h5>DOB : {prdata.fname} {prdata.lname}</h5>
                                <h5>Mobile : {prdata.mobile}</h5>
                                <h5>Email : {prdata.email}</h5>
                                <h5>Alternate mobile : {prdata.phone}</h5>
                        </Card.Body>
                        
                    </Card>
                </Col>
            </Row>
            <Row className='mt-3'>
                <Col className='Col-6'>
                    <Card style={{border: "1px solid #A084E8", borderRadius: "26px"}}>
                        <Card.Body>
                            <Card.Title>Attendance</Card.Title>

                        </Card.Body>
                        <Chart
                            chartType="PieChart"
                            data={dataPie}
                            options={options}
                            width={"100%"}
                            height={"200px"}
                            style={{border: "1px solid #A084E8", borderRadius: "26px"}}
                        />
                    </Card>
                </Col>
                <Col className='Col-6'>
                    <Card>
                        <Card.Body>
                            <Card.Title>Marks</Card.Title>

                        </Card.Body>
                        <Chart
                            chartType="Bar"
                            data={dataBar}
                            options={baroptions}
                            width={"100%"}
                            height={"200px"}
                        />
                    </Card>
                </Col>
            </Row>
            <Container className='my-5 pb-3 pt-1' style={styles}>
                {marks.map((key) => (
                    <Row className='mt-3'>
                        <Col className='col-1'>
                            {key.sub_name}
                        </Col>
                        <Col className='col-9 mt-1'>
                            <ProgressBar variant={key.marks > 70 ? "success" : (key.marks > 40 & key.marks <= 70 ? "warning" : "danger")} now={key.marks} label={key.marks} />
                        </Col>
                    </Row>
                ))}
            </Container>

        </Container>}
        </>
    )
}

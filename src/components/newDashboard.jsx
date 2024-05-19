/* eslint-disable array-callback-return */
import React, { useState } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { useEffect } from 'react';
import { Chart } from "react-google-charts";
import { API } from '../API/apis.ts';
import { options, baroptions } from '../Constants/PiechartData';
import { Home } from 'lucide-react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Percent } from 'lucide-react';
import { BadgePercent } from 'lucide-react';
import { BookA } from 'lucide-react';
import { ScrollText } from 'lucide-react';
import Table from 'react-bootstrap/Table';
import Collapse from 'react-bootstrap/Collapse';
import Badge from 'react-bootstrap/Badge';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import './newdashboard.css';
import { useSelector } from 'react-redux';
// import { useMediaPredicate } from "react-media-hook";

export const NewDashboard = (props) => {
    const navigate = useNavigate();
    const data = useSelector((state) => state.value);
    console.log(data)
    if (!data.hasOwnProperty('tasks')){
        navigate('/')
    }
    const apis = new API();
    const [open, setOpen] = useState(false);
    const [imgurl, setImgurl] = useState("");
    useEffect(() => {
        const tokens = JSON.parse(localStorage.getItem('token'));
        if (tokens == null) {
            navigate('/login')
        }
        setImgurl(data.students.image_url);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const logoutUser = () => {
        apis.logout();
        navigate('/login');
    }
    // const biggerThan768 = useMediaPredicate("(min-width: 768px)");
    // const biggerThan406 = useMediaPredicate("(min-width: 406px)");
    return (
        <>
            <Container className='px-3 py-3' style={{ fontFamily: "Open Sans", backgroundColor: "#e9ecef", color: "white", borderRadius: "12px" }}>
                <Row >
                    <Col className='col py-2 mx-3' style={{ borderRadius: "12px", maxWidth: "47px" }}>
                        <Home className='' style={{ color: "black", width: "40px", height: "40px" }} />

                    </Col>
                    <Col className='col-10 py-1' style={{ color: "black" }}>
                        <b> <span style={{ fontSize: "30px", paddingTop: "5px" }} >DashBoard</span></b>
                        <div class="dropdown" style={{ color: "black", float: "right" }}>
                            <span >
                                <img src={"http://localhost:9090" + imgurl} alt="img" style={{ width: "55px", height: "55px", borderRadius: "50%" }} />
                            </span>
                            <div class="dropdown-content">
                            <p><Link to={{ pathname: '/profile', state: "data.students" }} style={{textDecoration:"none", color:"black"}}>Profile</Link> </p>
                                <p>Scorecards</p>
                                <p onClick={logoutUser}>Logout</p>
                            </div>
                        </div>
                    </Col>

                </Row>
                <Row>
                    <Col>
                        <Card.Body className='my-4 px-4 py-4' style={{ backgroundColor: "#ff477e", borderRadius: "12px" }}>
                            <Card.Title>Attendance
                                <span style={{ float: "right" }}><BookA /></span></Card.Title>
                            <b><h4 className='py-3'>{((data.present / (data.absent + data.present)) * 100).toFixed(2)} <Percent /> </h4></b>
                            <h5>Class 6</h5>
                        </Card.Body>
                    </Col>
                    <Col>
                        <Card.Body className='my-4 px-4 py-4' style={{ backgroundColor: "#6e44ff", borderRadius: "12px" }}>
                            <Card.Title>Overall Percentage
                                <span style={{ float: "right" }}><BadgePercent /></span></Card.Title>
                            <b><h4 className='py-3'>{data.students.Percentage} <Percent /> </h4></b>
                            <h5>Class 6</h5>
                        </Card.Body>
                    </Col>
                    <Col>
                        <Card.Body className='my-4 px-4 py-4' style={{ backgroundColor: "#49b6ff", borderRadius: "12px" }}>
                            <Card.Title>{data.students.fname} {data.students.lname}
                                <span style={{ float: "right" }}><ScrollText onClick={() => setOpen(!open)} aria-controls="example-collapse-text" aria-expanded={open} /></span></Card.Title>
                            <b><h4 className='py-3'>{data.students.RollNo} </h4></b>
                            <h5>Class 6</h5>
                        </Card.Body>
                    </Col>
                </Row>
                <Collapse in={open}>
                    <div id="example-collapse-text">
                        <Row>
                            <Col>
                                <Table hover>
                                    <thead >
                                        <tr>
                                            <th style={{ backgroundColor: "#ff477e", color: "white" }}>Student Info</th>
                                            <th style={{ backgroundColor: "#ff477e" }}></th>
                                            <th style={{ backgroundColor: "#ff477e" }}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><b>Date of Birth</b></td>
                                            <td colSpan={2}>{data.students.dob}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Mobile Number</b></td>
                                            <td colSpan={2}>{data.students.phone}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Email Id</b></td>
                                            <td colSpan={2}>{data.students.email}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Reports To</b></td>
                                            <td colSpan={2}>{data.students.Reportsto}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                            <Col>
                                <Table hover>
                                    <thead>
                                        <tr>
                                            <th style={{ backgroundColor: "#49b6ff", color: "white" }}> Parents Info</th>
                                            <th style={{ backgroundColor: "#49b6ff", color: "white" }}></th>
                                            <th style={{ backgroundColor: "#49b6ff", color: "white" }}></th>
                                        </tr>
                                    </thead>
                                    {Object.entries(data.parents).length !== 0 ?
                                        <tbody>
                                            <tr>
                                                <td><b>Name</b></td>
                                                <td colSpan={2}>{data.parents.fname} {data.parents.lname}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Mobile Number</b></td>
                                                <td colSpan={2}>{data.parents.mobile}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Email Id</b></td>
                                                <td colSpan={2}>{data.parents.email}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Alternate mobile</b></td>
                                                <td colSpan={2}>{data.parents.phone}</td>
                                            </tr>
                                        </tbody>
                                        :
                                        <tbody>
                                            <tr>
                                                <td style={{ color: "red" }} colSpan={2}>Parents data not Present</td>
                                            </tr>
                                        </tbody>
                                    }
                                </Table>
                            </Col>
                        </Row>

                    </div>
                </Collapse>
                <Row className='mt-3'>
                    <Col style={{ borderRadius: "26px" }}>
                        <h4 style={{ color: "black" }}>Attendance</h4>
                        {(data.absent === 0 && data.present === 0) ? <h6 style={{ color: "red" }}>Attendance is not marked yet</h6> : <Chart
                            chartType="PieChart"
                            data={data.datapie}
                            options={options}
                            width={"100%"}
                            height={"260px"}

                        />
                        }
                    </Col>
                    <Col style={{ borderRadius: "26px" }}>
                        <h4 style={{ color: "black" }}>Marks</h4>
                        <Chart
                            chartType="Bar"
                            data={data.databar}
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
                                {data.marks.map((key, i) => (<tr>
                                    <td>{i + 1}</td>
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
                                {data.notice.map((key, i) => (<tr>
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
                                {data.tasks.map((key, i) => (<tr>
                                    <td>{i + 1}</td>
                                    <td>{key.description}</td>
                                    <td>{key.assignee}</td>
                                    <td><Badge bg={key.status === "done" ? "success" : (key.status === "overdue" ? "danger" : "warning")}>{key.status}</Badge> </td>
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

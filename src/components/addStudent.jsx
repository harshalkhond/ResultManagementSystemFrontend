/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-globals */
import React, { useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button';
import { useEffect } from 'react';
import { API } from '../API/apis.ts';
import Badge from 'react-bootstrap/esm/Badge';
export const AddStudent = () => {
    const [course, setCourse] = useState(0);
    const [name, setName] = useState("");
    const [roll, setRoll] = useState(0);
    const [clas, setClas] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [dob, setDOB] = useState("");
    const [phnum, setPhnum] = useState("");
    const [mobnum, setMobnum] = useState("");
    const [ParentId, setParentId] = useState("");
    const [active, setActive] = useState(true);
    const [userpassword, setUserpassword] = useState("");
    const [designation, setDesignation] = useState("");
    const [email, setEmail] = useState("");
    const [reports, setReports] = useState("");
    const [Username, setUserame] = useState("")
    const [Password, setPassword] = useState("")
    const [authenticated, setAuthenticated] = useState(false);
    const [coursesub, setCourseSub] = useState([]);
    const [courses, setCourses] = useState([]);
    const [show, setShow] = useState(false);


    const apis = new API();

    useEffect(() => {
        const fetchData = async () => {

            let teacheropt = "<option key='student' value='select'>Select</option>";
            try {
                const { data: response } = await apis.getCourses();
                setCourses(response.students);
            } catch (error) {
                console.error(error.message);
            }
            try {
                const { data: response } = await apis.fetchTeachersData();
                console.log(response.students);
                let std = response.students;
                console.log(std);
                for (let key in std) {
                    console.log(key);
                    teacheropt += "<option key=" + std[key].tr_id + " value=" + std[key].fname + " " + std[key].lname + ">" + std[key].fname + " " + std[key].lname + "</option>";
                }
                document.getElementById('reportsDropdown').innerHTML = teacheropt;
                console.log(response.students)

            } catch (error) {
                console.error(error.message);
            }
        }
        fetchData();
    }, [])

    console.log(coursesub);



    const submitData = () => {
        if (authenticated) {
            let data = {
                "Name": name,
                "RollNo": roll,
                "Class": clas,
                "Reportsto": reports,
                "email": email,
                "fname": fname,
                "lname": lname,
                "dob": dob,
                "phone": phnum,
                "mobile": mobnum,
                "p_id": ParentId,
                "status": active,
                "password": userpassword,
                "designation": designation,
                "c_id": course
            }
            console.log(data);
            apis.SubmitStudentData(data).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
            alert("Data Submitted Successfully");
        }
    }

    const authenticate = () => {
        if (Username === "admin" && Password === "admin") {
            setAuthenticated(true);
            alert("Authentication Successful");
        } else {
            setAuthenticated(false);
        }
    }
    console.log(authenticated);
    console.log(coursesub)


    const showSubjects = async (e) => {
        setCourse(e.target.value);
        try {
            const { data: response } = await apis.fetchSubjects(e.target.value);
            console.log(response.students);
            setCourseSub(response.students);

        } catch (error) {
            console.error(error.message);
        }
        setShow(true);
    }
    console.log(coursesub)
    return (

        <>
            <Container className='text-white py-3'  style={{fontFamily: "Open Sans", backgroundColor: "#e9ecef" , borderRadius: "12px" }}>
                <Form className='mb-5' style={{color:"black"}}>
                    <Row>
                        <Col xs={7}>
                            <Form.Label>Username</Form.Label>
                            <Form.Control placeholder="Enter UserName" onChange={(e) => { setUserame(e.target.value) }} />
                        </Col>
                        <Col>
                            <Form.Label>Password</Form.Label>
                            <Form.Control placeholder="Enter Password" onChange={(e) => { setPassword(e.target.value) }} />
                        </Col>
                        <Col>
                            <Form.Label></Form.Label>
                            <br />   <Button className='mt-2' onClick={authenticate}>Authenticate</Button>
                        </Col>
                    </Row>

                </Form>


                <Form className='mb-3' style={{color:"black"}}>
                    <Form.Label> <h4> Student Data </h4></Form.Label>
                    <Row>
                        <Col className='col-4'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control placeholder="Enter Name" onChange={(e) => { setName(e.target.value) }} />
                        </Col>
                        <Col>
                            <Form.Label>Roll No</Form.Label>
                            <Form.Control type='number' placeholder="Enter Roll No" onChange={(e) => { setRoll(e.target.value) }} />
                        </Col>
                        <Col>
                            <Form.Label>Class</Form.Label>
                            <Form.Control placeholder="Enter Class" onChange={(e) => { setClas(e.target.value) }} />
                        </Col>
                    </Row>
                </Form>

                <Form className='mb-3' style={{color:"black"}}>

                    <Row>
                        <Col className='col-4'>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control placeholder="Enter First Name" onChange={(e) => { setFname(e.target.value) }} />
                        </Col>
                        <Col>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control placeholder="Enter Last Name" onChange={(e) => { setLname(e.target.value) }} />
                        </Col>
                        <Col>
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control placeholder="Enter Date of Birth" onChange={(e) => { setDOB(e.target.value) }} />
                        </Col>
                    </Row>
                </Form>

                <Form className='mb-3' style={{color:"black"}}>

                    <Row>
                        <Col className='col-4'>
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control placeholder="Enter Phone Number" onChange={(e) => { setPhnum(e.target.value) }} />
                        </Col>
                        <Col>
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control placeholder="Enter Mobile Number" onChange={(e) => { setMobnum(e.target.value) }} />
                        </Col>
                        <Col>
                            <Form.Label>Parent Id</Form.Label>
                            <Form.Control placeholder="Enter Parent Id" onChange={(e) => { setParentId(e.target.value) }} />
                        </Col>
                    </Row>
                </Form> 
                <Form className='mb-3' style={{color:"black"}}>

                    <Row>
                        <Col className='col-4'>
                            <Form.Label>Active</Form.Label>
                            <Form.Select aria-label="is user active" onChange={(e) => { setActive(e.target.value) }}>
                                <option value="Select">Select</option>
                                <option value="True">True</option>
                                <option value="False">False</option>
                            </Form.Select>
                        </Col>
                        <Col>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' placeholder="Enter Password" onChange={(e) => { setUserpassword(e.target.value) }} />
                        </Col>
                        <Col>
                            <Form.Label>Designation</Form.Label>
                            <Form.Select aria-label="Designation" onChange={(e) => { setDesignation(e.target.value) }}>
                                <option value="select">Select</option>
                                <option value="Student">Student</option>
                                <option value="Teacher">Teacher</option>
                                <option value="Parent">Parent</option>
                            </Form.Select>
                        </Col>
                    </Row>
                    <Row className='mt-3'>

                        <Col className='col-4'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' placeholder="Enter email id" onChange={(e) => { setEmail(e.target.value) }} />
                        </Col>
                        <Col>
                            <Form.Label>Course</Form.Label>
                            <Form.Select id='coursedropdown' aria-label="Courses" onChange={showSubjects}>
                                <option key='student' value='select'>Select</option>
                                {courses.map((key) => {
                                    return (
                                        <option key={key.c_id} value={key.c_id}>{key.name}</option>
                                    )
                                })}

                            </Form.Select>
                        </Col>
                        <Col>
                            <Col>
                                <Form.Label>Reports to</Form.Label>
                                <Form.Select id='reportsDropdown' aria-label="Designation" onChange={(e) => { setReports(e.target.value) }}>
                                </Form.Select>
                            </Col>
                        </Col>

                    </Row>
                    {show ?
                        <>
                            <Row className='mt-3'>
                                <Col className='col-2'>
                                    <Badge bg="primary">Subjects</Badge>
                                </Col>
                                {coursesub.map((key) => {
                                    return (<Col className='col-2'> <Badge bg="primary">{key.sub_name}</Badge> </Col>)
                                })
                                }</Row></> : <></>}
                    <Row>
                        <Col>
                            <Form.Label>  </Form.Label>
                            <Button onClick={submitData} style={{ marginTop: "24px" }}>Update</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </>

    )
}

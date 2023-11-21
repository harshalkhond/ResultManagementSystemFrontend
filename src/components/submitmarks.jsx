import React from 'react'
import { Row,Col, Form, Container } from 'react-bootstrap'
import { useEffect , useState } from 'react'
import Spinner from 'react-bootstrap/Spinner';
import { API } from '../API/apis.ts'
import Button from 'react-bootstrap/Button';
export const Submitmarks = () => {
    const apis = new API();
    const [stddata, setStdData] = useState({});
    const [courseid, setCourseid] = useState(0);
    const [subject, setSubject] = useState([]);
    const [subjectdata, setSubjectData] = useState({});
    const [marks, setMarks] = useState({});
    const [loading, setLoading] = useState(false);
    const [roll, setRoll] = useState(true);
    const [showcourse,setShowCourse]=useState(false);
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
    let c_id =0;
    const getSubjectsData = async ()=>{
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
            let subdata=subjectdata;
            response.students.map((key)=>{
                subdata[key.sub_name]=key.sub_id;
                arr.push(key.sub_name);
                console.log(subdata);
            })
            let ept=[]
            setSubjectData(subdata);
            setSubject([...ept,...arr]);
            //console.log(response.students)
        } catch (error) {
            //console.error(error.message);
        }
        setShowCourse(true);
    }
    
    const handleclick = ()=>{
        //console.log(marks);
        let marksdata = [];
        console.log(subjectdata);
        for (let x in marks){
            marksdata.push({
                "sub_id":subjectdata[x],
                "std_id":roll,
                "marks":marks[x],
                "sub_name":x
            })
        }
        apis.saveSubjectMarks(marksdata);
        console.log(marksdata);
    }
    console.log(stddata);
    console.log(courseid);
  return (
    <>{ !loading ?
    <Container className='bg-dark text-white pt-3' style={{ border: "2px solid black", borderRadius: "12px" }}>
    <Form className='mb-5'>
        <Row className='mb-2'>
            <Col>
                <Form.Label>Roll No</Form.Label>
                <Form.Control placeholder='Roll no' onChange={(e)=>{setRoll(e.target.value)}}/>
            </Col>
            <Col>{
                showcourse ? <> <Form.Label>Course</Form.Label> <br />
                <Button>{courseid}</Button></> :<><br /><Button className='mt-2' onClick={getSubjectsData}>Get Subjects</Button></> 
            }
            </Col>
        </Row> <hr />
        { showcourse?
            <>
        <Row className='mt-4 mb-3'>
            
            <Col className='text-center'>
                <Form.Label>Subject</Form.Label>
            </Col>
            <Col className='text-center'>
                <Form.Label>Marks</Form.Label>
            </Col>
            <Col></Col>
        </Row>
       
        {subject.map((key)=>{ 
            return(
                <Row className='mb-2'>

                <Col className='mt-2 text-center'>
                    <Form.Label>{key}</Form.Label>
                  </Col>
                <Col>
                    <Form.Control type='number' placeholder='Enter marks' onChange={(e)=>{let x=marks; x[key]=parseInt(e.target.value); setMarks(x);}}/>
                </Col>
                <Col></Col>
            </Row>)
        })
        }
        <Row>
            <Col className='col-2'></Col>
            <Col>
                <Button className='mt-3'onClick={handleclick}>Submit</Button>
            </Col>
        </Row></>:<></>
}
    </Form>
    </Container>:<Spinner animation="border" variant="primary" />
}</>
  )
}

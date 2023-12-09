/* eslint-disable array-callback-return */
import React from 'react'
import { useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner'; 
import { useSelector, useDispatch } from 'react-redux'
import { updateData } from '../redux/counterrSlice'
import { API } from '../API/apis.ts';
import { useNavigate } from 'react-router-dom';

export const LoadData = (props) => {
    const apis = new API();
    const navigate = useNavigate();
    const data = useSelector((state) => state.value)
    // console.log(data);
    const dispatch = useDispatch()
    if (data.hasOwnProperty('tasks')){
        props.state(9)
    }
    useEffect(() => {
        const tokens = JSON.parse(localStorage.getItem('token'));
        const roll = JSON.parse(localStorage.getItem('username'));
        if (tokens == null) {
            navigate('/login')
        }
        const fetchData = async () => {
            let cid = 0;
            let pid = 0;
            try {
                const { data: response } = await apis.fetchStudentData(roll);
                dispatch(updateData([response.students[0],'students']));
                let dt = response.students[0];
                pid = dt.p_id;
                cid = dt.c_id;
            } catch (error) {
                console.error(error.message);
            }
            try {
                const { data: response } = await apis.getParentsData(pid);
                dispatch(updateData([response.students[0],'parents']));
            } catch (error) {
                console.error(error.message);
            }
            try {
                const { data: response } = await apis.fetchSubjectMarks(roll);
                dispatch(updateData([response.students,'marks']));
            } catch (error) {
                console.error(error.message);
            }
            try {
                const { data: response } = await apis.fetchStudentResult(roll);
                let arr = []
                arr.push(["Exam", "marks"])
                response.students.map((key) => {
                    arr.push([key.name, key.marks]);
                })
                dispatch(updateData([arr,'databar']));
            } catch (error) {
                console.error(error.message);
            }
            try {
                const { data: response } = await apis.fetchAttendanceCount(roll);
                dispatch(updateData([response.Present,'present']));
                dispatch(updateData([response.Absent,'absent']));
                dispatch(updateData([[
                    ["Present", "Absent"],
                    ["Present", response.Present],
                    ["Absent", response.Absent],
                ],'datapie']));
            } catch (error) {
                console.error(error.message);
            }
            try {
                const { data: response } = await apis.fetchSubjects(cid);
                dispatch(updateData([response.students,'subject']));
            } catch (error) {
                console.error(error.message);
            }
            try {
                const { data: response } = await apis.getCourses(cid);
                dispatch(updateData([response.students[0].name,'course']));
            } catch (error) {
                console.error(error.message);
            }
            try {
                const { data: response } = await apis.getNotices(cid);
                dispatch(updateData([response.students,'notice']));
            } catch (error) {
                console.error(error.message);
            }
            try {
                const { data: response } = await apis.getTasks(cid);
                dispatch(updateData([response.students,'tasks']));
            } catch (error) {
                console.error(error.message);
            }
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  return (
    <Spinner style={{position:"absolute", top:"45%",left:"47%"}}/>
  )
}

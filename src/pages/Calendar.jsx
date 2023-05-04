import React from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { fetchGetAll, fetchSetStatus } from "../redux/slices/project.js";

import { BookFill, Briefcase, Calendar2, Calendar2Date, Clock, CloudCheck, Diagram3, Envelope, GenderAmbiguous, GenderFemale, GenderMale, Grid, Paragraph, Person, PersonVcard, Phone, Stopwatch } from 'react-bootstrap-icons'
import Profile from "./Profile.jsx";
import { fetchCreateDepartment } from "../redux/slices/department.js";
import { Calendar, dayjsLocalizer, momentLocalizer } from "react-big-calendar";

import moment from "moment/moment";
const CalenderS = () => {

    const dispatch = useDispatch()

    const localizer = momentLocalizer(moment);

    const { data } = useSelector(state => state.user)

    const { projects } = useSelector(state => state.project)

    const [errorMessage, setErrorMessage] = React.useState('')

    const myEvents = [
        {
          title: "",
          start: "", //new Date(2023, 2, 27, 9, 0),
          end: "", // new Date(2023, 2, 27, 11, 0),
          color: "",
        }
    ]

    React.useEffect(() => {
        dispatch(fetchGetAll())
    }, [])

    const colors =['red', 'green', 'blue', 'orange']

    projects?.items?.forEach((project, i) => {
        myEvents.push({
            title: project?.name,
            start: new Date(new Date(project?.createdAt).getFullYear(), new Date(project?.createdAt).getMonth(),  new Date(project?.createdAt).getDay(), new Date(project?.createdAt).getHours(), new Date(project?.createdAt).getSeconds()),
            end: new Date(new Date(project?.deadline).getFullYear(), new Date(project?.deadline).getMonth(),  new Date(project?.deadline).getDay(), new Date(project?.deadline).getHours(), new Date(project?.deadline).getSeconds()),
            color: colors[i]
        })

       })

    return (<>
        <Container style={{
            margin: '60px auto'
        }}>
            <br />
            <br />
            <Row>
                <h4 style={{
                    color: '#5566FF',
                    margin: '0 0 24px 0 '
                }}>Күнтізбе &nbsp; <Calendar2Date color="#5566FF" style={{
                    fontWeight: '600px'
                }} size={42} /></h4>

                <Row style={{ margin: '24px auto' }}>
                    <hr />
                    <Calendar
                        selectable
                        localizer={localizer}
                        events={myEvents}
                        startAccessor="start"
                        endAccessor="end"
                        eventPropGetter={(myEventsList) => {
                            const backgroundColor = myEventsList.color;

                            return { style: { backgroundColor } };
                        }}
                        style={{ height: 800 }}
                    />
                </Row>

            </Row>
        </Container>
    </>)
}

export default CalenderS
import React from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { fetchGetAll, fetchSetStatus } from "../redux/slices/project.js";

import { BookFill, Briefcase, Calendar2, Calendar2Date, Clock, Cloud, CloudCheck, Diagram3, Envelope, GenderAmbiguous, GenderFemale, GenderMale, Grid, Paragraph, Person, PersonVcard, Phone, Stopwatch } from 'react-bootstrap-icons'
import Profile from "./Profile.jsx";
import { fetchCreateDepartment } from "../redux/slices/department.js";
import { Calendar, dayjsLocalizer, momentLocalizer } from "react-big-calendar";

import moment from "moment/moment";

const Main = () => {

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
                }}>Негізгі бет &nbsp; <Cloud color="#5566FF" style={{
                    fontWeight: '600px'
                }} size={42} /></h4>

                <Row style={{ margin: '24px auto' }}>
                    <hr />
                        <Col md={6} className="d-flex row align-items-center">
                            <div>
                                     <h4>Сіздің бизнесіңіз үшін</h4>
                            <h6>Біздің веб-қосымшамызда өзіңіздің бизнесіңізге арналған  бірнеше көмек ету сервистерін пайдалана аласыз</h6>
                            <button className="signup-btn" style={{
                                padding: '8px 24px'
                            }} onClick={() => {
                                window.location.assign('http://localhost:3000/my-orders')
                            }}>Тапсырыс беру</button>
                            </div>
                                              </Col>
                        <Col md={6} className="text-center">
                            <img src="https://img.freepik.com/free-vector/isometric-crm-illustration_52683-83950.jpg" alt="" />
                        </Col>
                </Row>

            </Row>
        </Container>
    </>)
}

export default Main
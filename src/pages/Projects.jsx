import React from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { fetchGetAll, fetchSetStatus } from "../redux/slices/project.js";

import { BookFill, Briefcase, Calendar, Calendar2, Calendar2Date, Clock, CloudCheck, Diagram3, Envelope, GenderAmbiguous, GenderFemale, GenderMale, Grid, Paragraph, Person, PersonVcard, Phone, Stopwatch } from 'react-bootstrap-icons'
import Profile from "./Profile.jsx";
import { fetchCreateDepartment } from "../redux/slices/department.js";

const Projects = () => {

    const dispatch = useDispatch()

    const { data } = useSelector(state => state.user)

    const { projects } = useSelector(state => state.project)

    const [errorMessage, setErrorMessage] = React.useState('')

    const [name, setName] = React.useState()

    React.useEffect(() => {
        dispatch(fetchGetAll())
    }, [])


    console.log(name && name)
    console.log(projects && projects)

    const status = async (id, status) => {
        await dispatch(
            fetchSetStatus({
                project_id: id,
                status: status
            })
        );
        window.location.assign(`http://localhost:3000/projects`)
    };


    return (<>
        <Container style={{
            margin: '60px auto'
        }}>
            <br />
            <br />
            <Row>
                <h4 style={{
                    color: '#5566FF',
                    margin: '0 0 30px 0 '
                }}>Жобалар &nbsp; <Briefcase color="#5566FF" style={{
                    fontWeight: '600px'
                }} size={42} /></h4>

                <br />
                {data?.role == 'manager' &&
                    <Row>
                        <Col md={12} className="text-end">
                            <button className="signup-btn" onClick={() => { window.location.assign('http://localhost:3000/projects/add') }} style={{
                                padding: '10px 24px'
                            }}>
                                Жаңа жоба қосу
                            </button>
                        </Col>
                    </Row>
                }


                <Row style={{ margin: '24px auto' }}>
                    <hr />
                    {
                        projects?.items?.map((dep, i) => (
                            <Col md={6} style={{ padding: '12px' }} >
                                <div className="d-flex row align-items-center" style={{
                                    border: `1px solid ${dep?.status == 'closed' ? 'green' : "#5667FF"}`,
                                    padding: '24px',
                                    backgroundColor: 'white',
                                    padding: '12px',
                                    height: '600px'
                                }}>

                                    <Row>
                                        <Col md={12}>
                                            <h5>{dep?.name}</h5>

                                            <p><Paragraph size={'28px'} color={dep?.status == 'closed' ? 'green' : "#5667FF"} /> &nbsp; {dep?.description}</p>
                                            <hr />
                                        </Col>

                                        <Col md={12}>
                                            <label>Менеджер</label>
                                            <p><Person size={'28px'} color={dep?.status == 'closed' ? 'green' : "#5667FF"} /> &nbsp; {dep?.manager?.lastname} {dep?.manager?.firstname} {dep?.manager?.patronymic}</p>
                                            <hr />
                                            <label>Жобаға жауапты</label>
                                            <p><Person size={'28px'} color={dep?.status == 'closed' ? 'green' : "#5667FF"} /> &nbsp; {dep?.responsible?.lastname} {dep?.responsible?.firstname} {dep?.responsible?.patronymic}</p>
                                            <hr />
                                            <label>Клиент</label>
                                            <p><Person size={'28px'} color={dep?.status == 'closed' ? 'green' : "#5667FF"} /> &nbsp; {dep?.client?.lastname} {dep?.client?.firstname} {dep?.client?.patronymic}</p>
                                            <hr />
                                            <label>Deadline</label>
                                            <p><Clock size={'28px'} color={dep?.status == 'closed' ? 'green' : "#5667FF"} /> &nbsp; {dep?.deadline?.substring(0, 10)}</p>
                                        </Col>
                                    </Row>
                                    {data?.role == 'manager' &&
                                        <Row>
                                            <Col md={12}>
                                                <button style={{ padding: '8px 24px' , backgroundColor:  dep?.status == 'closed' ? 'green' : "#5667FF"}}
                                                    onClick={() => {
                                                        status(dep?._id,'closed')
                                                    }}
                                                    className="signup-btn">Жобаны аяқтау</button>
                                            </Col>
                                        </Row>
                                    }

                                </div>

                            </Col>
                        ))
                    }
                </Row>

            </Row>
        </Container>
    </>)
}

export default Projects
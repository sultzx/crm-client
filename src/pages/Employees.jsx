import React from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { fetchGetAll, fetchSetStatus } from "../redux/slices/user.js";

import { BookFill, Calendar, Calendar2, Calendar2Date, Envelope, GenderAmbiguous, GenderFemale, GenderMale, Grid, Person, PersonVcard, Phone, Stopwatch } from 'react-bootstrap-icons'
import Profile from "./Profile.jsx";

const Employees = () => {

    const dispatch = useDispatch()

    const { data, all_users } = useSelector(state => state.user)

    const [errorMessage, setErrorMessage] = React.useState('')

    React.useEffect(() => {
        dispatch(fetchGetAll())
    }, [])

    const employees = []

    all_users?.items?.forEach((user, i) => {
        if (user?.role == 'employee') {
            employees.push(user)
        }
    })


    console.log(employees && employees)

    const setStatus = async (id, status) => {
        await dispatch(
            fetchSetStatus({
                status,
                user_id: id
            })
        );

        window.location.assign(`http://localhost:3000/employees`)

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
                }}>Қызметкерлер &nbsp; <PersonVcard color="#5566FF" style={{
                    fontWeight: '600px'
                }} size={42} /></h4>

                <br />
                {
                    employees?.map((emp, i) => (
                        <Col md={12} style={{
                            border: '1px solid #4C5CE8',
                            borderBottom: 'none',
                            padding: '24px',
                            backgroundColor: 'white'
                        }}>

                            <Row>
                                <Col md={2}>
                                    <img src={emp?.avatar ? `http://localhost:5050${emp?.avatar}` :
                                        'https://t3.ftcdn.net/jpg/05/60/26/08/360_F_560260880_O1V3Qm2cNO5HWjN66mBh2NrlPHNHOUxW.jpg'}
                                        style={{ border: '1px solid #4C5CE8' }}

                                        width={'200px'} height={'200px'} alt="" />
                                </Col>
                                <Col md={6} className="d-flex row align-items-center justify-content-start text-start">
                                    <h5>{emp?.lastname} {emp?.firstname} {emp?.patronymic}</h5>
                                    <p><Phone size={'28px'} color="#5667FF" /> &nbsp;{emp?.phone}</p>
                                    <p><Envelope size={'28px'} color="#5667FF" />&nbsp; {emp?.email}</p>
                                    <p>{emp?.gender == 'male' ? <><GenderMale size={'28px'} color="#5667FF" /> &nbsp; Ер</> : emp?.gender == 'female' && <><GenderFemale size={'28px'} color="#5667FF" />&nbsp; Әйел</>}</p>
                                    <p><Calendar2Date size={'28px'} color="#5667FF" />&nbsp; {emp?.birthday?.substring(0, 10)}</p>
                                </Col>

                                <Col md={2} style={{
                                    border: '1px solid #5769FF'
                                }} className="d-flex row align-items-center justify-content-start text-start">
                                    <p><Person size={'28px'} color="#5667FF" />&nbsp; {emp?.bio}</p>
                                </Col>
                                {data?.role == 'manager' && emp?.status == 'inactive' &&
                                    <Col md={2} className="d-flex align-items-end justify-content-end">
                                        <button className="signup-btn"
                                            onClick={() => { setStatus(emp?._id, 'active') }}
                                            style={{
                                                padding: '6px 24px'
                                            }}> Жұмысқа тұрғызу</button>
                                    </Col>
                                }

                                {data?.role == 'manager' && emp?.status == 'active' &&
                                    <Col md={2} className="d-flex align-items-end justify-content-end">
                                        <button className="signup-btn"
                                            onClick={() => { setStatus(emp?._id, 'inactive') }}
                                            style={{
                                                backgroundColor: 'red',
                                                padding: '6px 24px'
                                            }}> Жұмыстан босату</button>
                                    </Col>}
                            </Row>


                            {/* <div className="text-start">
                                <Row>
                                    <Col md={6} className="text-start"><h6 style={{ color: '#5D6EFF' }}>{`№${i + 1} - тапсырыс`} </h6></Col>
                                    <Col md={6} className="text-end"><p>{new Date(order?.createdAt).toISOString().substring(0, 19).replace('T', ' ')}</p></Col>
                                </Row>
                                
                                <h5>{order?.title}</h5>
                                <p><Stopwatch color="#5D6EFF" size="28px" />&nbsp;  {order?.deadline}</p>
                                <p>{order?.description}</p>
                                <p><Calendar2 color="#5D6EFF" size="28px" />&nbsp;&nbsp;  {order?.status == 'opened' ? 'Ашық' : order?.status == 'closed' ? 'Жабық' : 'Көтілуде'}</p>
                                <hr />
                            </div>
                            <div className="text-end">
                                <h6>{order?.performer?.lastname} {order?.performer?.firstname} {order?.performer?.patronymic}</h6>
                                <p>Менеджер &nbsp; <Person color="#5D6EFF" size="28px" /></p>
                                <p> {order?.performer?.email } &nbsp;&nbsp;<Envelope color="#5D6EFF" size="28px" /> </p>
                                <p> {order?.performer?.phone } &nbsp;&nbsp;<Phone color="#5D6EFF" size="28px" /> </p>
                            </div> */}
                        </Col>
                    ))
                }
            </Row>
        </Container>
    </>)
}

export default Employees
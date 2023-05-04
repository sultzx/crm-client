import React from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { fetchGetAll } from "../redux/slices/order.js";

import { Calendar2, Envelope, Grid, Person, Phone, Stopwatch } from 'react-bootstrap-icons'
import Profile from "./Profile.jsx";

const OrderPage = () => {

    const dispatch = useDispatch()

    const { data } = useSelector(state => state.user)

    const { orders } = useSelector(state => state.order)

    const [errorMessage, setErrorMessage] = React.useState('')

    React.useEffect(() => {
        dispatch(fetchGetAll())
    }, [])


    // const onSubmit = async (values) => {
    //     const fetchData = await dispatch(
    //         fetchUpdate({
    //         })
    //     );

    //     dispatch(fetchAuthMe())

    //     alert(fetchData.payload.message)

    //     if ("token" in fetchData.payload) {
    //         window.localStorage.setItem("token", fetchData.payload.token);
    //     }
    // };

    console.log(orders && orders)

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
                }}>Менің тапсырыстарым &nbsp; <Grid color="#5566FF" style={{
                    fontWeight: '600px'
                }} size={42} /></h4>

                <Col md={12} style={{
                    border: '1px solid #4C5CE8',
                    padding: '24px',
                    backgroundColor: 'white'
                }}>
                    <Row>
                        <Col md={6} className="d-flex align-items-center">
                            <div className="mb-3 ">
                                <p style={{ fontWeight: '300', fontSize: '18px' }}>Құрметті {data?.lastname} {data?.firstname} {data?.patronymic}, өзіңіздің тапсырысыңызды жіберу үшін біздің мекеменің CRM "Көмек" сервисі ішінде жаңа тапсырыс құру батырмасын баса аласыз</p>

                                <button
                                    style={{
                                        padding: '8px 12px',
                                        margin: '12px auto 0 auto'
                                    }} className="signup-btn" onClick={() => {
                                        window.location.assign(
                                            'http://localhost:3000/my-orders/create'
                                        )
                                    }} >
                                    {"Жаңа тапсырыс құру"}
                                </button>
                            </div>
                        </Col>
                        <Col md={6} className="d-flex justify-content-center">
                            <img src="https://st2.depositphotos.com/4230659/11337/v/450/depositphotos_113370994-stock-illustration-warehouse-manager-or-warehouse-worker.jpg" height={'300px'} alt="" />
                        </Col>
                    </Row>
                </Col>
                <hr />
                {
                    orders?.items?.map((order, i) => order?.customer?._id == data?._id && (
                        <Col md={4} style={{
                            border: '1px solid #4C5CE8',
                            padding: '24px',
                            backgroundColor: 'white'
                        }}>
                            <div className="text-start">
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
                            </div>
                        </Col>
                    ))
                }
            </Row>
        </Container>
    </>)
}

export default OrderPage
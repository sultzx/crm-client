import React from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { fetchAuthMe, fetchGetAll, fetchUpdate } from "../../redux/slices/user.js";
import PhoneInput from "react-phone-number-input";

import { EnvelopeCheck, EnvelopeCheckFill, Grid } from 'react-bootstrap-icons'

import axios from '../../axios.js'
import { fetchCreateOrder } from "../../redux/slices/order.js";

const CreateOrder = () => {

    const dispatch = useDispatch()

    const { data } = useSelector(state => state.user)

    const { all_users } = useSelector(state => state.user)

    const [errorMessage, setErrorMessage] = React.useState('')

    const [title, setTitle] = React.useState('')

    const [description, setDescription] = React.useState('')

    const [deadline, setDeadline] = React.useState('')

    const [recipient, setRecipient] = React.useState()

    React.useEffect(() => {
        dispatch(fetchGetAll())
    }, [])

    const recipientOptions = [
        { value: 0, text: "-- Таңдаңыз --", avatar: "", id: '' }
    ]

    all_users?.items?.forEach((user, i) => {
        if (user?.role == 'manager') {
            recipientOptions.push({
                value: i + 1,
                text:
                    <span>
                        <img src="" alt="sdcdsv" />
                        {user?.lastname ? user?.lastname : 'Фамилиясы'} &nbsp;
                        {user?.firstname ? user?.firstname : 'Аты'} &nbsp;
                        {user?.patronymic ? user?.patronymic : 'Әкесінің аты енгізлмеген'} • {user?.email} • {
                            user?.role == 'employee' ? 'Қызметкер' : user?.role == 'client' ? 'Клиент' : user?.role == 'manager' ? 'Менеджер' : ''
                        }
                    </span>,
                image: user?.avatar,
                id: user?._id
            })
        }
    })

    const create = async () => {
        const fetchData = await dispatch(
            fetchCreateOrder({
                title: title && title,
                description: description && description,
                deadline: deadline && deadline,
                performer: recipient && recipient
            })
        );

        window.location.assign('http://localhost:3000/my-orders')

        alert(fetchData.payload.message)

        if ("token" in fetchData.payload) {
            window.localStorage.setItem("token", fetchData.payload.token);
        }
    };

    return (<>
        <Container style={{
            margin: '60px auto'
        }}>
            <br />
            <br />
            <Row >
                <h4 style={{
                    color: '#5566FF',
                    margin: '0 0 30px 0 '
                }}>Менің тапсырыстарым &nbsp; <Grid color="#5566FF" style={{
                    fontWeight: '600px'
                }} size={42} /> &nbsp; Жаңа тапсырыс құру</h4>
                <Col md={3}></Col>
                <Col md={6} className="card-sign" style={{
                    border: '1px solid #4C5CE8',
                    padding: '24px',
                    backgroundColor: 'white'
                }}>
                    <Row>
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label style={{ color: 'white', textShadow: '2px 1px 2px #4554D3' }}>Тақырыбы</Form.Label>
                                <input type="text" value={title} className="form-control" onChange={event => setTitle(event.target.value)}
                                    style={{
                                        backgroundColor: 'white',
                                        height: 'auto'
                                    }} placeholder="Мысалы, бизнес жүйесін құру" />
                            </Form.Group>
                        </Col>
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label style={{ color: 'white', textShadow: '2px 1px 2px #4554D3' }}>Толығырақ</Form.Label>
                                <input type="text" value={description} className="form-control" onChange={event => setDescription(event.target.value)}
                                    style={{
                                        backgroundColor: 'white',
                                        height: 'auto'
                                    }} placeholder="Толық ақпарат менеджермен жеке хат алмасу арқылы жүреді" />
                            </Form.Group>
                        </Col>
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label style={{ color: 'white', textShadow: '2px 1px 2px #4554D3' }}>Deadline</Form.Label>
                                <input type="date" value={deadline} className="form-control" onChange={event => setDeadline(event.target.value)}
                                    style={{
                                        backgroundColor: 'white',
                                        height: 'auto'
                                    }} />
                            </Form.Group>
                        </Col>
                        <Col md={12}>
                            <Form.Label style={{ color: 'white', textShadow: '2px 1px 2px #4554D3' }}>Менеджерді таңдаңыз</Form.Label>
                            <Form.Select
                                selected={recipient}
                                onChange={event => setRecipient(recipientOptions[event.target.value].id)}
                                className="form-control-input select-input"
                                style={{
                                    backgroundColor: 'white'
                                }}>
                                {recipientOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.text}
                                        <img src={`http://localhost:5050${option.image}`} alt="sdcdsv" />
                                    </option>
                                ))}
                            </Form.Select>
                            <br />
                        </Col>
                        

                    </Row>
                    <div className="mb-3 ">
                        <button
                            style={{
                                padding: '8px 12px',
                                margin: '12px auto 0 auto'
                            }} className="signup-btn" 
                                onClick={() => {create()}}
                            >
                            {"Жаңа тапсырыс қосу"}
                        </button>
                    </div>
                </Col>
                <Col md={3}></Col>
            </Row>
        </Container>
    </>)
}

export default CreateOrder
import React from "react";
import { Container, Row, Col, Button, Form, Card, Tabs, Tab, Nav } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import * as userFetch from "../redux/slices/user.js";
import * as orderFetch from "../redux/slices/order.js";
import * as chatFetch from "../redux/slices/chat.js";

import PhoneInput from "react-phone-number-input";

import { Envelope, EnvelopeCheck, EnvelopeCheckFill } from 'react-bootstrap-icons'

import axios from '../axios.js'
import { fetchCreateChat } from "../redux/slices/chat.js";

const Chat = () => {

    const dispatch = useDispatch()

    const { data } = useSelector(state => state.user)

    const { all_users } = useSelector(state => state.user)

    const { orders } = useSelector(state => state.order)

    const { chats } = useSelector(state => state.chat)

    const [errorMessage, setErrorMessage] = React.useState('')

    const [chatName, setChatName] = React.useState();

    const [recipient, setRecipient] = React.useState()

    const [order, setOrder] = React.useState()

    React.useEffect(() => {
        dispatch(userFetch.fetchGetAll())
        dispatch(orderFetch.fetchGetAll())
        dispatch(chatFetch.fetchChatAll())
    }, [])

    console.log(orders && orders)

    const recipientOptions = [
        { value: 0, text: "-- Таңдаңыз --", avatar: "", id: '' }
    ];

    const orderOptions = [
        { value: 0, text: "-- Таңдаңыз --", avatar: "", id: '' }
    ];

    all_users?.items?.forEach((user, i) => {
        if (user?._id != data?._id) {
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

    orders?.items?.forEach((order, i) => {
        if (order?.customer?._id == data?._id) {
            orderOptions.push({
                value: i + 1,
                text: order?.title,
                id: order?._id
            })
        }
    })

    const handleChangeFile = async (event) => {
        try {
            const formData = new FormData();
            const file = event.target.files[0];
            formData.append("image", file);
            const { data } = await axios.post("/api/upload/avatar", formData);
            console.log(data.url);
            console.log("asdasd");
        } catch (error) {
            console.warn(error);
            alert("Бейнені көшіру кезінде қате шықты");
        }
        dispatch(userFetch.fetchAuthMe());
    };

    const onSubmit = async (values) => {
        const fetchData = await dispatch(
            fetchCreateChat({
                recipient: recipient && recipient,
                name: chatName && chatName,
                order: order && order
            })
        );

        dispatch(userFetch.fetchAuthMe())

        if ("token" in fetchData.payload) {
            window.localStorage.setItem("token", fetchData.payload.token);
        }

        window.location.assign('http://localhost:3000/chat-page')
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
                }}>Хат алмасу &nbsp; <EnvelopeCheck color="#5566FF" style={{
                    fontWeight: '600px'
                }} size={42} /></h4>

                <Col md={12} style={{
                    border: '1px solid #4C5CE8',
                    padding: '24px',
                    backgroundColor: 'white'
                }}>

                    <Row>

                        <Col md={data?.role == 'client' ? 4 : 6}>
                            <Form.Group className="mb-3 ">
                                <Form.Label style={{ color: 'black', textShadow: 'none' }}>Қабылдаушыны таңдаңыз</Form.Label>
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
                            </Form.Group>
                        </Col>
                        {
                            data?.role == 'client' &&
                            <Col md={4}>
                                <Form.Group className="mb-3 ">
                                    <Form.Label style={{ color: 'black', textShadow: 'none' }}>Тапсырысыңызды таңдаңыз</Form.Label>
                                    <Form.Select
                                        selected={recipient}
                                        onChange={event => setOrder(orderOptions[event.target.value].id)}
                                        className="form-control-input select-input"
                                        style={{
                                            backgroundColor: 'white'
                                        }}>
                                        {orderOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.text}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        }
                        <Col md={data?.role == 'client' ? 4 : 6}>
                            <Form.Group className="mb-3">
                                <Form.Label style={{ color: 'black', textShadow: 'none' }}>Чат тақырыбы</Form.Label>
                                <input type="text" value={chatName} className="form-control" onChange={event => setChatName(event.target.value)}
                                    style={{
                                        backgroundColor: 'white',
                                        height: 'auto'
                                    }} placeholder="Жазыңыз" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <div className="mb-3 ">
                        <button
                            style={{
                                padding: '8px 12px',
                                margin: '12px auto 0 auto'
                            }} className="signup-btn" onClick={() => { onSubmit() }} >
                            {"Жаңа чат қосу"}
                        </button>
                    </div>
                </Col>

                <hr />

                <Tab.Container defaultActiveKey="inbox">
                    <Row >

                        <Col md={12} >
                            <Nav variant="pills" >
                                <Nav.Item>
                                    <Nav.Link className="tab-btn" eventKey="inbox">Келіп жатқан хаттар</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link className="tab-btn" eventKey="outbox">Жіберілген хаттар</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>

                        <Col md={12}>
                            <Tab.Content >
                                <Tab.Pane eventKey="inbox" style={{
                                    margin: '0 -38px 0 -12px',

                                }} >
                                    <Col md={12}

                                        style={{
                                            border: '1px solid #4C5CE8',
                                            padding: '24px',
                                            backgroundColor: '#4C5CE8',
                                            margin: '2px auto',
                                            color: 'white'
                                        }}>

                                        <Row>
                                            <Col md={1} className="d-flex align-items-center">Оқу</Col>
                                            <Col md={2} className="d-flex align-items-center">Чат тақырыбы</Col>
                                            <Col md={3} className="d-flex align-items-center justify-content-center">Жіберуші</Col>
                                            <Col md={3} className="d-flex align-items-center justify-content-center">
                                                Тапсырыс
                                            </Col>
                                            <Col md={3} className="d-flex align-items-center justify-content-end">Қабылдаушы</Col>
                                        </Row>
                                    </Col>
                                    {
                                        chats?.items?.map((chat, i) => chat?.recipient?._id == data?._id && (
                                            <Col md={12}

                                                style={{
                                                    border: '1px solid #4C5CE8',
                                                    padding: '24px',
                                                    backgroundColor: 'white',
                                                    margin: '2px auto'
                                                }}>

                                                <Row>
                                                    <Col md={1} className="d-flex align-items-center"><Envelope color="gray" size="42px"  onClick={() => {
                                                        window.location.assign(`http://localhost:3000/chat-page/chat/${chat?._id}`)
                                                    }} /></Col>
                                                    <Col md={2} className="d-flex align-items-center">{chat.name}</Col>
                                                    <Col md={3} className="d-flex align-items-center justify-content-end">{`${chat?.recipient?.lastname} ${(chat?.recipient?.firstname).substring(0, 1).toUpperCase()}.
                                ${(chat?.recipient?.patronymic).substring(0, 1).toUpperCase()}.
                               `} <br /> {chat?.recipient?.email} <img src={`http://localhost:5050${chat?.recipient?.avatar}`} style={{
                                                            margin: 'auto 12px', border: '1px solid',
                                                        }} width={'60px'} height={'60px'} alt="" /></Col>
                                                    <Col md={3} className="d-flex align-items-center justify-content-center">
                                                        {`${chat?.order?.title}`}
                                                    </Col>
                                                    <Col md={3} className="d-flex align-items-center justify-content-end">{`${chat?.maker?.lastname} ${(chat?.maker?.firstname).substring(0, 1).toUpperCase()}.
                                ${(chat?.maker?.patronymic).substring(0, 1).toUpperCase()}.
                               `} <br /> {chat?.maker?.email} <img src={`http://localhost:5050${chat?.maker?.avatar}`} style={{
                                                            margin: 'auto 12px', border: '1px solid',
                                                        }} width={'60px'} height={'60px'} alt="" /></Col>
                                                </Row>
                                            </Col>
                                        ))
                                    }
                                </Tab.Pane>
                                <Tab.Pane eventKey="outbox" style={{
                                    margin: '0 -38px 0 -12px',
                                }} >
                                    <Col md={12}
                                        style={{
                                            border: '1px solid #4C5CE8',
                                            padding: '24px',
                                            backgroundColor: '#4C5CE8',
                                            margin: '2px auto',
                                            color: 'white'
                                        }}>

                                        <Row>
                                            <Col md={1} className="d-flex align-items-center">Оқу</Col>
                                            <Col md={2} className="d-flex align-items-center">Чат тақырыбы</Col>
                                            <Col md={3} className="d-flex align-items-center justify-content-center">Жіберуші</Col>
                                            <Col md={3} className="d-flex align-items-center justify-content-center">
                                                Тапсырыс
                                            </Col>
                                            <Col md={3} className="d-flex align-items-center justify-content-end">Қабылдаушы</Col>
                                        </Row>
                                    </Col>
                                    {
                                        chats?.items?.map((chat, i) => chat?.maker?._id == data?._id && (
                                            <Col md={12}
                                                style={{
                                                    border: '1px solid #4C5CE8',
                                                    padding: '24px',
                                                    backgroundColor: 'white',
                                                    margin: '2px auto'
                                                }}>
                                                <Row>
                                                    <Col md={1} className="d-flex align-items-center"><Envelope style={{
                                                        color: 'gray',
                                                    }} size="42px" onClick={() => {
                                                        window.location.assign(`http://localhost:3000/chat-page/chat/${chat?._id}`)
                                                    }} className="chat-open-icon" /></Col>
                                                    <Col md={2} className="d-flex align-items-center">{chat.name}</Col>
                                                    <Col md={3} className="d-flex align-items-center justify-content-end">{`${chat?.maker?.lastname} ${(chat?.maker?.firstname).substring(0, 1).toUpperCase()}.
                                ${(chat?.maker?.patronymic).substring(0, 1).toUpperCase()}.
                               `} <br /> {chat?.maker?.email} <img src={`http://localhost:5050${chat?.maker?.avatar}`} style={{
                                                            margin: 'auto 12px', border: '1px solid',
                                                        }} width={'60px'} height={'60px'} alt="" /></Col>
                                                    <Col md={3} className="d-flex align-items-center justify-content-center">
                                                        {`${chat?.order?.title}`}
                                                    </Col>
                                                    <Col md={3} className="d-flex align-items-center justify-content-end">{`${chat?.recipient?.lastname} ${(chat?.recipient?.firstname).substring(0, 1).toUpperCase()}.
                                ${(chat?.recipient?.patronymic).substring(0, 1).toUpperCase()}.
                               `} <br /> {chat?.recipient?.email} <img src={`http://localhost:5050${chat?.recipient?.avatar}`} style={{
                                                            margin: 'auto 12px', border: '1px solid',
                                                        }} width={'60px'} height={'60px'} alt="" /></Col>
                                                </Row>
                                            </Col>
                                        ))
                                    }
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>

                </Tab.Container>

                <hr />

            </Row>
        </Container>
    </>)
}

export default Chat
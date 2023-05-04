import React from "react";
import { Container, Row, Col, Button, Form, Card, Tabs, Tab, Nav, Navbar } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Navigate, useParams } from "react-router-dom";
import * as userFetch from "../../redux/slices/user.js";
import * as orderFetch from "../../redux/slices/order.js";
import * as chatFetch from "../../redux/slices/chat.js";

import PhoneInput from "react-phone-number-input";

import { ArrowRight, Calendar2, Calendar2Day, Envelope, EnvelopeCheck, EnvelopeCheckFill, Send } from 'react-bootstrap-icons'

import axios from '../../axios.js'
import { fetchCreateChat } from "../../redux/slices/chat.js";

const Chat = () => {

    const dispatch = useDispatch()

    const { id } = useParams()

    const { data } = useSelector(state => state.user)

    const { orders } = useSelector(state => state.order)

    const chat = useSelector(state => state.chat.data)

    const [content, setContent] = React.useState()


    React.useEffect(() => {
        dispatch(userFetch.fetchGetAll())
        dispatch(orderFetch.fetchGetAll())
        dispatch(chatFetch.fetchChatOne({ id: id }))
    }, [])

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

    const onSubmit = async () => {
        const fetchData = await dispatch(
            chatFetch.fetchCreateMessage({
                chat_id: chat?._id,
                sender: data?._id,
                content: content && content,
            })
        );

        dispatch(userFetch.fetchAuthMe())

        if ("token" in fetchData.payload) {
            window.localStorage.setItem("token", fetchData.payload.token);
        }

        window.location.assign('http://localhost:3000/chat-page/chat/' + chat?._id)
    };

    console.log(chat && chat)

    const messages = []

    chat?.messages?.forEach((mess) => {
        messages.push(mess)
    })


    console.log(messages)
    
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
                }} size={42} /> &nbsp; {id.substring(4, 10)}</h4>

                <Col md={12} style={{
                    border: '1px solid #4C5CE8',
                    padding: '24px',
                    backgroundColor: 'white'
                }}>

                    <Row>

                    </Row>
                    <div className="mb-3 ">
                        <h5>{chat?.name}</h5>
                        <p><ArrowRight color="#5567FF" size="24px" />&nbsp; {orders?.items?.map((order, i) => order?._id == chat?.order?._id && (<>{order?.title}</>))}</p>
                        <p><Calendar2Day color="#5567FF" size="24px" /> &nbsp;{orders?.items?.map((order, i) => order?._id == chat?.order?._id && (<>{new Date(order?.deadline).toISOString().substring(0, 10)}</>))}</p>

                        <p> {orders?.items?.map((order, i) => order?._id == chat?.order?._id && (<>{order?.description}</>))}</p>
                    </div>
                </Col>

                <hr />

                <Container>
                    <Row >
                        {
                            messages?.map((message, i) => message?.sender?._id == data?._id ? (
                                <Col md={12} className={`${message?.sender?._id == data?._id ? 'text-end' : 'text-start'}`} style={{
                                    border: 'none',
                                    padding: '24px',
                                    backgroundColor: 'white',
                                    color: '#4C5CE8'
                                }}>
                                    <Row>
                                    <Col md={'auto'} className="flex-fill shadow" style={{
                                        border: '1px solid #586AFF',
                                        borderRadius: '24px',
                                        padding: '24px 24px 48px 24px',
                                        margin: 'auto 24px',
                                    }}>{message?.content}</Col>
                                <Col md={"2"} className="text-end">
                                        <Row>

                                            <Col md={'6'}>
                                                {message?.sender?.lastname} <br />
                                                {message?.sender?.firstname} <br />
                                                {message?.sender?.patronymic}
                                                
                                            </Col>
                                            <Col md={'6'}>
                                                <img src={`http://localhost:5050${message?.sender?.avatar}`} style={{
                                                    border: '1px solid #586AFF',
                                                    borderRadius: '4px'
                                                }} width={'70px'} height={'70px'} alt="" />
                                            </Col>
                                        <hr />
                                        <p style={{color: 'gray'}}>{new Date(message?.createdAt).toISOString().substring(0, 19).replace('T', ' ')}</p>
                                        </Row>
                                    </Col>
                                    </Row>
                                    
                                </Col>
                            ) :
                            <Col md={12} className={`${message?.sender?._id == data?._id ? 'text-end' : 'text-start'}`} style={{
                                border: 'none',
                                padding: '24px',
                                backgroundColor: 'white',
   
                                color: '#4C5CE8'
                            }}>
                                <Row>
                                <Col md={"2"} className="text-end">
                                        <Row>
                                        <Col md={'6'}>
                                                <img src={`http://localhost:5050${message?.sender?.avatar}`} style={{
                                                    border: '1px solid #586AFF',
                                                    borderRadius: '4px'
                                                }} width={'70px'} height={'70px'} alt="" />
                                            </Col>
                                            <Col md={'6'}>
                                                {message?.sender?.lastname} <br />
                                                {message?.sender?.firstname} <br />
                                                {message?.sender?.patronymic}
                                                
                                            </Col>
                                        <hr />
                                        <p style={{color: 'gray'}}>{new Date(message?.createdAt).toISOString().substring(0, 19).replace('T', ' ')}</p>
                                        </Row>
                                    </Col>
                                    <Col md={'auto'} className="flex-fill shadow" style={{
                                        border: '1px solid #586AFF',
                                        borderRadius: '24px',
                                        padding: '24px 24px 48px 24px',
                                        margin: 'auto 24px',
                                    }}>{message?.content}</Col>

                                </Row>
                                
                            </Col>
                            
                            )
                        }
                    </Row>
                    <Row>
                        <Navbar style={{
                            backgroundColor: '#5A6CFF'
                        }} fixed="bottom" expand="lg">
                            <Container >
                                <input type="text" className="form-control" value={content} onChange={event => setContent(event.target.value)} placeholder="Осында жазыңыз" />
                                <button className="signup-btn" onClick={() => { onSubmit() }} style={{
                                    padding: '6px'
                                }}>
                                    <Send size={'30px'} />
                                </button>
                            </Container>
                        </Navbar>
                    </Row>
                </Container>

            </Row>
        </Container>
    </>)
}

export default Chat
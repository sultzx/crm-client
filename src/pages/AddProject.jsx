import React from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import * as fetchDep from "../redux/slices/department.js";
import * as fetchUser from "../redux/slices/user.js";

import { BookFill, Briefcase, Calendar, Calendar2, Calendar2Date, Diagram3, Envelope, GenderAmbiguous, GenderFemale, GenderMale, Grid, Person, PersonAdd, PersonVcard, Phone, Stopwatch } from 'react-bootstrap-icons'
import Profile from "./Profile.jsx";
import { fetchCreateDepartment } from "../redux/slices/department.js";
import { useParams } from "react-router-dom";
import { fetchCreateProject } from "../redux/slices/project.js";

const AddEmployee = () => {

    const dispatch = useDispatch()

    const { id } = useParams()

    const { data, all_users } = useSelector(state => state.user)


    const [employee, setEmployee] = React.useState()

    const [client, setClient] = React.useState()

    const [manager, setManager] = React.useState()


    const [name, setName] = React.useState()

    const [description, setDescription] = React.useState()

    const [deadline, setDeadline] = React.useState()

    React.useEffect(() => {
        dispatch(fetchUser.fetchGetAll())
    }, [])


    const employeeOptions = [
        { value: 0, text: "--Қызметкерді таңдаңыз --", id: '' }
    ];

    const clientOptions = [
        { value: 0, text: "--Қызметкерді таңдаңыз --", id: '' }
    ];

    const managerOptions = [
        { value: 0, text: "--Қызметкерді таңдаңыз --", id: '' }
    ];

    all_users?.items?.forEach((user, i) => {
        if (user?.role == 'employee') {
            employeeOptions.push({
                value: i + 1,
                text: `${user?.lastname} ${user?.firstname} ${user?.patronymic} - ${user?.email}`,
                id: user?._id
            })
        }
    })

    all_users?.items?.forEach((user, i) => {
        if (user?.role == 'client') {
            clientOptions.push({
                value: i + 1,
                text: `${user?.lastname} ${user?.firstname} ${user?.patronymic} - ${user?.email}`,
                id: user?._id
            })
        }
    })

    all_users?.items?.forEach((user, i) => {
        if (user?.role == 'manager') {
            managerOptions.push({
                value: i + 1,
                text: `${user?.lastname} ${user?.firstname} ${user?.patronymic} - ${user?.email}`,
                id: user?._id
            })
        }
    })

    const addProject = async () => {
        await dispatch(
            fetchCreateProject({
                name: name && name,
                description: description && description,
                deadline: deadline && deadline,
                manager: manager && manager,
                responsible: employee && employee,
                client: client && client,
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
                }} size={42} /> &nbsp; Жоба қосу</h4>


                <Row>
                    <Col md={12} style={{ margin: '12px auto' }}>
                        <label style={{ marginBottom: '12px' }}>Жоба атауы</label>
                        <input value={name} onChange={event => setName(event.target.value)} type="text" className="form-control" />

                    </Col>

                    <Col md={12} style={{margin: '12px auto'}}>
                        <label style={{marginBottom: '12px'}}>Толығырақ</label>
                        <input value={description} onChange={event => setDescription(event.target.value)} type="text" className="form-control" />

                    </Col>

                    <Col md={12} style={{margin: '12px auto'}}>
                        <label style={{marginBottom: '12px'}}>Deadline</label>
                        <input  onChange={event => setDeadline(event.target.value)} type="date" className="form-control" />

                    </Col>

                    <Col md={12} style={{ margin: '12px auto' }}>
                        <label style={{ marginBottom: '12px' }}>Менеджер</label>

                        <select
                            selected={manager}
                            onChange={event => { setManager(event.target.value) }}
                            className="form-control-input select-input flex-fill d-block w-100"
                            style={{
                                backgroundColor: 'white'
                            }}>
                            {all_users?.items?.map((option, i) => option?.role == 'manager' && (
                                <option key={i} value={option?._id}>
                                    {option?._id?.substring(5, 10)}. {option?.lastname} {option?.firstname} {option?.patronymic}
                                </option>
                            ))}
                        </select>
                    </Col>

                    <Col md={12} style={{ margin: '12px auto' }}>
                        <label style={{ marginBottom: '12px' }}>Жобаға жауапты</label>

                        <select
                            selected={employee}
                            onChange={event => { setEmployee(event.target.value) }}
                            className="form-control-input select-input flex-fill d-block w-100"
                            style={{
                                backgroundColor: 'white'
                            }}>
                            {all_users?.items?.map((option, i) => option?.role == 'employee' && (
                                <option key={i} value={option?._id}>
                                    {option?._id?.substring(5, 10)}. {option?.lastname} {option?.firstname} {option?.patronymic}
                                </option>
                            ))}
                        </select>
                    </Col>

                    <Col md={12} style={{ margin: '12px auto' }}>
                        <label style={{ marginBottom: '12px' }}>Клиент</label>

                        <select
                            selected={client}
                            onChange={event => { setClient(event.target.value) }}
                            className="form-control-input select-input flex-fill d-block w-100"
                            style={{
                                backgroundColor: 'white'
                            }}>
                            {all_users?.items?.map((option, i) => option?.role == 'client' && (
                                <option key={i} value={option?._id}>
                                    {option?._id?.substring(5, 10)}. {option?.lastname} {option?.firstname} {option?.patronymic}
                                </option>
                            ))}
                        </select>
                    </Col>
                    <Col md={12} className="text-end" style={{ margin: '12px auto' }}>
                        <button className="signup-btn flex-fill d-block w-100" disabled={!employee} onClick={addProject} style={{
                            padding: '8px 24px'
                        }}>
                            <PersonAdd size="24px" /> &nbsp; Қызметкерді қосу
                        </button>
                    </Col>
                </Row>

                <Row style={{ margin: '24px auto' }}>

                    {/* {
                        departments?.items?.map((dep, i) => dep?._id == id && (
                            dep?.employees?.map((mes, i) => <Col md={3} style={{ padding: '12px' }} >
                                <div className="d-flex row align-items-center" style={{
                                    border: '1px solid #4C5CE8',
                                    padding: '24px',
                                    backgroundColor: 'white',
                                    padding: '12px',
                                    height: '400px'
                                }}>

                                    <Row>
                                        <Col className="">
                                            <img src={`http://localhost:5050${mes?.avatar}`} width={'100px'} height={'100px'} style={{ border: '1px solid blue', margin: '8px auto' }} alt="" />
                                            <h6>{mes?.lastname} {mes?.firstname} {mes?.patronymic}</h6>
                                            <hr />
                                            <p><Envelope size={'28px'} color="#5667FF" /> &nbsp;{mes?.email}</p>
                                            <p><Phone size={'28px'} color="#5667FF" /> &nbsp;{mes?.phone}</p>
                                            <p><Calendar2Date size={'28px'} color="#5667FF" /> &nbsp;{mes?.birthday.substring(0, 10)}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                    </Row>
                                </div>

                            </Col>)

                        ))
                    } */}
                </Row>

            </Row>
        </Container>
    </>)
}

export default AddEmployee
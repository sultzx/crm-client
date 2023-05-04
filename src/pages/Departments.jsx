import React from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { fetchGetAll } from "../redux/slices/department.js";

import { BookFill, Calendar, Calendar2, Calendar2Date, Diagram3, Envelope, GenderAmbiguous, GenderFemale, GenderMale, Grid, Person, PersonVcard, Phone, Stopwatch } from 'react-bootstrap-icons'
import Profile from "./Profile.jsx";
import { fetchCreateDepartment } from "../redux/slices/department.js";

const Departments = () => {

    const dispatch = useDispatch()

    const { data } = useSelector(state => state.user)

    const {departments } = useSelector(state => state.department)

    const [errorMessage, setErrorMessage] = React.useState('')

    const [name, setName] = React.useState()

    React.useEffect(() => {
        dispatch(fetchGetAll())
    }, [])


    console.log(name && name)
    console.log(departments && departments)

    const create = async () => {
        await dispatch(
            fetchCreateDepartment({
                name: name && name 
            })
        );
        window.location.assign(`http://localhost:3000/departments`)
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
                }}>Бөлімдер &nbsp; <Diagram3 color="#5566FF" style={{
                    fontWeight: '600px'
                }} size={42} /></h4>

                <br />
                { data?.role == 'manager' &&
                                    <Row>
                    <Col md={9}>
                        <input type="text" className="form-control" value={name} onChange={event => { setName(event.target.value) }} />
                    </Col>
                    <Col md={3} className="text-end">
                        <button className="signup-btn" disabled={!name} onClick={() => {create()}} style={{
                            padding: '10px 24px'
                        }}>
                            Жаңа бөлім қосу
                        </button>
                    </Col>
                </Row>
                }


                <Row style={{margin: '24px auto'}}>
                    <hr />
                    {
                        departments?.items?.map((dep, i) => (
                            <Col md={3} style={{padding: '12px'}} >
                                <div className="d-flex row align-items-center" style={{
                                    border: '1px solid #4C5CE8',
                                    padding: '24px',
                                    backgroundColor: 'white',
                                    padding: '12px',
                                    height: '200px'
                                }}>

                                    <Row>
                                        <Col className="">
                                            <h5>{dep?.department}</h5>
                                            <hr />
                                            <p><Person size={'28px'} color="#5667FF" /> &nbsp; Қызметкер саны: {dep?.employees?.length}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <button style={{padding: '8px 24px'}}
                                            onClick={() => {
                                                window.location.assign(`http://localhost:3000/departments/${dep?._id}`)
                                            }}
                                            className="signup-btn">Бөлімге кіру</button>
                                        </Col>
                                    </Row>
                                </div>

                            </Col>
                        ))
                    }
                </Row>

            </Row>
        </Container>
    </>)
}

export default Departments
import React from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

import { fetchLogin, fetchRegister, selectIsAuth } from "../redux/slices/user.js";

const Signin = () => {

    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);

    const [matchedPass, setMatchedPass] = React.useState(true);

    const [errorMessage, setErrorMessage] = React.useState('')

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            login: "",
            password: "",
        },
        mode: "onChange",
    });

    const onSubmit = async (values) => {
        const data = await dispatch(
            fetchLogin({
                login: values.login,
                password: values.password
            })
        );

        setErrorMessage(data.payload.message)

        if ("token" in data.payload) {
            window.localStorage.setItem("token", data.payload.token);
        }
    };

    if (isAuth) {
        return <Navigate to="/" />;
    }

    return (
        <Container >
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Row >
                <Col md={12}
                    style={{ height: '100wh' }}
                    className="d-flex column justify-content-center align-items-center">
                    <Card style={{ width: '34rem' }} className="card-sign">
                        <Card.Body>
                            <Form onSubmit={handleSubmit(onSubmit)} method="post">
                                <h4 className="page-heading">Жүйеге кіру бөлімі</h4>
                                <Form.Group className="mb-3 ">
                                    <Form.Label>Логин</Form.Label>
                                    <Form.Control
                                        style={
                                            Boolean(errors.login?.message)
                                                ? { borderColor: "#ED474A" }
                                                : { borderColor: "#0E6BA8" }
                                        }
                                        className="form-control"
                                        type="text"
                                        {...register("login", {
                                            required: "Логинді енгізіңіз",
                                        })}

                                    />

                                    {Boolean(errors.login?.message) ? (
                                        <Form.Label style={{ color: "#ED474A" }}>
                                            {errors.login?.message}
                                        </Form.Label>
                                    ) : (
                                        ""
                                    )}
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Құпия сөз</Form.Label>
                                    <Form.Control
                                        style={
                                            Boolean(errors.password?.message)
                                                ? { borderColor: "#ED474A" }
                                                : { borderColor: "#0E6BA8" }
                                        }
                                        className="form-control"
                                        type="password"
                                        {...register("password", {
                                            required: "Құпия сөзді енгізіңіз",
                                            minLength: {
                                                value: 6,
                                                message: 'Құпия сөз 6 және 16 символ арасында болуы керек'
                                            },
                                            maxLength: {
                                                value: 16,
                                                message: 'Атыңыз 6 және 16 символ арасында болуы керек'
                                            }
                                        })}

                                    />
                                    {Boolean(errors.password?.message) ? (
                                        <Form.Label style={{ color: "#ED474A" }}>
                                            {errors.password?.message}
                                        </Form.Label>
                                    ) : (
                                        ""
                                    )}
                                </Form.Group>

                                <br />
                                <div className="mb-3 ">
                                    <button
                                        disabled={!isValid}
                                        className="d-block w-100 signup-btn"
                                        type="submit"
                                    >
                                        {"Жүйеге кіру"}
                                    </button>
                                </div>
                                <br />
                                <p className="" style={{ color: '#E2FDFF' }}>Жүйеге жоқсыз ба?&nbsp;&nbsp;<a href="/signup">Тіркелу</a></p>
                            </Form>
                        </Card.Body>
                    </Card>

                </Col>


            </Row>
        </Container>)
}

export default Signin
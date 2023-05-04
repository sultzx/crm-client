import React from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

import { fetchRegister, selectIsAuth } from "../redux/slices/user.js";

const Signup = () => {

    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);

    const [matchedPass, setMatchedPass] = React.useState(true);

    const [errorMessage, setErrorMessage] = React.useState('')

    const [role, setRole] = React.useState("");

    const roleOptions = [
        { value: "0", text: "-- Қолданушы рөлін таңдаңыз --" },
        { value: "1", text: "Менеджер" },
        { value: "2", text: "Қызметкер" },
        { value: "3", text: "Клиент" },
    ];

    const handleJobChange = (event) => {
        switch (roleOptions[event.target.value].text) {
            case "Менеджер":
                setRole("manager");
                break;
            case "Қызметкер":
                setRole("employee");
                break;
            case "Клиент":
                setRole("client");
                break;
        }
    };


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
            confirmPass: "",
        },
        mode: "onChange",
    });

    const onSubmit = async (values) => {
        if (values.password === values.confirmPass) {
            const data = await dispatch(
                fetchRegister({
                    email: values.email,
                    role: role && role,
                    password: values.password,
                })
            );

            setErrorMessage(data.payload.message)

            if ("token" in data.payload) {
                window.localStorage.setItem("token", data.payload.token);
            }
        } else {
            setMatchedPass(false);
        }
    };

    if (isAuth) {
        window.location.assign('http://localhost:3000/')
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
                                <h4 className="page-heading">Жүйеге тіркелу бөлімі</h4>
                                <Form.Group className="mb-3 ">
                                    <Form.Label>Пошта</Form.Label>
                                    <Form.Control
                                        style={
                                            Boolean(errors.email?.message)
                                                ? { borderColor: "#ED474A" }
                                                : { borderColor: "#0E6BA8" }
                                        }
                                        className="form-control"
                                        type="email"
                                        {...register("email", {
                                            required: "Поштаңызды енгізіңіз",
                                            pattern: {
                                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                message: 'Дұрыс форматты енгізіңіз'
                                            }
                                        })}

                                    />

                                    {Boolean(errors.email?.message) ? (
                                        <Form.Label style={{ color: "#ED474A" }}>
                                            {errors.email?.message}
                                        </Form.Label>
                                    ) : (
                                        ""
                                    )}
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    {errors && errors.role ? (
                                        <Form.Label style={{ color: "red" }}>
                                            {errors.role?.message}
                                        </Form.Label>
                                    ) : (
                                        <Form.Label>Қолданушы рөлі</Form.Label>
                                    )}
                                    <Form.Select
                                        selected={role}
                                        onChange={handleJobChange}
                                        className="form-control-input select-input"
                                    >
                                        {roleOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.text}
                                            </option>
                                        ))}
                                    </Form.Select>
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

                                <Form.Group className="mb-3">
                                    <Form.Label>Құпия сөзді қайталаңыз</Form.Label>
                                    <Form.Control
                                        style={
                                            Boolean(errors.confirmPass?.message)
                                                ? { borderColor: "#ED474A" }
                                                : { borderColor: "#0E6BA8" }
                                        }
                                        className="form-control"
                                        type="password"
                                        {...register("confirmPass", {
                                            required: "Құпия сөзді қайта енгізіңіз",
                                            validate: (val) => {
                                                if (watch("password") !== val) {
                                                    return "Құпия сөздер сәйкес келмейді";
                                                }
                                            },
                                        })}

                                    />
                                    {Boolean(errors.confirmPass?.message) ? (
                                        <Form.Label style={{ color: "#ED474A" }}>
                                            {errors.confirmPass?.message}
                                        </Form.Label>
                                    ) : (
                                        ""
                                    )}

                                    {!matchedPass ? (
                                        <Form.Label style={{ color: "#ED474A" }}>
                                            Құпия сөздер сәйкес келмейді
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
                                        {"Жүйеге тіркелу"}
                                    </button>
                                </div>
                                <br />
                                <p className="" style={{ color: '#E2FDFF' }}>Жүйеге тіркелгенсіз ба?&nbsp;&nbsp;<a href="/signin">Кіру</a></p>
                            </Form>
                        </Card.Body>
                    </Card>

                </Col>


            </Row>
        </Container>)
}

export default Signup
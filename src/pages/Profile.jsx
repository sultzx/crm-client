import React from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { fetchAuthMe, fetchUpdate } from "../redux/slices/user";
import PhoneInput from "react-phone-number-input";

import {Person, PersonFill} from 'react-bootstrap-icons'

import axios from '../axios.js'

const Profile = () => {

    const dispatch = useDispatch()

    const inputFileRef = React.useRef(null);
     
    const {data} = useSelector(state => state.user)

    const [errorMessage, setErrorMessage] = React.useState('')

    const [phone, setPhone] = React.useState();

    const [birthday, setBirthday] = React.useState()

    const [bio, setBio] = React.useState();

    const [organization, setOrganization] = React.useState()

    const genderOptions = [
        { value: "0", text: "-- Жынысты таңдаңыз --" },
        { value: "1", text: "Ер" },
        { value: "2", text: "Әйел" },
    ];

    const [gender, setGender] = React.useState(
        genderOptions.forEach((option, i) => {
            if (option.text == data?.gender) {
                return genderOptions[i].value
            }
        })
    );

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
        dispatch(fetchAuthMe());
      };

    const handleGenderChange = (event) => {
        switch (genderOptions[event.target.value].text) {
            case "Ер":
                setGender("male");
                break;
            case "Әйел":
                setGender("female");
                break;
        }
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            lastname: "",
            firstname: "",
            patronymic: ""
        },
        mode: "onChange",
    });

    const onSubmit = async (values) => {
        const fetchData = await dispatch(
            fetchUpdate({
                lastname: values.lastname,
                firstname: values.firstname,
                patronymic: values.patronymic,
                phone: phone && phone,
                gender: gender && gender,
                bio: bio && bio,
                birthday: birthday && birthday,
                organization: data && data.role == 'client' ? (organization && organization) : null
            })
        );

        dispatch(fetchAuthMe())

        alert(fetchData.payload.message)

        if ("token" in fetchData.payload) {
            window.localStorage.setItem("token", fetchData.payload.token);
        }
    };

    console.log(data && data)



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
                }}>Жеке профиль   <Person color="#5566FF" style={{
                    fontWeight: '700'
                }} size={42}/></h4>
                <Col md={3}  style={{
                    border: '1px solid #4C5CE8',
                    padding: '24px',
                    backgroundColor: 'white',
                    borderRight: 'none'
                }}>
                    <label style={{ color: 'black', textShadow: 'none' }}>
                        Бейнеңіз
                    </label>
                    <img  src={
                        data?.avatar ? `http://localhost:5050${data?.avatar}` :
                        "https://t3.ftcdn.net/jpg/05/60/26/08/360_F_560260880_O1V3Qm2cNO5HWjN66mBh2NrlPHNHOUxW.jpg"} 
                    className="flex-fill img-fluid d-block w-100" 
                    style={{
                        marginTop: '8px',
                        border: '2px dashed #788BFF'
                    }}
                    onClick={() => {
                        inputFileRef.current.click()
                    }} />
                    <input type="file" hidden onChange={handleChangeFile} ref={inputFileRef}  />

                </Col>

                <Col md={9} style={{
                    border: '1px solid #4C5CE8',
                    padding: '24px',
                    backgroundColor: 'white'
                }}>
                    <Form onSubmit={handleSubmit(onSubmit)} method="post">

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label style={{ color: 'black', textShadow: 'none' }}>Жеке ақпарат</Form.Label>
                                    <Form.Control
                                        style={
                                            Boolean(errors.lastname?.message)
                                                ? { borderColor: "#ED474A" }
                                                : { borderColor: "#6678FF" }
                                        }
                                        className="form-control profile-input"
                                        type="text"
                                        {...register("lastname", {
                                            required: "Поштаңызды енгізіңіз",
                                        })}
                                        placeholder={data?.lastname ? data?.lastname : 'Фамилияңыз'}
                                    />

                                    {Boolean(errors.lastname?.message) ? (
                                        <Form.Label style={{ color: "#ED474A" }}>
                                            {errors.lastname?.message}
                                        </Form.Label>
                                    ) : (
                                        ""
                                    )}
                                </Form.Group>
                                <Form.Group className="mb-3 ">
                                    <Form.Control
                                        style={
                                            Boolean(errors.firstname?.message)
                                                ? { borderColor: "#ED474A" }
                                                : { borderColor: "#6678FF" }
                                        }
                                        className="form-control profile-input"
                                        type="text"
                                        {...register("firstname", {
                                            required: "Поштаңызды енгізіңіз",
                                        })}
                                        placeholder={data?.firstname ? data?.firstname : 'Атыңыз'}
                                        setPhone        />

                                    {Boolean(errors.firstname?.message) ? (
                                        <Form.Label style={{ color: "#ED474A" }}>
                                            {errors.firstname?.message}
                                        </Form.Label>
                                    ) : (
                                        ""
                                    )}
                                </Form.Group>
                                <Form.Group className="mb-3 ">
                                    <Form.Control
                                        style={
                                            Boolean(errors.patronymic?.message)
                                                ? { borderColor: "#ED474A" }
                                                : { borderColor: "#6678FF" }
                                        }
                                        className="form-control profile-input"
                                        type="text"
                                        {...register("patronymic", {
                                            required: "Поштаңызды енгізіңіз",
                                        })}
                                        placeholder={data?.patronymic ? data?.patronymic : 'Әкеңіздің аты'}
                                    />

                                    {Boolean(errors.patronymic?.message) ? (
                                        <Form.Label style={{ color: "#ED474A" }}>
                                            {errors.patronymic?.message}
                                        </Form.Label>
                                    ) : (
                                        ""
                                    )}
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label style={{ color: 'black', textShadow: 'none' }}>Қосымша ақпарат</Form.Label>
                                    <input type="text" value={data && data.phone ? data.phone : phone}
                                     onChange={event => setPhone(event.target.value)} className="form-control phone" style={{
                                        backgroundColor: 'white'
                                    }} />
                                    {/* <PhoneInput
                                        style={
                                        !phone
                                            ? {
                                                borderColor: "red",
                                            }
                                            : { borderColor: "#80a8ce" }
                                        }
                                        // className="form-control phone"
                                        
                                        value={phone}
                                        onChange={setPhone}
                                    /> */}
                                </Form.Group>
                                <Form.Group className="mb-3 ">
                                    <Form.Control
                                        className="form-control profile-input"
                                        type="date"
                                        onChange={(event) => {setBirthday(event.target.value)}}
                                        defaultValue={data && data.birthday && new Date(data.birthday).toISOString().substring(0,10)}
                                        
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3 ">
                                    <Form.Select
                                        selected={gender}
                                        onChange={handleGenderChange}
                                        className="form-control-input select-input"
                                        style={{
                                            backgroundColor: 'white'
                                        }}
                                    >
                                        {genderOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.text}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            {
                                data?.role == 'client' && 

                                <Col md={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label style={{ color: 'black', textShadow: 'none' }}>Мекеме атауы</Form.Label>
                                    <input type="text" value={organization} className="form-control" onChange={event => setOrganization(event.target.value)}   
                                    style={{
                                        backgroundColor: 'white',
                                        height: 'auto'
                                    }} />
                                </Form.Group>
                            </Col>
                            }

                            <Col md={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label style={{ color: 'black', textShadow: 'none' }}>Мен туралы</Form.Label>
                                    <textarea type="text" value={bio} className="form-control" rows={6} onChange={event => setBio(event.target.value)}   
                                    style={{
                                        backgroundColor: 'white',
                                        height: 'auto'
                                    }} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <div className="mb-3 ">
                            <button
                                disabled={!isValid}
                                style={{
                                    padding: '8px 12px'
                                }}
                                className="signup-btn"
                                type="submit"
                            >
                                {"Мәліметтерді сақтау"}
                            </button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    </>)
}

export default Profile
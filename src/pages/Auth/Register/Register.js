import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { decode } from "base-64";
import * as Yup from "yup";
import Error from "../../../component/Error/Error"
import { useDispatch, useSelector } from "react-redux";
import { setResponseStatus } from "../../../store/actions/user";
import { saveRegisterData } from "../../../store/actions/auth";
import { ToastContainer, toast } from 'react-toastify';
import { postUserName } from "../../../api";
import 'react-toastify/dist/ReactToastify.css';
import "./style.css"
const Register = (props) => {
    const { responseStatus, styleMode } = useSelector((state) => state.user);

    const [passwordShow, setPasswordShow] = useState(false);
    const [passwordConfirmShow, setPasswordConfirmWrap] = useState(false);
    const [agreeChecked, setAgreeChecked] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const initialValues = {
        userName: "",
        email:"",
        password: "",
    };
    const validationSchema = Yup.object({
        userName: Yup.string().trim().required("userName is Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string().min(5).max(255).required("Password is Required"),
        passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').min(5).max(255).required("Coinfirm Password is Required")
    });
    const userNameExited = () => toast.error("Username is already exited. Please use another username.");
    const emailExited = () => toast.error("Email is already exited. Please use another email.");
    const ServerError = () => toast.error("Server Connection Error. Please try again.");
    useEffect(() => {
        if (responseStatus === "userName already exited") {
            userNameExited();
            dispatch(setResponseStatus(""));
        }
        if (responseStatus === "server connection error") {
            ServerError();
            dispatch(setResponseStatus(""));
        }
    }, [])
    const onSubmit = (values) => {
        postUserName({userName:values.userName, email:values.email})
        .then((response) => {
            if(response.status === 200){
                dispatch(saveRegisterData(values));
                localStorage.setItem("registerData", JSON.stringify(values))
                navigate("/EmailVerifycation");
            } 
        })
        .catch(({response}) => {
            if(response.status === 401){
                userNameExited();
            } else if(response.status === 403){
                emailExited();
            } else{
                ServerError();
            }
            console.log(response, "res checkusername");
        })
        
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {(formik) => {
                return (
                    <>
                        <ToastContainer limit={3} autoClose={5000} hideProgressBar={true} theme="colored" />
                        <div className={`register light_register`}>
                            <div className="logo">
                                <Link to="/">
                                    <img alt="" src="image/logo.png" />
                                    <p>ECF Crypto</p>
                                </Link>
                            </div>
                            <div className="register-inner">
                                <Form>
                                    <h1>Create an account</h1>
                                    <div className="userName-wrap">
                                        <Field
                                            name="userName"
                                            type="text"
                                            placeholder="username"
                                        />
                                        <ErrorMessage name="userName" component={Error} />
                                    </div>
                                    <div className="userName-wrap">
                                        <Field
                                            name="email"
                                            type="email"
                                            placeholder="email"
                                        />
                                        <ErrorMessage name="email" component={Error} />
                                    </div>
                                    <div className="password-wrap">
                                        <Field
                                            name="password"
                                            type={passwordShow ? "text" : "password"}
                                            placeholder="Password"
                                        />
                                        <a onClick={() => setPasswordShow(!passwordShow)}><img alt="" src="image/password-show.svg" /></a>
                                        <ErrorMessage name="password" component={Error} />
                                    </div>
                                    <div className="password-wrap">
                                        <Field
                                            name="passwordConfirm"
                                            type={passwordConfirmShow ? "text" : "password"}
                                            placeholder="Confirm Password"
                                        />
                                        <a onClick={() => setPasswordConfirmWrap(!passwordConfirmShow)}><img alt="" src="image/password-show.svg" /></a>
                                        <ErrorMessage name="passwordConfirm" component={Error} />
                                    </div>
                                    <div className="register-agree-wrap">
                                        <input checked={agreeChecked} onChange={() => setAgreeChecked(!agreeChecked)} type="checkbox" />
                                        <p>By Register i agree that i???m 18 years of age or older, ot the<Link to="">User Agreements, Privacy Policy, Cookie Policy.</Link></p>
                                    </div>
                                    <div>
                                        <button type="submit" disabled={!formik.dirty || !formik.isValid || loading || !agreeChecked} to="" className="btn sign-up-button">Register</button>
                                    </div>
                                    <div className="go-login-wrap">
                                        <h5>Already have an account?</h5>
                                        <Link to="/login"> Sign in</Link>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </>
                );
            }}
        </Formik>
    )
}
export default Register;
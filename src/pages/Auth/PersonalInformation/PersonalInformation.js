import React, {useState, useEffect} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { checkEmail } from "../../../api";
import Error from "../../../component/Error/Error"
import { saveRegisterData } from "../../../store/actions/auth";

import "./style.css";

const PersonalInformation = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {registerData} = useSelector((state) => state.auth);
    const {id} = useParams();

    const initialValues = {
        fullName: "",
        birthday: "",
        country: "",
        region: "",
        address: "",
        city: "",
        zipCode: "",
    };

    const validationSchema = Yup.object({
        fullName: Yup.string().required("Name is Required"),
        birthday: Yup.string().required("Birthday is Required"),
        address: Yup.string().required("Address is Required"),
        city: Yup.string().required("City is Required"),
        zipCode: Yup.string().required("ZipCode is Required"),
    });

    const [country, setCountry] = useState("United Arab Emirates");
    const [region, setRegion] = useState("Dubai");

    const onChangeContry = (e) =>{
        setCountry(e);
    }

    const onChangeRegion = (e) => {
        setRegion(e);
    }

    const onSubmit = (values) => {
        const personalData = {...values, ...registerData, country, region};
        localStorage.setItem("registerData", JSON.stringify(personalData))
        dispatch(saveRegisterData(personalData));
        navigate("/UploadIdFront");
    };

    useEffect(() => {
        checkEmail({id})
        .then((res) => {
            console.log(res.status, "email check res");
        })
        .catch(() => {
            navigate("/register");
        })
    },[])
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {(formik) => {
                return(
                    <div className="personal_information">
                        <div className="logo">
                            <Link to="/">
                                <img alt="" src="/image/logo.png" />
                                <p>ECF Crypto</p>
                            </Link>
                        </div>
                        <div className="personal_information-inner">
                        <Form>
                            <h1>Personal information</h1>
                            <div className="userName-wrap">
                                <Field
                                    name="fullName"
                                    type="text"
                                    placeholder="Full Name"
                                />
                                <ErrorMessage name="fullName" component={Error} />
                            </div>
                            <div className="birthday_wrap">
                                <Field
                                    name="birthday"
                                    type="text"
                                    placeholder="Date of birth"
                                />
                                <ErrorMessage name="birthday" component={Error} />
                            </div>
                            <div className="country_wrap">
                                <CountryDropdown
                                value={country}
                                name="country"
                                onChange={(e) => onChangeContry(e)} />
                                <ErrorMessage name="country" component={Error} />
                            </div>
                            <div className="state_wrap">
                                <RegionDropdown
                                name="state"
                                country={country}
                                value={region}
                                onChange={(e) => onChangeRegion(e)} />
                                <ErrorMessage name="state" component={Error} />
                            </div>
                            <div className="address_wrap">
                                <Field
                                    name="address"
                                    type="text"
                                    placeholder="Residential Address"
                                />
                                <ErrorMessage name="address" component={Error} />
                            </div>
                            <div className="city_wrap">
                                <Field
                                    name="city"
                                    type="text"
                                    placeholder="City"
                                />
                                <ErrorMessage name="city" component={Error} />
                            </div>
                            <div className="zipCode_wrap">
                                <Field
                                    name="zipCode"
                                    type="text"
                                    placeholder="Zip Code"
                                />
                                <ErrorMessage name="zipCode" component={Error} />
                            </div>
                            <div>
                                <button type="submit" disabled={!formik.dirty || !formik.isValid }  className="btn next_button">Next</button>
                            </div>
                        </Form>
                        </div>
                    </div>
                );
            }}
        </Formik>
    )
}

export default PersonalInformation;
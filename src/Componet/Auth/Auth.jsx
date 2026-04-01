import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, useParams } from 'react-router';
import { boolean, number, object, string } from 'yup';
import { CheakAuthUser, ForgotePass, LoginyUser, Registration, ResetPass, verifyUser } from '../../Redux/Slice/auth';
import { enqueueSnackbar } from 'notistack';

function Auth(props) {
    const [type, setType] = useState('login')
    const [otp, setOtp] = useState('signup')

    const Auth = useSelector(state => state.Auth)

    console.log("Auth:",Auth);

    const { usertype } = useParams();

    console.log("usertype:",usertype);


    const dispatch = useDispatch();

    const auth = useNavigate()

    let instates = {}, authSchema = {};

    if (type === 'signup') {
        instates = {
            name: '',
            email: '',
            password: '',
            cpassword: '',
            terms: false
        }

        authSchema = {
            name: string().required(),
            email: string().email().required(),
            password: string().required(),
            cpassword: string().required(),
            terms: boolean().required().oneOf([true], "Please Select Trems And Condition")
        }
    } else if (type === 'verifyOTP') {
        instates = {
            OTP: 0
        }

        authSchema = {
            OTP: number().required()
        }
    } else if (type === 'login') {
        instates = {
            email: '',
            password: '',
            terms: false
        }

        authSchema = {
            email: string().email().required(),
            password: string().required(),
            terms: boolean().required().oneOf([true], "Please Select Trems And Condition")
        }
    } else if (type === 'ForgotePass') {
        instates = {
            email: ''
        }

        authSchema = {
            email: string().email().required()
        }
    } else if (type === 'ResetPass') {
        instates = {
            password: '',
            cpassword: '',
        }

        authSchema = {
            password: string().required(),
            cpassword: string().required(),
        }
    }

    // const SignupSchema = object({
    //     name: string().required(),
    //     email: string().email().required(),
    //     password: string().required(),
    //     cpassword: string().required(),
    //     terms: boolean().required().oneOf([true], "Please Select Trems And Condition")
    // })

    const formik = useFormik({
        initialValues: instates,
        validationSchema: object(authSchema),
        enableReinitialize: true,
        onSubmit: async values => {
            console.log(values);

            if (type === 'signup') {
                localStorage.setItem("email", values.email);
                const res = await dispatch(Registration({ ...values, role: usertype ? usertype : 'user' }))

                if (res.type === 'auth/Registration/fulfilled') {
                    setType('verifyOTP')
                }

            } else if (type === 'ForgotePass') {
                localStorage.setItem("email", values.email);
                const res = await dispatch(ForgotePass(values))

                if (res.type === 'auth/ForgotePass/fulfilled') {
                    setType('verifyOTP')
                    setOtp('Resetpass')
                }

            } else if (type === 'verifyOTP') {
                const res = await dispatch(verifyUser({ email: localStorage.getItem("email"), OTP: values.OTP }))


                if (res.type === 'auth/verifyUser/fulfilled') {


                    if (otp === 'Resetpass') {
                        setType('ResetPass')
                    } else {
                        setType('login')
                    }
                }

            } else if (type === 'login') {
                const res = await dispatch(LoginyUser(values))

                console.log(res, Auth);

                if (res.type === 'auth/LoginyUser/fulfilled' && res.payload.role === 'Instructure') {
                    auth('/Instructor_dashBorad')
                } else if (res.type === 'auth/LoginyUser/fulfilled' && res.payload.role === 'user') {
                    auth('/')
                }

            } else if (type === 'ResetPass') {
                const res = await dispatch(ResetPass(values))

                if (res.type === 'auth/ResetPass/fulfilled') {
                    setType('login')
                }
            }
        },
    });

    const { handleSubmit, handleBlur, handleChange, values, errors, touched } = formik

    console.log(errors, instates, authSchema);

    const handleGoogle = () => {
        try {
            window.location.href = "http://localhost:8080/api/v1/user/auth/google"
        } catch (error) {
            console.log(error);
        }
    }

    const handleFacebook = () => {
        try {
            window.location.href = "http://localhost:8080/api/v1/user/auth/facebook"
        } catch (error) {
            console.log(error);

        }
    }

    if (Auth.isLoading) {
        return <p>Loading</p>
    }

    return (
        <main>
            <section className="p-0 d-flex align-items-center position-relative overflow-hidden">
                <div className="container-fluid">
                    <div className="row">
                        {/* left */}
                        <div className="col-12 col-lg-6 d-md-flex align-items-center justify-content-center bg-primary bg-opacity-10 vh-lg-100">
                            <div className="p-3 p-lg-5">
                                {/* Title */}
                                <div className="text-center">
                                    <h2 className="fw-bold">Welcome to our largest community</h2>
                                    <p className="mb-0 h6 fw-light">Let's learn something new today!</p>
                                </div>
                                {/* SVG Image */}
                                <img src="assets/images/element/02.svg" className="mt-5" alt />
                                {/* Info */}
                                <div className="d-sm-flex mt-5 align-items-center justify-content-center">
                                    <ul className="avatar-group mb-2 mb-sm-0">
                                        <li className="avatar avatar-sm"><img className="avatar-img rounded-circle" src="assets/images/avatar/01.jpg" alt="avatar" /></li>
                                        <li className="avatar avatar-sm"><img className="avatar-img rounded-circle" src="assets/images/avatar/02.jpg" alt="avatar" /></li>
                                        <li className="avatar avatar-sm"><img className="avatar-img rounded-circle" src="assets/images/avatar/03.jpg" alt="avatar" /></li>
                                        <li className="avatar avatar-sm"><img className="avatar-img rounded-circle" src="assets/images/avatar/04.jpg" alt="avatar" /></li>
                                    </ul>
                                    {/* Content */}
                                    <p className="mb-0 h6 fw-light ms-0 ms-sm-3">4k+ Students joined us, now it's your turn.</p>
                                </div>
                            </div>
                        </div>
                        {/* Right */}
                        <div className="col-12 col-lg-6 m-auto">
                            <div className="row my-5">
                                <div className="col-sm-10 col-xl-8 m-auto">
                                    {/* Title */}
                                    <img src="assets/images/element/03.svg" className="h-40px mb-2" alt />
                                    <h2>
                                        {
                                            usertype ? 'Instructore Account' : `${type} for your account!`
                                        }

                                    </h2>
                                    <p className="lead mb-4">Nice to see you! Please {type} with your account.</p>
                                    {/* Form START */}
                                    <form onSubmit={handleSubmit}>
                                        {/* Email */}

                                        {
                                            type === 'signup' || type === 'login' || type === 'ForgotePass' || type === 'ResetPass' ?
                                                <>
                                                    {
                                                        type === 'signup' &&

                                                        <div className="mb-4">
                                                            <label htmlFor="exampleInputName" className="form-label">Name</label>
                                                            <div className="input-group input-group-lg">
                                                                <span className="input-group-text bg-light rounded-start border-0 text-secondary px-3"><i className="bi bi-envelope-fill" /></span>
                                                                <input
                                                                    type="text"
                                                                    name='name'
                                                                    className="form-control border-0 bg-light rounded-end ps-1"
                                                                    placeholder="Name"
                                                                    id="exampleInputName"
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    value={values.name}
                                                                />

                                                            </div>
                                                            {
                                                                errors.name && touched.name ? <span style={{ color: 'red' }}>{errors.name}</span> : ''
                                                            }
                                                        </div>
                                                    }

                                                    {
                                                        type === 'signup' || type === 'login' || type === 'ForgotePass' ?

                                                            <div className="mb-4">
                                                                <label htmlFor="exampleInputEmail1" className="form-label">Email address *</label>
                                                                <div className="input-group input-group-lg">
                                                                    <span className="input-group-text bg-light rounded-start border-0 text-secondary px-3"><i className="bi bi-envelope-fill" /></span>
                                                                    <input
                                                                        type="email"
                                                                        name='email'
                                                                        className="form-control border-0 bg-light rounded-end ps-1"
                                                                        placeholder="E-mail"
                                                                        id="exampleInputEmail1"
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.email}
                                                                    />
                                                                </div>
                                                                {
                                                                    errors.email && touched.email ? <span style={{ color: 'red' }}>{errors.email}</span> : ''
                                                                }
                                                            </div> : ''
                                                    }



                                                    {/* Password */}
                                                    {
                                                        (type === 'signup' || type === 'login' || type === 'ResetPass') ?
                                                            <div className="mb-4">
                                                                <label htmlFor="inputPassword5" className="form-label">Password *</label>
                                                                <div className="input-group input-group-lg">
                                                                    <span className="input-group-text bg-light rounded-start border-0 text-secondary px-3"><i className="fas fa-lock" /></span>
                                                                    <input
                                                                        type="password"
                                                                        name='password'
                                                                        className="form-control border-0 bg-light rounded-end ps-1"
                                                                        placeholder="*********"
                                                                        id="inputPassword5"
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.password}
                                                                    />
                                                                </div>
                                                                {
                                                                    errors.password && touched.password ? <span style={{ color: 'red' }}>{errors.password}</span> : ''
                                                                }
                                                            </div> : ''
                                                    }
                                                    {/* Confirm Password */}
                                                    {
                                                        type === 'signup' || type === 'ResetPass' ?
                                                            <div className="mb-4">
                                                                <label htmlFor="inputPassword6" className="form-label">Confirm Password *</label>
                                                                <div className="input-group input-group-lg">
                                                                    <span className="input-group-text bg-light rounded-start border-0 text-secondary px-3"><i className="fas fa-lock" /></span>
                                                                    <input
                                                                        type="password"
                                                                        name='cpassword'
                                                                        className="form-control border-0 bg-light rounded-end ps-1"
                                                                        placeholder="*********"
                                                                        id="inputPassword6"
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.cpassword}
                                                                    />
                                                                </div>
                                                                {
                                                                    errors.cpassword && touched.cpassword ? <span style={{ color: 'red' }}>{errors.cpassword}</span> : ''
                                                                }
                                                            </div> : ''
                                                    }

                                                    {/* Check box */}
                                                    <div className="mb-4">
                                                        <div className="form-check">
                                                            <input
                                                                type="checkbox"
                                                                name='terms'
                                                                className="form-check-input"
                                                                id="checkbox-1"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                checked={values.terms}
                                                            />
                                                            <label className="form-check-label" htmlFor="checkbox-1">By signing up, you agree to the<a href="#"> terms of service</a></label>
                                                        </div>
                                                        {
                                                            errors.terms && touched.terms ? <span style={{ color: 'red' }}>{errors.terms}</span> : ''
                                                        }
                                                    </div>


                                                    <br /><br />
                                                </> :
                                                <div className="mb-4">
                                                    <label htmlFor="inputPassword6" className="form-label">OTP *</label>
                                                    <div className="input-group input-group-lg">
                                                        <span className="input-group-text bg-light rounded-start border-0 text-secondary px-3"><i className="fas fa-lock" /></span>
                                                        <input
                                                            type="password"
                                                            name='OTP'
                                                            className="form-control border-0 bg-light rounded-end ps-1"
                                                            placeholder="*********"
                                                            id="inputPassword6"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.OTP}
                                                        />
                                                    </div>
                                                    {
                                                        errors.OTP && touched.OTP ? <span style={{ color: 'red' }}>{errors.OTP}</span> : ''
                                                    }
                                                </div>

                                        }
                                        {
                                            type === 'login' &&
                                            <label className="form-check-label" htmlFor="checkbox-1">By ForgotePassword, you agree to the<a href="#" onClick={() => setType('ForgotePass')}> Forgote Password</a></label>

                                        }
                                        {/* Button */}
                                        <div className="align-items-center mt-0">
                                            <div className="d-grid">
                                                <button className="btn btn-primary mb-0" type="submit">{type}</button>
                                            </div>
                                        </div>
                                    </form>
                                    {/* Form END */}
                                    {/* Social buttons */}
                                    <div className="row">
                                        {/* Divider with text */}
                                        <div className="position-relative my-4">
                                            <hr />
                                            <p className="small position-absolute top-50 start-50 translate-middle bg-body px-5">Or</p>
                                        </div>
                                        {/* Social btn */}
                                        <div className="col-xxl-6 d-grid">
                                            <a href="#" onClick={handleGoogle} className="btn bg-google mb-2 mb-xxl-0"><i className="fab fa-fw fa-google text-white me-2" />Signup with Google</a>
                                        </div>
                                        {/* Social btn */}
                                        <div className="col-xxl-6 d-grid">
                                            <a href="#" onClick={handleFacebook} className="btn bg-facebook mb-0"><i className="fab fa-fw fa-facebook-f me-2" />Signup with Facebook</a>
                                        </div>
                                    </div>
                                    {/* Sign up link */}
                                    {
                                        type === 'signup' ?

                                            <div className="mt-4 text-center">
                                                <span>Already have an account?<a href="#" onClick={() => setType('login')}>Sign in here</a></span>
                                            </div> :

                                            <div className="mt-4 text-center">
                                                <span>Create A New Account<a href="#" onClick={() => setType('signup')}>Signup here</a></span>
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>

    );
}

export default Auth;
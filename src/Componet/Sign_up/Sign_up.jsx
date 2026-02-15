import { useFormik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router';
import { boolean, object, string } from 'yup';
import { Registration } from '../../Redux/Slice/auth';

function Sign_up(props) {

    const dispatch=useDispatch();

    const SignupSchema = object({
        name: string().required(),
        email: string().email().required(),
        password: string().required(),
        cpassword: string().required(),
        terms: boolean().required().oneOf([true], "Please Select Trems And Condition")
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            cpassword: '',
            terms: false
        },
        validationSchema: SignupSchema,
        onSubmit: values => {
            console.log(values);

            dispatch(Registration(values))
        },
    });

    const { handleSubmit, handleBlur, handleChange, values, errors, touched } = formik

    console.log(errors);

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
                                    <h2>Sign up for your account!</h2>
                                    <p className="lead mb-4">Nice to see you! Please Sign up with your account.</p>
                                    {/* Form START */}
                                    <form onSubmit={handleSubmit}>
                                        {/* Email */}
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
                                                {
                                                    errors.name && touched.name ? <span style={{ color: 'red' }}>{errors.name}</span> : ''
                                                }
                                            </div>
                                        </div>

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
                                                {
                                                    errors.email && touched.email ? <span style={{ color: 'red' }}>{errors.email}</span> : ''
                                                }
                                            </div>
                                        </div>
                                        {/* Password */}
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
                                                {
                                                    errors.password && touched.password ? <span style={{ color: 'red' }}>{errors.password}</span> : ''
                                                }
                                            </div>
                                        </div>
                                        {/* Confirm Password */}
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
                                                {
                                                    errors.cpassword && touched.cpassword ? <span style={{ color: 'red' }}>{errors.cpassword}</span> : ''
                                                }
                                            </div>
                                        </div>
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
                                                {
                                                    errors.terms && touched.terms ? <span style={{ color: 'red' }}>{errors.terms}</span> : ''
                                                }
                                                <label className="form-check-label" htmlFor="checkbox-1">By signing up, you agree to the<a href="#"> terms of service</a></label>
                                            </div>
                                        </div>
                                        {/* Button */}
                                        <div className="align-items-center mt-0">
                                            <div className="d-grid">
                                                <button className="btn btn-primary mb-0" type="submit">Sign Up</button>
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
                                            <a href="#" className="btn bg-google mb-2 mb-xxl-0"><i className="fab fa-fw fa-google text-white me-2" />Signup with Google</a>
                                        </div>
                                        {/* Social btn */}
                                        <div className="col-xxl-6 d-grid">
                                            <a href="#" className="btn bg-facebook mb-0"><i className="fab fa-fw fa-facebook-f me-2" />Signup with Facebook</a>
                                        </div>
                                    </div>
                                    {/* Sign up link */}
                                    <div className="mt-4 text-center">
                                        <span>Already have an account?<NavLink to={'/Sign_in'}>Sign in here</NavLink></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>

    );
}

export default Sign_up;
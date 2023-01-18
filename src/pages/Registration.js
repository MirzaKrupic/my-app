import { useState } from "react";
import { register } from "../utils/userUtils";
import classes from "./Registration.module.css";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import { useHistory, Link } from "react-router-dom";

function Registration() {
  const [registrationInfo, setRegistrationInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [responseState, setResponseState] = useState("");
  const history = useHistory();

  const formValidation = yup.object().shape({
    firstName: yup
      .string()
      .required("*First name is required")
      .matches(
        /^[^\p{P}\p{S}\s\d]*$/u,
        "*Please remove any special characters"
      ),
    lastName: yup
      .string()
      .required("*Last name is required")
      .matches(
        /^([^\p{P}\p{S}\s\d]+[ -]?[^\p{P}\p{S}\s\d]+)*$/u,
        "*Please remove any special characters"
      ),
    email: yup
      .string()
      .email("*Email must be valid")
      .required("*Email is required")
      .matches(
        /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/,
        "*Email is not valid"
      ),
    password: yup
      .string()
      .required("*Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "*Password must be at least 8 characters long, and password must contain at least one digit, one lowercase and one uppercase letter!"
      ),
  });

  const { firstName, lastName, email, password } = registrationInfo;

  const changing = (e) =>
    setRegistrationInfo({
      ...registrationInfo,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = async (user) => {
    try {
      const person = await register(user);
      setResponseState(person.response);
      if (person.status >= 200 && person.status < 300) {
        history.push(`/login`);
      }
    } catch (e) {
      console.error(e);
      setResponseState("Registration request failed, please try again");
    }
  };

  return (
    <div className={classes.register_container}>
      <div className={classes.register_title}>
        <h1>REGISTER</h1>
      </div>
      <div className={classes.register_form_container}>
        <Formik
          validationSchema={formValidation}
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <label className={classes.input_container}>
                First Name
                <Field
                  name="firstName"
                  type="text"
                  className={classes.registration_input}
                />
                {errors.firstName && touched.firstName ? (
                  <div>{errors.firstName}</div>
                ) : null}
              </label>
              <label className={classes.input_container}>
                Last Name
                <Field
                  name="lastName"
                  type="text"
                  className={classes.registration_input}
                />
                {errors.lastName && touched.lastName ? (
                  <div>{errors.lastName}</div>
                ) : null}
              </label>
              <label className={classes.input_container}>
                Email
                <Field
                  name="email"
                  type="email"
                  className={classes.registration_input}
                />
                {errors.email && touched.email ? (
                  <div>{errors.email}</div>
                ) : null}
              </label>
              <label className={classes.input_container}>
                Password
                <Field
                  name="password"
                  type="password"
                  className={classes.registration_input}
                />
                {errors.password && touched.password ? (
                  <div>{errors.password}</div>
                ) : null}
              </label>
              <button className={classes.registration_button} type="submit">
                Submit
              </button>
              {responseState}
            </Form>
          )}
        </Formik>
        <div className={classes.already_registered_section}>
          <p className={classes.already_have_account}>
            {"Already have an account? "}
            <Link className={classes.login_span} to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Registration;

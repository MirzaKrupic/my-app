import { useState } from "react";
import { login } from "../utils/userUtils";
import classes from "./Login.module.css";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import { useAuth } from "../hooks";
import { useHistory } from "react-router-dom";

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const formValidation = yup.object().shape({
    email: yup.string().required("*Email is required"),
    password: yup.string().required("*Password is required"),
  });

  const [responseState, setResponseState] = useState("");
  const { token, setToken } = useAuth("");

  const { email, password } = loginInfo;
  const history = useHistory();

  const onChange = (e) =>
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });

  const handleSubmit = async (user) => {
    try {
      const person = await login(user);
      if (person.status !== 200) {
        setResponseState("You entered wrong credidentials");
      } else {
        setToken(person.token);
        history.push(`/`);
      }
    } catch (e) {
      console.error(e);
      setResponseState("Login request failed, please try again");
    }
  };

  return (
    <div className={classes.login_container}>
      <div className={classes.login_title}>
        <h1>LOGIN</h1>
      </div>

      <Formik
        validationSchema={formValidation}
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <div className={classes.login_form_container}>
            <Form>
              <label className={classes.input_container}>
                Email
                <Field
                  name="email"
                  type="email"
                  className={classes.login_input}
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
                  className={classes.login_input}
                />
                {errors.password && touched.password ? (
                  <div>{errors.password}</div>
                ) : null}
              </label>
              <button className={classes.login_button} type="submit">
                LOGIN
              </button>
              {/* <div className={classes.login_social_network_section}>
                <button className={classes.login_facebook_button} type="button">
                  LOGIN WITH FACEBOOK
                </button>
                <button className={classes.login_gmail_button} type="button">
                  LOGIN WITH GMAIL
                </button>
              </div> */}
            </Form>
          </div>
        )}
      </Formik>
      {responseState}
      <div className={classes.already_registered_section}>
        <p className={classes.forgot_password}>Forget password?</p>
      </div>
    </div>
  );
}

export default Login;

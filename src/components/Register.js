import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import usePassWordToggler from "../hooks/usePasswordToggler";

import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import { Context } from "../App";

export default function Register() {
  const [formData, setFormData] = useState({});
  const [PasswordInputType, ToggleIcon] = usePassWordToggler();
  const [alert, setAlert] = useState(false);
  const [context, updateContext] = useContext(Context);

  useEffect(() => {
    setFormData({ firstName: "", lastName: "", email: "", password: "" });
  }, []);

  let { firstName, lastName, email, password } = formData;

  if (formData.done) {
    return <Redirect to="/home" />;
  }

  if (firstName === undefined) {
    return null;
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const validate = () => {
    let isValid = true;

    if (email !== undefined) {
      //var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      /* An email address must have 
            - one @
            - at least 2 letters after the last point
            - at least 2 characters between @ and the point
            - at least 2 characters before @ */
      let pattern = new RegExp(
        /^[A-Za-z0-9+_.-]{2,}@([A-Za-z0-9+_.-]{2,})\.([A-Za-z]{2,})$/
      );
      if (!pattern.test(email)) {
        isValid = false;
        setAlert("Invalid Email");
      }
    }

    if (password !== undefined) {
      /* A password must contain:
          - at least 8 characters
          - at least 1 uppercase & 1 lowercase letter
          - at least 1 digit
          - at least 1 other symbol (eg #!% & / (“@)
          - not \ t, \ n, \ t and other escaped characters.*/
      let pattern = new RegExp(
        /(?=.{8,})(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*[\W])\S*/
      );
      if (!pattern.test(password)) {
        isValid = false;
        setAlert("Invalid Password");
      }
    }

    return isValid;
  };

  async function save(e) {
    // the default behavior of a form submit is to reload the page stop that

    e.preventDefault();

    if (validate()) {
      // Send the data to the REST api
      let result = await (
        await fetch("/api/user", {
          method: "POST",
          body: JSON.stringify(formData),
          headers: { "Content-Type": "application/json" },
        })
      ).json();

      if (result.error) {
        setAlert("The email you chose already exists!");

        return;
      }

      let res = await (
        await fetch("/api/login", {
          method: "POST",
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
          headers: { "Content-Type": "application/json" },
        })
      ).json();

      let users = await (await fetch("/api/user")).json();
      if (users.error) {
        users = [];
      }

      updateContext({ user: res, allUsers: users });
      setFormData({ done: true });
    }
  }

  return (
    <div>
      <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>

      <Container className="data" fluid={true}>
        <Row className="justify-content-center">
          <Form onSubmit={save} className="reg-container">
            <h3 className="row justify-content-center mb-3 text-info">
              Create account
            </h3>
            <Alert
              color="warning"
              isOpen={alert}
              toggle={() => {
                setAlert(false);
              }}
            >
              {alert}
            </Alert>
            <Col>
              <FormGroup>
                <Label className="text-info">Firstname</Label>
                <Input
                  name="firstName"
                  type="text"
                  onChange={handleInputChange}
                  value={firstName}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label className="text-info">Lastname</Label>
                <Input
                  name="lastName"
                  type="text"
                  onChange={handleInputChange}
                  value={lastName}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label className="text-info">Email address</Label>
                <Input
                  name="email"
                  type="email"
                  onChange={handleInputChange}
                  aria-describedby="emailHelp"
                  value={email}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label className="text-info">Password</Label>
                <InputGroup>
                  <Input
                    name="password"
                    type={PasswordInputType}
                    onChange={handleInputChange}
                    value={password}
                    required
                  />
                  <InputGroupAddon addonType="append">
                    <InputGroupText>
                      <span className="password-toggle-icon-register">
                        {ToggleIcon}
                      </span>
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
              <Link to="/">
                <p className="row justify-content-center text-info">
                  Already have an account?
                </p>
              </Link>
              <Button
                color="info"
                type="submit"
                className="btn-block text-light mt-2"
              >
                Sign up
              </Button>
            </Col>
          </Form>
        </Row>
      </Container>
    </div>
  );
}

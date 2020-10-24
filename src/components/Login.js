import React, { useEffect, useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import usePassWordToggler from "../hooks/usePasswordToggler";

import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Alert,
} from "reactstrap";
import { Context } from "../App";

export default function Login() {
  const [PasswordInputType, ToggleIcon] = usePassWordToggler();
  const [context, updateContext] = useContext(Context);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [alert, setAlert] = useState(false);

  const onDismiss = () => setAlert(false);

  useEffect(() => {
    // (async () => {
    //   const data = await (await fetch("/api/login")).json();
    //   if (data.error) {
    setFormData({ email: "", password: "" });
    setError("");
    //   }
    // })();
  }, []);

  if (formData.error) {
    return <Redirect to="/" />;
  }

  if (redirect) {
    return <Redirect to="/calendar" />;
  }
  if (formData.email === undefined) {
    return null;
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  async function login(e) {
    e.preventDefault();
    // let res = await fetch("/api/login");

    try {
      let result = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });
      const data = await result.json();
      if (data.error == "Already logged in!") {
        setError("Someone is already logged-in");
        setFormData({ email: "", password: "" });
        setAlert(true);
        return;
      }
      if (data.error === "No match!") {
        setError("No match found");
        setAlert(true);
        return;
      }
      updateContext({ user: data });
      console.log(context.user);
      setRedirect(true);
      setFormData({ email: "", password: "" });
      console.log(data);

      // return data;
    } catch (e) {
      return e;
    }
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Form onSubmit={login}>
          <Col xs="12">
            <h3 className="mb-4 text-info ">Welcome back</h3>
          </Col>
          <Col xs="12">
            <Alert color="danger" isOpen={alert} toggle={onDismiss}>
              {error}
            </Alert>
          </Col>
          <Col xs="12">
            <FormGroup>
              <Label className="text-info">
                Email address
                <Input
                  name="email"
                  type="email"
                  onChange={handleInputChange}
                  value={formData.email}
                  aria-describedby="emailHelp"
                  required
                />
              </Label>
            </FormGroup>
            <FormGroup>
              <Label className="text-info">
                Password
                <Input
                  name="password"
                  type={PasswordInputType}
                  onChange={handleInputChange}
                  value={formData.password}
                  required
                />
                <span className="password-toggle-icon">{ToggleIcon}</span>
              </Label>
            </FormGroup>
            <Link to="/Register">
              <Row className="justify-content-center text-info">
                Don't have an account?
              </Row>
            </Link>
            <Button
              color="info"
              type="submit"
              className="btn-block text-light mt-2"
            >
              Login
            </Button>
          </Col>
        </Form>
      </Row>
    </Container>
  );
}

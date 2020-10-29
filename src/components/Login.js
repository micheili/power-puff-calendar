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
  Alert, InputGroup, InputGroupAddon,InputGroupText
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
    (async () => {
      const data = await (await fetch("/api/login")).json();
      if (data.error) {
        setFormData({ email: "", password: "" });
        setError("");
      }
    })();
  }, []);

  if (formData.error) {
    
    return <Redirect to="/" />;
  }

  if (redirect) {
    
    return <Redirect from="/" to="/home" />;
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
      
      let events = await (await fetch("/api/myEvents/" + data.id)).json();
      if (events.error) {
        events = [];
      }

      let users = await (await fetch("/api/user")).json();
      if (users.error) {
        users = [];
      }

      let invitedEvents = await (
        await fetch("/api/invitedEvents/" + data.id + "?accepted=true")
      ).json();
      if (invitedEvents.error) {
        invitedEvents = [];
      }
      console.log(invitedEvents);

      let allInvites = await (
        await fetch("/api/invitedEvents/" + data.id + "?accepted=null")
      ).json();
      if (allInvites.error) {
        allInvites = [];
      }

      let declinedInvitations = await (
        await fetch("/api/invitedEvents/" + data.id + "?accepted=false")
      ).json();
      if (declinedInvitations.error) {
        declinedInvitations = [];
      }

      updateContext({
        user: data,
        myEvents: events,
        invitedEvents: invitedEvents,
        allInvites: allInvites,
        declinedInvitations: declinedInvitations,
        allUsers: users,
      });

      setRedirect(true);
      setFormData({ email: "", password: "" });

            

      // return data;
    } catch (e) {
      return e;
    }
  }

  return (
    <div>
      <div class="bg"></div>
<div class="bg bg2"></div>
<div class="bg bg3"></div>
    
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Form onSubmit={login} className="login-container">
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
                Email address</Label>
                <Input
                  name="email"
                  type="email"
                  onChange={handleInputChange}
                  value={formData.email}
                  aria-describedby="emailHelp"
                  required
                />
              
            </FormGroup>
            <FormGroup>
              <Label>
                Password</Label>
                <InputGroup>
                  <Input name="password"
                            type={PasswordInputType}
                            onChange={handleInputChange}
                            value={formData.password}
                            required/>
                  <InputGroupAddon addonType="append">
                  <InputGroupText><span className="password-toggle-icon">{ToggleIcon}</span></InputGroupText>
                  </InputGroupAddon>
              </InputGroup>
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
    </div>
  );
}

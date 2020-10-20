import React from "react";
import { Link } from 'react-router-dom';

import {
    Container, 
    Row, 
    Col,
    Form,
    FormGroup,
    Button    
  } from "reactstrap";

export default function Login(){
    return (
        <Container className="data">
            <Row className="justify-content-center">
                <Form>
                <Row className="justify-content-center mb-5"><h3>Welcome back</h3></Row>
                    <Col>
                        <FormGroup>
                            <label>Email address
                                <input name="email" type="email" className="form-control" aria-describedby="emailHelp" required/>
                            </label>
                        </FormGroup>
                        <FormGroup>
                            <label>Password
                                <input name="password" type="password" className="form-control" required/>
                            </label>
                        </FormGroup>
                        <Link to="/Register"><p className="row justify-content-center">Don't have an account?</p></Link>
                        <Button type="submit" color="primary" className="btn btn-primary btn-block">Login</Button>
                    </Col>
                </Form>
            </Row>
        </Container>
               
    ) 
} 
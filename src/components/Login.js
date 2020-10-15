import React from "react";
import { Link } from 'react-router-dom';

export default function Login(){
    return (
        <div className="container-fluid mt-5">
            <div className="row justify-content-center">
                <form>
                    <section className="col-12">
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" required/>
                        </div>
                        <Link to="/Register"><p className="row justify-content-center">Don't have an account?</p></Link>
                        <button type="submit" className="btn btn-primary btn-block">Sign in</button>
                    </section>
                </form>
            </div>
        </div>       
    ) 
} 
import React from "react";
import { Link } from 'react-router-dom';

export default function Login(){
    return (
        <div className="homePageContainer container-fluid mt-5">
            <div className="row justify-content-center">
                
                <form>
                <h3 className="row justify-content-center mb-5">Welcome back</h3>
                    <section className="col-12">
                        <div className="form-group">
                            <label>Email address
                                <input name="email" type="email" className="form-control" aria-describedby="emailHelp" required/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Password
                                <input name="password" type="password" className="form-control" required/>
                            </label>
                        </div>
                        <Link to="/Register"><p className="row justify-content-center">Don't have an account?</p></Link>
                        <button type="submit" className="btn btn-primary btn-block">Login</button>
                    </section>
                </form>
            </div>
        </div>
               
    ) 
} 
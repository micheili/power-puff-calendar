import React from "react";
import { Link } from 'react-router-dom';

export default function Register(){
    return (
        <div className="homePageContainer container-fluid mt-5">
            <div className="row justify-content-center">
                <form>
                <h3 className="row justify-content-center mb-5">Create account</h3>
                    <section className="col-12">
                    <div className="form-group">
                            <label>Username
                                <input name="username" type="text" className="form-control" required/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Email address
                                <input name="email" type="email" className="form-control"  aria-describedby="emailHelp" required/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Password
                                <input name="password" type="password" className="form-control" required />
                            </label>
                        </div>
                        <Link to="/"><p className="row justify-content-center">Already have an account?</p></Link>
                        <button type="submit" className="btn btn-primary btn-block">Sign up</button>
                    </section>
                </form>
            </div>
        </div>       
    )  
} 
import React from "react";
import { Link } from 'react-router-dom';

export default function Register(){
    return (
        <div className="container-fluid mt-5">
            <div className="row justify-content-center">
                <form>
                    <section className="col-12">
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" className="form-control"  aria-describedby="emailHelp" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" required />
                        </div>
                        <Link to="/"><p className="row justify-content-center">Already have an account?</p></Link>
                        <button type="submit" className="btn btn-primary btn-block">Sign up</button>
                    </section>
                </form>
            </div>
        </div>       
    )  
} 
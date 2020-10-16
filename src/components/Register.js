import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';



export default function Register(){

    const[formData, setFormData] = useState({});

    useEffect (()=>{
        setFormData({firstName: "", lastName:"", email:"", password:""});
    }, []);

    const handleInputChange = (e) =>{
        setFormData({
            ...formData,
            [e.currentTarget.name]: e.currentTarget.value,
        });
    }

    let {firstName, lastName, email, password} = formData;

    if (firstName === undefined) {
        return null;
      }

  

    async function save(e) {
        // the default behavior of a form submit is to reload the page
        // stop that - we are not barbarians, we ar SPA developers!
        e.preventDefault();
        // Send the data to the REST api
        let result = await (
          await fetch("/api/user" , {
            method: "POST",
            body: JSON.stringify(formData),
            headers: { "Content-Type": "application/json" },
          })
        ).json();
      }

    return (
        <div className="homePageContainer container-fluid mt-5">
            <div className="row justify-content-center">
            <h3 className="row justify-content-center mb-5">Create account</h3>
                <form onSubmit={save}>
                    <section className="col-12">
                    <div className="form-group">
                            <label>Firstname
                                <input name="firstName" type="text" className="form-control" onChange={handleInputChange} value={firstName} required/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Lastname
                                <input name="lastName" type="text" className="form-control" onChange={handleInputChange} value={lastName} required/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Email address
                                <input name="email" type="email" className="form-control" onChange={handleInputChange}  aria-describedby="emailHelp" value={email} required/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Password
                                <input name="password" type="password" className="form-control" onChange={handleInputChange} value={password} required />
                            </label>
                        </div>
                        <Link to="/"><p className="row justify-content-center">Already have an account?</p></Link>
                        <input type="submit" className="btn btn-primary btn-block" value="Sign up"/>
                        
                    </section>
                </form>
            </div>
        </div>       
    )  
} 
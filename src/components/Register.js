import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData({ firstName: "", lastName: "", email: "", password: "" });
    setErrors({ emailError: "", passwordError: "" });
  }, []);

  let { firstName, lastName, email, password } = formData;
  let { emailError, passwordError } = errors;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  if (firstName === undefined) {
    return null;
  }

  const validate = () => {
    let isValid = true;
    const errorClone = {};
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
        errorClone.emailError = "Invalid Email";
        //setErrors({ ...errors, emailError: "Invalid email" });
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
        errorClone.passwordError = "Invalid Password";

        //setErrors({ ...errors, passwordError: "Invalid password" });
      }
    }
    setErrors(errorClone);
    console.log("errors: ", errors);
    return isValid;
  };

  async function save(e) {
    // the default behavior of a form submit is to reload the page stop that
    console.log("form data:", formData);
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
    }
  }

  return (
    <div className="homePageContainer container-fluid mt-5">
      <div className="row justify-content-center">
        <h3 className="row justify-content-center mb-5">Create account</h3>
        <form onSubmit={save}>
          <section className="col-12">
            <div className="form-group">
              <label>
                Firstname
                <input
                  name="firstName"
                  type="text"
                  className="form-control"
                  onChange={handleInputChange}
                  value={firstName}
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Lastname
                <input
                  name="lastName"
                  type="text"
                  className="form-control"
                  onChange={handleInputChange}
                  value={lastName}
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Email address
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  onChange={handleInputChange}
                  aria-describedby="emailHelp"
                  value={email}
                  required
                />
              </label>
              <div className="text-danger">{emailError}</div>
            </div>
            <div className="form-group">
              <label>
                Password
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  onChange={handleInputChange}
                  value={password}
                  required
                />
              </label>
              <div className="text-danger"> {passwordError}</div>
            </div>
            <Link to="/">
              <p className="row justify-content-center">
                Already have an account?
              </p>
            </Link>
            <input
              type="submit"
              className="btn btn-primary btn-block"
              value="Sign up"
            />
          </section>
        </form>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from "react-router-dom";

export default function GoToCalendarButtons() {


    return (
        <div className="container">
            <div className="row justify-content-md-center bg-secondary">
                <div className="col text-center">
                    <Link to="/calendarday">
                        <button className="btn btn-primary btn-lg btn-block my-2" >Day</button>
                    </Link>
                </div>
                <div className="col text-center">
                    <Link to="/calendarweek">
                        <button className="btn btn-primary btn-lg btn-block my-2" >Week</button>
                    </Link>
                </div>
                <div className="col text-center">
                    <Link to="/calendar">
                        <button className="btn btn-primary btn-lg btn-block my-2" >Month</button>
                    </Link>
                </div>
            </div>
        </div>
    );





}